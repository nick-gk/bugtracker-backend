const express = require('express');
const db = require("./config/db");

const app = express();

const connectDB = async () => {
   try {
       await db.authenticate();
       console.log('Connection has been established successfully.');
       // Daca facem modificari la baza de date, folosim force: true. Atlfel alter: true
       db.sync({force: true})
         .then(() => console.log("Tables Created"))
         .catch((error) => console.log(error));
     } catch (error) {
       console.error('Unable to connect to the database:', error);
     }
}

connectDB();

app.use(express.json({extended: false}));

app.use("/api/auth", require('./routes/api/auth'));
app.use("/api/project", require("./routes/api/project"));
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send("BugTracker Ale is online"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));