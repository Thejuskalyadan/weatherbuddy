import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import {
  LineChart, Line, BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../bg.jpg";

const graphConfig = [
  { key: "temperature", label: "Temperature", unit: "°C", icon: "🔥", stroke: "#ff4d4d" },
  { key: "humidity", label: "Humidity", unit: "%", icon: "💧", stroke: "#4da6ff" },
  { key: "windSpeed", label: "Wind Speed", unit: "km/h", icon: "💨", stroke: "#33cc33" },
  { key: "rainfall", label: "Rainfall", unit: "mm", icon: "☔", stroke: "#a64dff" },
  { key: "pressure", label: "Pressure", unit: "hPa", icon: "📉", stroke: "#ffcc00" },
  { key: "uvRays", label: "UV Index", unit: "", icon: "☀️", stroke: "#ff9900" },
];

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState("location1");
  const [graphData, setGraphData] = useState({});
  const [chartTypes, setChartTypes] = useState(graphConfig.reduce((acc, item) => ({ ...acc, [item.key]: "line" }), {}));
  const [data, setData] = useState({});
  const [showLatestModal, setShowLatestModal] = useState(false);
  const [latestData, setLatestData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();

  const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    if (!getCookie("loginUserId")) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      setFetchError(null);
      try {
        let channelId = "2929062";
        const apiKey = import.meta.env.VITE_DATA_API_KEY;

        const params = new URLSearchParams();
        params.set("results", "100");
        if (apiKey) params.set("api_key", apiKey);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        const res = await fetch(
          `https://api.thingspeak.com/channels/${channelId}/feeds.json?${params.toString()}`,
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);

        if (!res.ok) {
          const body = await res.text().catch(() => "");
          throw new Error(`ThingSpeak request failed (${res.status})${body ? `: ${body}` : ""}`);
        }

        const json = await res.json();

        if (json.feeds?.length > 0) {
          const last = json.feeds[json.feeds.length - 1];
          setLatestData({
            temperature: last.field1, humidity: last.field2, windSpeed: last.field4,
            rainfall: last.field5, pressure: last.field3, uvRays: last.field6, createdAt: last.created_at
          });

          const formattedDateKey = format(selectedDate, "yyyy-MM-dd");
          const filteredFeeds = json.feeds.filter(f => f.created_at.startsWith(formattedDateKey));

          const currentDisplay = filteredFeeds.length > 0 ? filteredFeeds[filteredFeeds.length - 1] : {};
          setData({
            temperature: currentDisplay.field1 || "--", humidity: currentDisplay.field2 || "--",
            windSpeed: currentDisplay.field4 || "--", rainfall: currentDisplay.field5 || "--",
            pressure: currentDisplay.field3 || "--", uvRays: currentDisplay.field6 || "--"
          });

          const newGraph = { temperature: [], humidity: [], windSpeed: [], rainfall: [], pressure: [], uvRays: [] };
          filteredFeeds.forEach(f => {
            const time = new Date(f.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            if (f.field1) newGraph.temperature.push({ time, value: parseFloat(f.field1) });
            if (f.field2) newGraph.humidity.push({ time, value: parseFloat(f.field2) });
            if (f.field3) newGraph.pressure.push({ time, value: parseFloat(f.field3) });
            if (f.field4) newGraph.windSpeed.push({ time, value: parseFloat(f.field4) });
            if (f.field5) newGraph.rainfall.push({ time, value: parseFloat(f.field5) });
            if (f.field6) newGraph.uvRays.push({ time, value: parseFloat(f.field6) });
          });
          setGraphData(newGraph);
        }
      } catch (e) {
        const raw = String(e?.message || "");
        const message = e?.name === "AbortError"
          ? "Weather feed request timed out. Please check your internet connection and try again."
          : raw.includes("(400)") || raw.includes("-1")
            ? "ThingSpeak rejected the request (400 / -1). Check the channel ID and ensure `VITE_DATA_API_KEY` is the correct ThingSpeak Read API key for that channel."
            : "Could not load weather feed right now. Please try again later.";
        setFetchError(message);
        console.warn("Fetch error:", e);
      }
    };
    fetchData();
  }, [selectedDate, selectedLocation]);

  const renderChart = (type, data, color) => {
    if (!data.length) return <div className="flex items-center justify-center h-full text-white/40">No records for this date</div>;
    const components = {
      line: <LineChart data={data}><XAxis dataKey="time" stroke="#ffffff60" fontSize={10} /><YAxis stroke="#ffffff60" fontSize={10} /><Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} /><Line type="monotone" dataKey="value" stroke={color} strokeWidth={3} dot={false} /></LineChart>,
      bar: <BarChart data={data}><XAxis dataKey="time" stroke="#ffffff60" fontSize={10} /><YAxis stroke="#ffffff60" fontSize={10} /><Tooltip /><Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} /></BarChart>,
      scatter: <ScatterChart><XAxis dataKey="time" stroke="#ffffff60" fontSize={10} /><YAxis dataKey="value" stroke="#ffffff60" fontSize={10} /><Tooltip /><Scatter data={data} fill={color} /></ScatterChart>
    };
    return <ResponsiveContainer width="100%" height={200}>{components[type]}</ResponsiveContainer>;
  };

  return (
    <div className="min-h-screen relative text-white font-sans overflow-x-hidden">
      {/* Global CSS Overrides to force DatePicker to the top */}
      <style>{`
        .react-datepicker-popper { z-index: 9999 !important; }
        .react-datepicker { background-color: #1e293b !important; border: 1px solid rgba(255, 255, 255, 0.2) !important; border-radius: 1.5rem !important; color: white !important; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.8) !important; }
        .react-datepicker__header { background-color: #334155 !important; border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important; }
        .react-datepicker__current-month, .react-datepicker__day-name, .react-datepicker__day { color: white !important; }
        .react-datepicker__day:hover { background-color: #4f46e5 !important; border-radius: 0.5rem !important; }
        .react-datepicker__day--selected { background-color: #6366f1 !important; border-radius: 0.5rem !important; }
        .react-datepicker__day--disabled { opacity: 0.3; }
        .react-datepicker__triangle { display: none; }
      `}</style>

      <div className="fixed inset-0 z-0 bg-slate-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale-[0.5]" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-transparent to-slate-900" />
      </div>

      <div className="relative z-10 p-4 md:p-8">
        <header className="flex flex-col md:flex-row justify-between items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 mb-8 gap-6 shadow-2xl">
          <h1 className="text-3xl font-serif font-bold tracking-tight">Vrishti</h1>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="relative">
              <DatePicker
                selected={selectedDate}
                onChange={d => setSelectedDate(d)}
                maxDate={new Date()}
                dateFormat="yyyy-MM-dd"
                portalId="root-portal" /* Forces the dropdown to the top level of the DOM */
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 outline-none text-center w-40 text-white placeholder-white/60 focus:ring-2 focus:ring-indigo-400 cursor-pointer hover:bg-white/20 transition-all shadow-inner"
              />
            </div>

            <div className="relative group">
              <select
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 pr-10 outline-none appearance-none cursor-pointer w-44 text-white focus:ring-2 focus:ring-indigo-400 transition-all"
              >
                <option value="location1" className="bg-slate-800">Station Alpha</option>
                <option value="location2" className="bg-slate-800">Station Beta</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">▼</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Link to="/vrishti" className="bg-white/5 hover:bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm transition-all">About</Link>
            <button onClick={() => setShowLatestModal(true)} className="bg-indigo-600 hover:bg-indigo-500 px-5 py-2 rounded-xl text-sm font-bold shadow-lg transition-all">Latest Data</button>
            <button onClick={() => { document.cookie = "loginUserId=; max-age=0; path=/"; navigate("/login"); }} className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 px-4 py-2 rounded-xl text-sm text-red-200 transition-all">Logout</button>
          </div>
        </header>

        {fetchError && (
          <div className="mb-8 bg-red-500/10 border border-red-500/20 text-red-200 rounded-2xl px-5 py-3 text-sm">
            {fetchError}
          </div>
        )}

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {graphConfig.map((item) => (
            <motion.div key={item.key} whileHover={{ y: -5 }} className="bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-3xl text-center flex flex-col items-center group relative overflow-hidden">
              <div className="absolute -right-2 -top-2 w-16 h-16 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all" />
              <span className="text-3xl mb-2">{item.icon}</span>
              <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">{item.label}</p>
              <h3 className="text-2xl font-bold mt-1 text-white">
                {data[item.key] || "--"}
                <span className="text-sm font-normal ml-1 opacity-60">{item.unit}</span>
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {graphConfig.map((item) => (
            <div key={item.key} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2.5rem] shadow-xl">
              <div className="flex justify-between items-center mb-6 px-2">
                <h4 className="font-bold text-white/80 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.stroke }}></span>
                  {item.label}
                </h4>
                <select
                  value={chartTypes[item.key]}
                  onChange={e => setChartTypes(p => ({ ...p, [item.key]: e.target.value }))}
                  className="bg-white/5 text-[10px] border border-white/10 rounded-lg px-2 py-1 outline-none text-white/70"
                >
                  <option value="line" className="bg-slate-800">Line</option>
                  <option value="bar" className="bg-slate-800">Bar</option>
                  <option value="scatter" className="bg-slate-800">Dots</option>
                </select>
              </div>
              {renderChart(chartTypes[item.key], graphData[item.key] || [], item.stroke)}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showLatestModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLatestModal(false)} className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="relative w-full max-w-2xl bg-slate-800 border border-white/20 rounded-[3rem] p-10 shadow-2xl overflow-hidden">
              <button onClick={() => setShowLatestModal(false)} className="absolute top-8 right-8 text-2xl opacity-50 hover:opacity-100 transition-opacity">✕</button>
              <h2 className="text-4xl font-bold mb-2">Latest Data</h2>
              <p className="text-white/40 text-sm mb-10 tracking-wide uppercase">Last Sync: {latestData ? new Date(latestData.createdAt).toLocaleString() : "Syncing..."}</p>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {graphConfig.map(i => (
                  <div key={i.key} className="bg-white/5 border border-white/10 p-6 rounded-3xl flex justify-between items-center group hover:bg-white/10 transition-all">
                    <div className="flex flex-col">
                      <span className="text-white/40 text-xs font-bold uppercase">{i.label}</span>
                      <span className="text-xl font-bold mt-1 text-white">{latestData?.[i.key] || "--"}<span className="text-sm ml-1 opacity-50">{i.unit}</span></span>
                    </div>
                    <span className="text-3xl grayscale group-hover:grayscale-0 transition-all">{i.icon}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;