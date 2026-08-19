const express = require('express');
const app = express();

const PORT = 5000;

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});