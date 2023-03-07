const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const cors = require("cors");
const http = require('http');
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(express.json());
app.use(express.static('public'));
app.use(cors());
const PORT = 5000;

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

function isCorrect(code) {
  if (!code.startsWith("ZST") || !code.endsWith("ZST")) {
    return false;
  }
  if (code.length !== 9) {
    return false;
  }
  if (code.charCodeAt(3) < 65 || code.charCodeAt(3) > 68) {
    return false;
  }

  return true;
}

app.post("/login", (req, res) => {
  const code = req.body.password;
  const pass = code ? code.toUpperCase() : "";

  if (!pass || !isCorrect(pass)) res.sendStatus(400);
  else {
    let jwt = jsonwebtoken.sign(code, "VErySecret");
    const response = { field: pass.charCodeAt(3) - 64, jwt };

    res.statusCode = 200;
    res.json(response);
  }
});


const currentMatches = [
  { team1: "XXX", team2: "XXX", score1: [0, 0], score2: [0, 0] },
  { team1: "XXX", team2: "XXX", score1: [0, 0], score2: [0, 0] },
  { team1: "XXX", team2: "XXX", score1: [0, 0], score2: [0, 0] },
];

io.on('connection', (socket) => {
  socket.on("message", msg => {
    try {
      if ("jwt" in msg && msg.jwt) {
        delete msg.jwt;
        currentMatches[msg.field - 1] = msg;
        io.emit("score_change", currentMatches);
      }
    } catch (e) { console.warn(e); }
  });
});

server.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});