const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require("./routes/UserRoutes");
const cors = require("cors");


const app = express();

app.use(express.json());

app.use(cors({
    origin:'*'
}));

const mongoString = "mongodb+srv://oxy:12345@cluster0.qw1l0ah.mongodb.net/netflixfirebase"
mongoose.connect(mongoString);
const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use("/api/user", userRoutes);


app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})