const express = require('express');
const db = require("./config/db");

const app = express();

const connectDB = async () => {
   try {
       await db.authenticate();
       console.log('Connection has been established successfully.');
       db.sync({alter: true})
         .then(() => console.log("Tables Created"))
         .catch((error) => console.log(error));
     } catch (error) {
       console.error('Unable to connect to the database:', error);
     }
}

connectDB();

app.use(express.json({extended: false}));

app.use("/api/auth", require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send("BugTracker is online"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));