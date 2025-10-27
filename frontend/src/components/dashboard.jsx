import React, { useState, useEffect } from "react";
import bgImage from "../bg.jpg";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// import { useNavigate } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom"; // Combined import
const apiKey = import.meta.env.VITE_DATA_API_KEY;

const graphConfig = [
  {
    key: "temperature",
    label: "Temperature (°C)",
    icon: (
      <div className="text-5xl animate-pulse-fast">
        <span role="img" aria-label="thermometer">
          🔥
        </span>
      </div>
    ),
    stroke: "#ef4444", // Red-500
  },
  {
    key: "humidity",
    label: "Humidity (%)",
    icon: (
      <div className="text-5xl animate-bounce-slow">
        <span role="img" aria-label="water drop">
          💧
        </span>
      </div>
    ),
    stroke: "#3b82f6", // Blue-500
  },
  {
    key: "windSpeed",
    label: "Wind Speed (km/h)",
    icon: (
      <div className="text-5xl animate-spin-slow">
        <span role="img" aria-label="wind">
          💨
        </span>
      </div>
    ),
    stroke: "#10b981", // Green-500
  },
  {
    key: "rainfall",
    label: "Rainfall (mm)",
    icon: (
      <div className="text-5xl animate-bounce-slow">
        <span role="img" aria-label="umbrella with rain drops">
          ☔
        </span>
      </div>
    ),
    stroke: "#6366f1", // Indigo-500
  },
  {
    key: "pressure",
    label: "Pressure (hPa)",
    icon: (
      <div className="text-5xl animate-float">
        <span role="img" aria-label="down arrow">
          ⬇️
        </span>
      </div>
    ),
    stroke: "#f59e0b", // Amber-500
  },
  {
    key: "uvRays",
    label: "UV Index",
    icon: (
      <div className="text-5xl animate-wiggle">
        <span role="img" aria-label="sunglasses">
          😎
        </span>
      </div>
    ),
    stroke: "#a855f7", // Purple-500
  },
];

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLocation, setSelectedLocation] = useState("location1");
  const [graphData, setGraphData] = useState({});
  const [chartTypes, setChartTypes] = useState(
    graphConfig.reduce((acc, item) => ({ ...acc, [item.key]: "line" }), {})
  );
  const [data, setData] = useState({});
  const navigate = useNavigate();

  // Helper function to get cookie by name
  const getCookie = (name) => {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const handleLogout = () => {
    // Remove the loginUserId cookie by setting max-age=0
    document.cookie = "loginUserId=; path=/; max-age=0";
    alert("Logged out successfully ✅");
    navigate("/login");
  };

  // On component mount, check if loginUserId cookie exists, if not redirect to login
  React.useEffect(() => {
    const loginUserId = getCookie("loginUserId");
    if (!loginUserId) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let channelId = "2929062";
        let usedApiKey = apiKey;

        if (selectedLocation === "location2") {
          channelId = "3013318";
          usedApiKey = "1727YL74T0OZUIGO";
        } else if (selectedLocation === "location3") {
          channelId = "1234567";
          usedApiKey = "RANDOMAPIKEY3";
        } else if (selectedLocation === "location4") {
          channelId = "7654321";
          usedApiKey = "RANDOMAPIKEY4";
        }
        const res = await fetch(
          `https://api.thingspeak.com/channels/${channelId}/feeds.json?api_key=${usedApiKey}&results=100`
        );
        const json = await res.json();
        const formattedDateKey = format(selectedDate, "yyyy-MM-dd");

        const filteredFeeds = json.feeds.filter((feed) =>
          feed.created_at.startsWith(formattedDateKey)
        );

        if (filteredFeeds.length === 0) {
          setData({});
          setGraphData({});
          return;
        }

        const latestFeed = filteredFeeds[filteredFeeds.length - 1];
        setData({
          temperature: latestFeed.field1,
          humidity: latestFeed.field2,
          windSpeed: latestFeed.field4,
          rainfall: latestFeed.field5,
          pressure: latestFeed.field3,
          uvRays: latestFeed.field6,
        });

        const newGraphData = {
          temperature: [],
          humidity: [],
          windSpeed: [],
          rainfall: [],
          pressure: [],
          uvRays: [],
        };

        filteredFeeds.forEach((feed) => {
          const time = new Date(feed.created_at).toLocaleTimeString();
          if (feed.field1)
            newGraphData.temperature.push({
              time,
              value: parseFloat(feed.field1),
            });
          if (feed.field2)
            newGraphData.humidity.push({
              time,
              value: parseFloat(feed.field2),
            });
          if (feed.field3)
            newGraphData.pressure.push({
              time,
              value: parseFloat(feed.field3),
            });
          if (feed.field4)
            newGraphData.windSpeed.push({
              time,
              value: parseFloat(feed.field4),
            });
          if (feed.field5)
            newGraphData.rainfall.push({
              time,
              value: parseFloat(feed.field5),
            });
          if (feed.field6)
            newGraphData.uvRays.push({ time, value: parseFloat(feed.field6) });
        });

        setGraphData(newGraphData);
      } catch (error) {
        console.error("Error fetching data from ThingSpeak:", error);
      }
    };

    fetchData();
  }, [selectedDate, selectedLocation]);

  const renderChart = (type, data, color) => {
    if (!Array.isArray(data) || data.length === 0)
      return <p className="text-center">No data</p>;

    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill={color} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "scatter":
        return (
          <ResponsiveContainer width="100%" height={200}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" type="category" name="Time" />
              <YAxis dataKey="value" name="Value" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="Data Points" data={data} fill={color} />
            </ScatterChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6 backdrop-blur-md bg-white/30 rounded-lg relative overflow-hidden">
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.6)",
        }}
      />
      <div className="relative z-10">
        <header className="w-full bg-white/30 backdrop-blur-md mb-9 shadow-md p-4 rounded-[5vh] border border-white/40 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-4 relative">
            {/* Left Corner: Title */}
            <h2
              className="text-2xl font-serif font-bold text-blue-800 md:absolute md:left-6 "
              style={{ textShadow: "1px_1px_3px_rgba(0,0,0,0.1)" }}
            >
              Vrishti
            </h2>

            {/* Center: Inputs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mx-auto">
              {/* Date Picker */}
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                className="border border-gray-300 rounded-lg p-2 text-center w-40 bg-white/30 backdrop-blur-md"
              />

              {/* Location Selector */}
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 text-center w-40 bg-white/30 backdrop-blur-md"
              >
                <option value="location1">Location 1</option>
                <option value="location2">Location 2</option>
                <option value="location3">Location 3</option>
                <option value="location4">Location 4</option>
              </select>
            </div>
            {/* Right Corner: Links and Logout Button */}
            <div className="flex gap-8 items-center md:absolute md:right-6">
              <Link
                to="/vrishti"
                className="bg-white/50 hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-lg shadow-md backdrop-blur-md border border-white/40 text-sm font-medium"
              >
                Know About Vrishti
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white/50 hover:bg-gray-100 text-gray-800 px-5 py-2 rounded-lg shadow-md backdrop-blur-md border border-white/40"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* ✅ Data Cards */}

        <div
          className="flex md:flex-nowrap flex-row overflow-x-auto md:overflow-x-visible space-x-4 md:space-x-10 pb-4 mb-6 justify-start md:justify-center gap-0 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {graphConfig.map((item) => (
            <motion.div
              key={item.key}
              className={`min-w-[220px] md:min-w-[200px] md:w-auto rounded-xl shadow-md p-4 bg-white/30 backdrop-blur-md border border-white/40`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{ flex: "0 0 auto" }}
            >
              <div className="text-4xl mb-2 flex justify-center">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-center">
                {item.label}
              </h3>
              <p className="text-lg text-gray-700 text-center">
                {data[item.key] !== "-" && data[item.key] !== undefined
                  ? data[item.key]
                  : "N/A"}
              </p>
            </motion.div>
          ))}
        </div>
        {/* ✅ Graphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-6">
          {graphConfig.map((item) => (
            <div
              key={item.key}
              className="bg-white/30 rounded-xl p-4 shadow-md backdrop-blur-md border border-white/40"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-md font-semibold">{item.label}</h4>
                <select
                  value={chartTypes[item.key]}
                  onChange={(e) =>
                    setChartTypes((prev) => ({
                      ...prev,
                      [item.key]: e.target.value,
                    }))
                  }
                  className="border p-1 rounded-md text-sm bg-white/30 backdrop-blur-md"
                >
                  <option value="line">Line</option>
                  <option value="bar">Bar</option>
                  <option value="scatter">Scatter</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                {renderChart(
                  chartTypes[item.key],
                  graphData[item.key] || [],
                  item.stroke
                )}
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
