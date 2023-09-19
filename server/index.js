const express = require("express");
const app = express();
const path = require("path");
const PORT =3000;
const ViteExpress = require("vite-express");

// uncomment when ready to deploy
// ViteExpress.config({ mode: "production" })

const cors = require('cors');
app.use(cors());

app.use("/", express.static(path.join(__dirname, "public")));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api", require('./api'))
app.use("/auth", require("./auth"))

app.use((req, res, next) => {
    console.log("req headers", req.headers);
    const auth = req.headers.authorization;
    const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;
  
    try {
      req.user = jwt.verify(token, process.env.JWT);
    } catch {
      req.user = null;
    }
  
    next();
  });
  

const server = app.listen(PORT, ()=>{
    console.log('On port'+PORT)
})

ViteExpress.bind(app, server)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || "Internal server error.");
});
