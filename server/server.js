const express = require('express');
const cors = require('cors');
const config = require('./config');
const mongoose = require('mongoose');
const loadTestData = require('./testData');
const helmet = require('helmet');

const app = express();

// import routes
const postRoutes = require('./routes/post.routes');

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', postRoutes);

// connects our back end code with the database
mongoose.connect(config.DB, { useNewUrlParser: true });
let db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
    loadTestData();
});
db.on('error', (err) => console.log('Error ' + err));

app.listen(config.PORT, function() {
    console.log("Function is listening on port:", config.PORT);
});

app.use(function (req, res, next) {
    res.status(404).send("We are sorry, page not found");
});