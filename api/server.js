require("dotenv").config();
const express = require("express");
const knex = require("knex");
const cors = require("cors");

const db = require('./database/db');
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("HotelPennies API is running!");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
