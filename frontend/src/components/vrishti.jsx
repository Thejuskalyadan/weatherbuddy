import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../bg.jpg";
import { motion } from "framer-motion";

const Vrishti = () => {
  const navigate = useNavigate();

  const sections = [
    { title: "Safety", text: "Tracking temperature, rainfall, and wind speed helps predict cyclones and floods, like the 2021 Uttarakhand floods. UV index monitoring protects against skin damage during heatwaves." },
    { title: "Agriculture", text: "Humidity and rainfall data guide irrigation in Rajasthan, while temperature forecasts optimize Kerala’s tea harvests. Pressure changes signal weather shifts." },
    { title: "Economy", text: "Rainfall and humidity impact Odisha’s fishing, while UV levels affect tourism in Goa. Global trade adjusts to pressure patterns." }
  ];

  return (
    <div className="min-h-screen text-white relative">
      <div className="fixed inset-0 z-0 bg-slate-900">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-slate-900" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6 pt-12">
        <motion.header 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 flex justify-between items-center mb-12"
        >
          <button onClick={() => navigate(-1)} className="text-sm font-bold opacity-70 hover:opacity-100 transition-opacity">← Back</button>
          <h2 className="text-2xl font-serif font-bold italic tracking-wider">Vrishti Insights</h2>
          <div className="w-10" />
        </motion.header>

        <main className="space-y-12">
          <section className="text-center">
            <h1 className="text-5xl font-bold mb-6 tracking-tight">Weather & Human Life</h1>
            <p className="text-lg text-white/70 leading-relaxed">
              Explore how localized weather patterns shape our civilization—from the ancient Sanskrit "Vrishti" symbolizing the life-giving monsoon to modern AI forecasting.
            </p>
          </section>

          <section className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[3rem] shadow-2xl relative">
            <div className="absolute -left-4 top-10 w-1 h-20 bg-indigo-500 rounded-full" />
            <h2 className="text-2xl font-bold mb-4">Historical Context</h2>
            <p className="text-white/70 leading-relaxed italic">
              "Weather is the day-to-day state of the atmosphere, shaped by factors such as temperature, humidity, and atmospheric pressure. Ancient texts like the Rigveda tracked seasonal patterns, while modern tools now monitor these parameters with satellites for precise forecasts."
            </p>
          </section>

          <div className="grid md:grid-cols-3 gap-6">
            {sections.map((s, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.03 }}
                className="bg-white/10 border border-white/20 p-6 rounded-3xl"
              >
                <h3 className="text-indigo-400 font-bold mb-2 uppercase text-xs tracking-widest">{s.title}</h3>
                <p className="text-sm text-white/80">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Vrishti;