const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('./db');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Home Route (optional)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Form Submission Route
app.post('/submit', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to DB
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(sql, [username, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error saving user:', err);
                return res.status(500).send('Database error. Please try again.');
            }

            console.log('User registered:', username);
            res.send(`
                <h2 style="font-family:sans-serif;color:green;text-align:center;">
                    User registered successfully!
                </h2>
                <p style="text-align:center;">
                    <a href="/" style="text-decoration:none;color:#667eea;">Go back</a>
                </p>
            `);
        });
    } catch (error) {
        console.error('Hashing error:', error);
        res.status(500).send('Something went wrong.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
