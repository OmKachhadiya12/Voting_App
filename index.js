const express = requires('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(3000,() => {
    
})