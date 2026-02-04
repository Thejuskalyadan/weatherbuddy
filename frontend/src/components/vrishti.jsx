import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../bg.jpg";

const Vrishti = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 relative overflow-hidden bg-white/30 backdrop-blur-md">
      {/* Background Image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          filter: "brightness(0.6)",
        }}
      />

      <div className="relative z-10">
        {/* Header */}
        <header className="w-full bg-white/30 backdrop-blur-md mb-9 shadow-md p-4 rounded-[5vh] border border-white/40">
          <div className="grid grid-cols-3 items-center">
            <div className="flex justify-start">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-sm font-semibold text-black rounded-full hover:bg-white/60 transition"
              >
                ← Back
              </button>
            </div>

            <h2
              className="text-2xl font-serif font-bold text-black text-center"
              style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.1)" }}
            >
              Vrishti
            </h2>

            <div />
          </div>
        </header>

        {/* Content */}
        <div className="p-6 max-w-5xl mx-auto">
          <main className="space-y-12">
            {/* Introduction */}
            <section>
              <h1 className="text-4xl font-bold mb-6 text-center text-black">
                Understanding Vrishti (Weather) and Its Importance
              </h1>
              <p className="text-center text-gray-900 mb-6">
                Dive into the dynamic world of weather and its profound impact
                on human life, culture, and the environment, with a focus on key
                parameters like temperature, humidity, rainfall, wind speed,
                pressure, and UV index, including the growing need to monitor
                micro weather.
              </p>
            </section>

            {/* Note About Weather */}
            <section>
              <div className="bg-transparent p-6 rounded-xl shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4 text-black">
                  Note About Weather
                </h2>
                <p className="text-base text-black leading-relaxed">
                  Weather is the day-to-day state of the atmosphere, shaped by
                  factors such as temperature, humidity, precipitation, wind
                  speed, atmospheric pressure, and UV radiation. These elements
                  are driven by the sun’s uneven heating of the Earth, creating
                  convection currents where warm air rises and cool air sinks,
                  influenced by the Coriolis effect. In India, “Vrishti” (rain
                  in Sanskrit) symbolizes the monsoon, a life-giving season from
                  June to September that defines agriculture and culture,
                  including festivals like Teej. Ancient texts like the Rigveda
                  tracked seasonal patterns, while modern tools now monitor
                  these parameters with satellites and radar for precise
                  forecasts.
                </p>
              </div>
            </section>

            {/* Importance of Monitoring Weather */}
            <section>
              <div className="bg-transparent p-6 rounded-xl shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4 text-black">
                  Importance of Monitoring Weather
                </h2>
                <ul className="text-base text-black list-none text-left space-y-4">
                  <li>
                    <strong>Safety:</strong> Tracking temperature, rainfall, and
                    wind speed helps predict cyclones and floods, like the 2021
                    Uttarakhand floods. UV index monitoring protects against
                    skin damage during heatwaves.
                  </li>
                  <li>
                    <strong>Agriculture:</strong> Humidity and rainfall data
                    guide irrigation in Rajasthan, while temperature forecasts
                    optimize Kerala’s tea harvests. Pressure changes signal
                    weather shifts.
                  </li>
                  <li>
                    <strong>Transportation:</strong> Wind speed and pressure
                    updates ensure safe flights in Delhi’s fog, while rainfall
                    affects Mumbai’s trains.
                  </li>
                  <li>
                    <strong>Economy:</strong> Rainfall and humidity impact
                    Odisha’s fishing, while UV levels affect tourism in Goa.
                    Global trade adjusts to pressure patterns.
                  </li>
                  <li>
                    <strong>Climate Study:</strong> Long-term data on all
                    parameters tracks India’s monsoon shifts and global climate
                    trends for sustainability.
                  </li>
                </ul>
              </div>
            </section>

            {/* Micro Weather */}
            <section>
              <div className="bg-transparent p-6 rounded-xl shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4 text-black">
                  Importance of Monitoring Micro Weather
                </h2>
                <p className="text-base text-black leading-relaxed">
                  Micro weather refers to localized weather conditions within
                  small areas, such as urban heat islands, valley fog, or
                  coastal breezes, differing from regional forecasts. Monitoring
                  micro weather is vital for precision in densely populated or
                  diverse terrains. Temperature, humidity, rainfall, wind speed,
                  pressure, and UV index can vary significantly over short
                  distances, impacting urban planning, agriculture, and disaster
                  response.
                </p>
              </div>
            </section>

            {/* Weather Phenomena */}
            <section>
              <div className="bg-transparent p-6 rounded-xl shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4 text-black">
                  Weather Phenomena in India
                </h2>
                <p className="text-base text-black leading-relaxed">
                  India’s varied climate hosts unique phenomena. The monsoon
                  brings 70–90% of rainfall, driven by humidity and pressure
                  gradients from the Indian Ocean. The Western Ghats cause
                  orographic rainfall, while the Thar Desert sees extreme
                  temperatures and high UV levels. Cyclones, cold waves, and
                  heatwaves shape ecosystems and lifestyles across the country.
                </p>
              </div>
            </section>

            {/* Technology */}
            <section>
              <div className="bg-transparent p-6 rounded-xl shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4 text-black">
                  Technological Advances in Weather Forecasting
                </h2>
                <p className="text-base text-black leading-relaxed">
                  Modern forecasting relies on satellites, Doppler radar,
                  supercomputers, and AI-driven models. In India, systems like
                  INSAT-3D and IMD networks provide accurate real-time weather
                  updates, empowering users with actionable insights.
                </p>
              </div>
            </section>

            {/* Parameters */}
            <section>
              <div className="bg-transparent p-6 rounded-xl shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4 text-black">
                  Key Weather Parameters Monitored
                </h2>
                <ul className="text-base text-black list-none text-left space-y-4">
                  <li>
                    <strong>Temperature</strong>
                  </li>
                  <li>
                    <strong>Humidity</strong>
                  </li>
                  <li>
                    <strong>Rainfall</strong>
                  </li>
                  <li>
                    <strong>Wind Speed</strong>
                  </li>
                  <li>
                    <strong>Pressure</strong>
                  </li>
                  <li>
                    <strong>UV Index</strong>
                  </li>
                </ul>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Vrishti;
