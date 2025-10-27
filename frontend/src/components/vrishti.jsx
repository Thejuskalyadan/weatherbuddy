import React from "react";
import bgImage from "../bg.jpg";

const Vrishti = () => {
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
              className="text-2xl font-serif font-bold text-blue-900 md:absolute md:left-6"
              style={{ textShadow: "1px_1px_3px_rgba(0,0,0,0.1)" }}
            >
              Vrishti
            </h2>
          </div>
        </header>

        <div className="p-6 max-w-5xl mx-auto">
          {/* Main Content */}
          <main className="space-y-12">
            {/* Introduction Section */}
            <section>
              <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">
                Understanding Vrishti (Weather) and Its Importance
              </h1>
              <p className="text-center text-gray-800 mb-6">
                Dive into the dynamic world of weather and its profound impact
                on human life, culture, and the environment, with a focus on key
                parameters like temperature, humidity, rainfall, wind speed,
                pressure, and UV index, including the growing need to monitor
                micro weather.
              </p>
            </section>

            {/* Weather Note Section */}
            <section>
              <div className="bg-blue-400 p-6 rounded-xl shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4 text-blue-800">
                  Note About Weather
                </h2>
                <p className="text-base text-white leading-relaxed">
                  Weather is the day-to-day state of the atmosphere, shaped by
                  factors such as temperature, humidity, precipitation, wind
                  speed, atmospheric pressure, and UV radiation. These elements
                  are driven by the sun’s uneven heating of the Earth, creating
                  convection currents where warm air rises and cool air sinks,
                  influenced by the Coriolis effect. In India, "Vrishti" (rain
                  in Sanskrit) symbolizes the monsoon, a life-giving season from
                  June to September that defines agriculture and culture,
                  including festivals like Teej. Ancient texts like the Rigveda
                  tracked seasonal patterns, while modern tools now monitor
                  these parameters with satellites and radar for precise
                  forecasts.
                </p>
              </div>
            </section>

            {/* Importance of Monitoring Weather Section */}
            <section>
              <div className="bg-blue-400 p-6 rounded-xl shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4 text-blue-800">
                  Importance of Monitoring Weather
                </h2>
                <ul className="text-base text-white list-none p-0 text-left space-y-4">
                  <li>
                    <strong className="text-blue-800">Safety:</strong> Tracking
                    temperature, rainfall, and wind speed helps predict cyclones
                    and floods, like the 2021 Uttarakhand floods. UV index
                    monitoring protects against skin damage during heatwaves.
                  </li>
                  <li>
                    <strong className="text-blue-800">Agriculture:</strong>{" "}
                    Humidity and rainfall data guide irrigation in Rajasthan,
                    while temperature forecasts optimize Kerala’s tea harvests.
                    Pressure changes signal weather shifts.
                  </li>
                  <li>
                    <strong className="text-blue-800">Transportation:</strong>{" "}
                    Wind speed and pressure updates ensure safe flights in
                    Delhi’s fog, while rainfall affects Mumbai’s trains.
                  </li>
                  <li>
                    <strong className="text-blue-800">Economy:</strong> Rainfall
                    and humidity impact Odisha’s fishing, while UV levels affect
                    tourism in Goa. Global trade adjusts to pressure patterns.
                  </li>
                  <li>
                    <strong className="text-blue-800">Climate Study:</strong>{" "}
                    Long-term data on all parameters tracks India’s monsoon
                    shifts and global climate trends for sustainability.
                  </li>
                </ul>
              </div>
            </section>

            {/* Importance of Monitoring Micro Weather Section */}
            <section>
              <div className="bg-blue-400 p-6 rounded-xl shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4 text-blue-800">
                  Importance of Monitoring Micro Weather
                </h2>
                <p className="text-base text-white leading-relaxed">
                  Micro weather refers to localized weather conditions within
                  small areas, such as urban heat islands, valley fog, or
                  coastal breezes, differing from regional forecasts. Monitoring
                  micro weather is vital for precision in densely populated or
                  diverse terrains. For instance, temperature can vary by 5-10°C
                  between a city center and its suburbs due to concrete heat
                  retention. Humidity spikes in river valleys affect local
                  agriculture, while rainfall differences impact hillside
                  farming. Wind speed variations near mountains aid in
                  predicting localized storms, and pressure changes signal
                  sudden weather shifts. UV index monitoring in shaded areas
                  versus open fields enhances sun safety. In India, micro
                  weather data improves urban planning, disaster response in
                  slums, and farming in the Western Ghats, where conditions
                  change rapidly over short distances.
                </p>
              </div>
            </section>

            {/* Weather Phenomena in India Section */}
            <section>
              <div className="bg-blue-400 p-6 rounded-xl shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4 text-blue-800">
                  Weather Phenomena in India
                </h2>
                <p className="text-base text-white leading-relaxed">
                  India’s varied climate hosts unique phenomena. The monsoon
                  brings 70-90% of rainfall, driven by humidity and pressure
                  gradients from the Indian Ocean. The Western Ghats cause
                  orographic rainfall, while the Thar Desert sees temperature
                  spikes above 50°C and high UV levels. Cyclones, tracked by
                  wind speed, hit the east coast, like the 1999 Odisha Super
                  Cyclone, and Himalayan cold waves lower temperatures in the
                  north. These patterns shape India’s ecosystems and lifestyles.
                </p>
              </div>
            </section>

            {/* Technological Advances in Weather Forecasting Section */}
            <section>
              <div className="bg-blue-400 p-6 rounded-xl shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4 text-blue-800">
                  Technological Advances in Weather Forecasting
                </h2>
                <p className="text-base text-white leading-relaxed">
                  Modern forecasting relies on technology to monitor
                  temperature, humidity, rainfall, wind speed, pressure, and UV
                  index. Satellites like INSAT-3D provide cloud and temperature
                  data, while Doppler radar measures rainfall and wind.
                  Supercomputers run models using pressure data, predicting up
                  to 10 days ahead. In India, the IMD enhances accuracy with
                  localized sensors, and AI analyzes UV trends. Mobile apps now
                  deliver real-time updates, empowering users with actionable
                  insights.
                </p>
              </div>
            </section>

            {/* Key Weather Parameters Monitored Section */}
            <section>
              <div className="bg-blue-400 p-6 rounded-xl shadow-lg text-center">
                <h2 className="text-xl font-semibold mb-4 text-blue-800">
                  Key Weather Parameters Monitored
                </h2>
                <ul className="text-base text-white list-none p-0 text-left space-y-4">
                  <li>
                    <strong className="text-blue-800">Temperature:</strong>{" "}
                    Measures heat levels, influencing comfort, agriculture, and
                    heatwave risks (e.g., 45°C in Delhi summers).
                  </li>
                  <li>
                    <strong className="text-blue-800">Humidity:</strong>{" "}
                    Indicates moisture content, affecting plant growth and
                    monsoon intensity (e.g., 90% during rains).
                  </li>
                  <li>
                    <strong className="text-blue-800">Rainfall:</strong> Tracks
                    precipitation, critical for water supply and flood
                    prevention (e.g., 2500 mm in Cherrapunji annually).
                  </li>
                  <li>
                    <strong className="text-blue-800">Wind Speed:</strong>{" "}
                    Monitors air movement, key for cyclone warnings (e.g., 200
                    km/h in cyclones).
                  </li>
                  <li>
                    <strong className="text-blue-800">Pressure:</strong>{" "}
                    Reflects atmospheric stability, predicting storms (e.g., low
                    pressure during monsoons).
                  </li>
                  <li>
                    <strong className="text-blue-800">UV Index:</strong>{" "}
                    Assesses ultraviolet radiation, guiding sun protection
                    (e.g., 10+ in summer peaks).
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
