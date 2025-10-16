// Data Service Module - Simulates fetching data from the Database (or External API)

const EXTERNAL_API_URL = 'https://fakestoreapi.com/products?limit=5';

/**
 * Fetches data from an external source and formats it for our dashboard.
 * @returns {Promise<Array>} A promise that resolves to an array of formatted product metrics.
 */
async function fetchAndFormatData() {
    try {
        console.log('DB Service: Fetching data from external API...');
        
        // Use the native 'fetch' or require a library like 'node-fetch' if using older Node versions.
        // Assuming modern Node.js which includes native fetch:
        const response = await fetch(EXTERNAL_API_URL);
        
        if (!response.ok) {
            throw new Error(`External API request failed with status: ${response.status}`);
        }
        
        const products = await response.json();

        // Simulate creating 'metrics' data from product data:
        // 1. CPU Load: Based on the average rating of the products.
        // 2. Network Traffic: Based on the sum of product prices.
        // 3. Disk Utilization: Based on the total number of products fetched.

        if (!products || products.length === 0) {
            return {
                cpu_load: '0.00',
                network_traffic_mbps: '0.000',
                disk_utilization: '0.00'
            };
        }

        const totalRating = products.reduce((sum, p) => sum + p.rating.rate, 0);
        const totalPrice = products.reduce((sum, p) => sum + p.price, 0);
        const productCount = products.length;

        const metrics = {
            // CPU Load (Average Product Rating * 10 to scale to a % value)
            cpu_load: ((totalRating / productCount) * 10).toFixed(2), 
            // Network Traffic (Total Price / 5 for a smaller scale Mbps reading)
            network_traffic_mbps: (totalPrice / 5).toFixed(3), 
            // Disk Utilization (Product Count * 15 for a scaled % value)
            disk_utilization: (productCount * 15).toFixed(2), 
        };

        return metrics;

    } catch (error) {
        console.error("DB Service Error:", error.message);
        // Return fallback data in case the external service is down
        return {
            cpu_load: '99.99', // Simulate a critical error state
            network_traffic_mbps: '0.000',
            disk_utilization: '0.00'
        };
    }
}

module.exports = {
    fetchAndFormatData
};
