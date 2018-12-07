const express = require('express');
const path = require('path');

const app = express();

// serve index.html
app.use(express.static('build'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

const port = process.env.PORT || 3050;

app.listen(port, () => console.log(`node server is listening on port ${port}`));