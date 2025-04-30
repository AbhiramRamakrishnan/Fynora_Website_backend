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

// Parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Your Google Apps Script URL from environment variable
const scriptUrl = process.env.SCRIPT_URL;

// POST endpoint to handle form submission
app.post('/submit-form', async (req, res) => {
    try {
        const formData = new URLSearchParams(req.body); // Important step

        // Send form data to Google Apps Script in correct format
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

// Optional: Simple GET route to check server status
app.get('/', (req, res) => {
    res.send("Backend is running ✅");
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`✅ Server running at: http://localhost:${port}`);
});
