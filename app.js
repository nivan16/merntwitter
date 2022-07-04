//new express server
const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const app = express();
const port = process.env.PORT || 5001;
const bodyParser = require('body-parser');
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const path = require('path');
const passport = require('passport');
app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port, ()=> console.log(`Server is running on port ${port}`))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}
app.use("/api/users", users);
app.use("/api/tweets", tweets);





mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

