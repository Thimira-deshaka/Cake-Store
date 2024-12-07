const express = require('express');
const cors = require('cors');
const app = express();
const path = require("path");


require('dotenv').config();
require('./config/db_conn');
const port = process.env.PORT || 9000;

// Serve static files from 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/products", require("./routes/productRouter"))
app.use("/filter", require("./routes/filterRouter"))

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
