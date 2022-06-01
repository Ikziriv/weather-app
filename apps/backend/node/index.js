const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.get('/helloworld', (req, res) => {
    res.send('Hello World!')
});

app.listen(port, () => {
    console.log(`express listening at http://localhost:${port}`)
});