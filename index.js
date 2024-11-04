const express = require('express');
const bodyParser = require('body-parser');
const { generate } = require('./controllers/mainController');

const app = express();
app.use(bodyParser.json());

app.post('/generate', generate);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
