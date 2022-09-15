const dotenv = require("dotenv")
const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 
dotenv.config({path:"./config.env"})

connectToMongo();
const app = express()
const port = process.env.port || 5000

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

if(process.env.NODE_ENV === "production"){

  app.use(express.static("build"));

  const path = require("path");

  app.get("*", (req, res) => {

      res.sendFile(path.resolve(__dirname,'build', 'index.html'));

  })
}

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})
/*here in package.json removed "test": "echo\kuch or bhi likha hoga" 
and replace it with "serve":"nodemon server.js"
then in terminal type : npm run serve*/