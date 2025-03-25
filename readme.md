# Performance Monitoring System

## 📌 Overview

This project is a **real-time performance monitoring system** that collects and displays system metrics such as CPU load, memory usage, and system uptime. It consists of a **Node.js WebSocket server, a client-side React dashboard, and a Node.js performance monitoring script** that runs on the user's machine.

## 🎯 Features

- **Real-time performance monitoring** using WebSockets
- **CPU and Memory Usage Tracking** with visual representation
- **Clustered WebSocket Server** for scalability
- **Machine Identification** using MAC addresses
- **Live Status Updates** to indicate active/inactive machines

## 🛠️ Technologies Used

- **Node.js** for backend WebSocket server
- **Socket.io** for real-time communication
- **React** for the client-side dashboard
- **TypeScript** for better code maintainability
- **Cluster Adapter & Sticky Sessions** for load balancing

## 🚀 How to Set Up

### **1. Clone the repository:**
```bash
git clone https://github.com/andrew-dev-p/react-socketio-performance-monitor.git
cd performance-monitor
```

### **2. Install dependencies:**
```bash
npm install
```

### **3. Start the servers, each in a separate terminal:**
```bash
cd server
npm run dev

cd nodeClient
npm run dev

cd reactClient
npm run dev
```

## 📊 How It Works

1. **The performance monitoring script** collects system metrics and sends them to the WebSocket server.
2. **The WebSocket server** processes and distributes data to connected React clients.
3. **The React client** displays real-time metrics using widgets and visual indicators.
