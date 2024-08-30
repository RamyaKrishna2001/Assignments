#!/usr/bin/env node

// Its a CLI App which allows to perform CRUD on some notes that interacts with Json
import "./src/command.js";

const app = require("./src/server.js");

app.listen("3001", () => {
  console.log("Server on http://localhost:3001");
});
