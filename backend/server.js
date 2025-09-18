const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(cors());
app.use(bodyParser.json());
const port = 3000;

app.use("/api",require("../backend/routes/profileDetailRoute"));
app.use("/api",require("../backend/routes/eventRoutr"));
app.use("/api",require("../backend/routes/userRoute"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
