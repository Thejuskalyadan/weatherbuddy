#  Weather Buddy — Real-Time Weather Monitoring & Visualization Platform

**Weather Buddy** is a full-stack web application designed to monitor, visualize, and compare real-time weather data using IoT-based sensors and cloud data services.  
The platform provides an interactive dashboard for analyzing weather patterns with live updates and historical comparisons.

This project demonstrates **end-to-end full-stack development**, real-time data handling, and clean UI design.

---

## 🚀 Features

- 🌡️ Real-time weather data visualization
- 📊 Interactive charts for:
  - Temperature
  - Humidity
  - Wind Speed
  - Rainfall
  - Atmospheric Pressure
  - UV Index
- 📅 Date-based data selection
- 🔁 Comparison of weather data across different dates
- 📈 Multiple chart types (Line, Bar, Scatter)
- 🔄 Live updates as new sensor data arrives
- 🎨 Responsive and clean UI using Tailwind CSS

---

## 🏗️ Project Architecture

Weather Buddy
├── frontend/ # React + Tailwind CSS
├── backend/ # Node.js + Express
├── database/ # MongoDB
├── iot/ # Sensor data via ThingSpeak
└── docs/ # Project documentation


---

## 🧠 Data Flow

1. Weather sensors collect environmental data
2. Data is pushed to **ThingSpeak**
3. Backend fetches and processes the data
4. Frontend dashboard displays:
   - Live metrics
   - Historical trends
   - Comparison graphs



## 🛠️ Tech Stack

### Frontend
- **React.js**
- **Tailwind CSS**
- **Recharts**

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**

### IoT & Cloud
- **ThingSpeak API**
- Real-time sensor data ingestion

---

## 📈 Key Highlights

- Fully responsive dashboard
- Smooth real-time chart updates
- Robust error handling for missing or delayed data
- Scalable architecture for adding more sensors or metrics
- Designed with both **usability** and **performance** in mind

---

## 💡 Use Cases

- Smart city weather monitoring
- Agricultural weather analysis
- Educational IoT & data visualization projects
- Environmental monitoring systems

---

## 📌 Notes

- Simulated data has been removed in favor of **live IoT data**
- Supports future extension for forecasts and alerts
- Built as a production-style MERN application

---

##  Author

Thejus Kalyadan  



