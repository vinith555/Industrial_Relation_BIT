const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
const port = 3000;

app.use("/api",require("../backend/routes/profileDetailRoute"));
app.use("/api",require("../backend/routes/eventRoutr"));
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
