// Install: npm install express
const express = require('express');
const path = require('path');
// 📢 REMOVED: const { fetchAndFormatData } = require('../DataBase/dataService'); 
// We are now generating random data locally for testing.

const app = express();
const PORT = 3000;

// Function to generate random metrics data
const generateRandomMetrics = () => {
    // Generate values within typical operating ranges
    // Increased the CPU range (50% to 95%) to make the frontend's critical alerts trigger more frequently for demonstration.
    const cpuLoad = (Math.random() * 45) + 50; 
    const networkTraffic = (Math.random() * 10) + 0.5; // 0.5 Mbps to 10.5 Mbps
    const diskUtilization = (Math.random() * 40) + 10; // 10% to 50%

    return {
        // Use fixed precision for display consistency
        cpu_load: cpuLoad.toFixed(2),
        network_traffic_mbps: networkTraffic.toFixed(3),
        disk_utilization: diskUtilization.toFixed(2),
    };
};

// Middleware
app.use(express.json());

// --- FIX: CORS Middleware to allow requests from the Canvas environment ---
app.use((req, res, next) => {
    // Setting Access-Control-Allow-Origin to '*' allows requests from any domain/port
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// --------------------------------------------------------------------------

// --- API Endpoints (Using Local Random Data) ---

// 1. Get the latest server metrics 
app.get('/api/metrics', async (req, res) => {
    // 📢 Call the local random generator function
    const metrics = generateRandomMetrics();
    res.json(metrics);
});

// 2. Get configuration (Hardcoded dummy config)
app.get('/api/config', (req, res) => {
    res.json({ theme: 'neon-blue' });
});


// --- Serve Frontend ---
app.use(express.static(path.join(__dirname, '../Frontend')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Backend server (DUMMY RANDOM MODE) running on http://localhost:${PORT}`);
    console.log(`Data Source: Local Random Number Generator`);
});
