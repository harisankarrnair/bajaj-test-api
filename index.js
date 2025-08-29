const express = require('express');
const app = express();

// This middleware is used to parse JSON bodies from POST requests
app.use(express.json());

// Define the POST endpoint for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        // Extract the 'data' array from the request body
        const data = req.body.data;

        // --- ⚠️ IMPORTANT: Fill in your personal details here ---
        const user_details = {
            full_name: "Harisankar R Nair", // e.g., "john_doe"
            dob: "18/11/2003",            // e.g., "17091999"
            email: "harisankarrnair7@gmail.com",
            roll_number: "22BCE1715"
        };
        // ---------------------------------------------------------

        // Initialize arrays and variables to store processed data
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let all_alphabets_str = "";

        // Process each item in the input data array
        data.forEach(item => {
            if (!isNaN(item)) { // Check if the item is a number
                const num = parseInt(item, 10);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item.toString());
                } else {
                    odd_numbers.push(item.toString());
                }
            } else if (/[a-zA-Z]/.test(item)) { // Check if the item is an alphabet
                alphabets.push(item.toUpperCase());
                // Add all characters from the string to our alphabet string
                all_alphabets_str += item;
            } else { // If not a number or alphabet, it's a special character
                special_characters.push(item);
            }
        });

        // Logic for the alternating caps string [cite: 14]
        const reversed_alphabets = all_alphabets_str.split('').reverse().join('');
        let concat_string = "";
        for (let i = 0; i < reversed_alphabets.length; i++) {
            if (i % 2 === 0) {
                concat_string += reversed_alphabets[i].toUpperCase();
            } else {
                concat_string += reversed_alphabets[i].toLowerCase();
            }
        }

        // Construct the final response object
        const response = {
            "is_success": true, // [cite: 26]
            "user_id": `${user_details.full_name}_${user_details.dob}`, // [cite: 23]
            "email": user_details.email,
            "roll_number": user_details.roll_number,
            "odd_numbers": odd_numbers, // [cite: 10]
            "even_numbers": even_numbers, // [cite: 9]
            "alphabets": alphabets, // [cite: 11]
            "special_characters": special_characters, // [cite: 12]
            "sum": sum.toString(), // [cite: 13, 57]
            "concat_string": concat_string
        };

        // Send a successful response with status code 200 [cite: 31]
        res.status(200).json(response);

    } catch (error) {
        // Handle any errors gracefully [cite: 27]
        res.status(500).json({
            "is_success": false,
            "error_message": error.message
        });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export the app for Vercel
module.exports = app;