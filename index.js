require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const morgan = require("morgan");
const routes = require('./routes/resturants');
const cors = require('cors');
const serveStatic = require('serve-static');

app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, "client/build")));


if (process.env.NODE_ENV === "production") {
  app.use(serveStatic(__dirname + "/build")); 
}

// app.use(serveStatic(__dirname + "/build")); //
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
//   });

// console.log(__dirname);
// console.log(path.join(__dirname, "client/build"));

app.use('/',routes );


app.use(morgan('short'));

app.get("/", (req, res)=>{
  res.send("server is up and running!!!!")
})

app.listen(PORT, ()=>{
    console.log(`server is up and running at PORT:  ${PORT}`);
})