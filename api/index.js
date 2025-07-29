require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

app.post('/bfhl', (req, res) => {
    const input = req.body.data || [];

    let even = [], odd = [], alphabets = [], special = [];
    let sum = 0;

    input.forEach(item => {
        if (/^-?\d+$/.test(item)) {
            const num = parseInt(item);
            num % 2 === 0 ? even.push(item) : odd.push(item);
            sum += num;
        } else if (/^[a-zA-Z]+$/.test(item)) {
            alphabets.push(item.toUpperCase());
        } else {
            special.push(item);
        }
    });

    // Build alternating caps reverse string
    const concatStr = alphabets
        .join('')
        .split('')
        .reverse()
        .map((ch, i) => i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase())
        .join('');

    res.status(200).json({
        is_success: true,
        user_id:` ${process.env.FULL_NAME}_${process.env.DOB}`,
        email: process.env.EMAIL,
        roll_number: process.env.ROLL_NO,
        odd_numbers: odd,
        even_numbers: even,
        alphabets: alphabets,
        special_characters: special,
        sum: sum.toString(),
        concat_string: concatStr
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}/bfhl`));