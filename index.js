// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();

// Enable CORS so frontend can make requests
app.use(cors());

// Parse incoming request bodies (form data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Your Google Apps Script URL from environment variable
const scriptUrl = process.env.SCRIPT_URL; // Make sure SCRIPT_URL is set in your .env file

// POST endpoint to handle form submission
app.post('/submit-form', async (req, res) => {
    try {
        // Log the incoming request body for debugging
        console.log("Request Body: ", req.body); // Add this line to log form data

        const formData = new URLSearchParams(req.body);

        // Send form data to Google Apps Script
        const response = await axios.post(scriptUrl, formData.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log("✅ Form submitted:", response.status);
        res.status(200).send("Success");
    } catch (error) {
        console.error("❌ Error submitting to Google Script:", error.message);
        res.status(500).send("Submission failed");
    }
});

// Optional: Simple GET route to check if the server is running
app.get('/', (req, res) => {
    res.send("Backend is running ✅");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`✅ Server running at: http://localhost:${port}`);
});
app.get('/', (req, res) => {
    console.log("GET request received on /");  // This line is for debugging
    res.send("Backend is running ✅");
});