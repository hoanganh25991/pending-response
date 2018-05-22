const express = require("express")
const app = express()
const opener = require("opener");
const pending = require("./pending")

const PORT = 3000;

app.use(express.static('public'))

const importEmail = () => new Promise(resolve => setTimeout(() => resolve({inserted:6765434}), 300000))

app.get("/", (req, res) => {
  res.sendFile("index.html");
})

app.get("/import", async (req, res) => {
  pending(res)
  const result = await importEmail()
  res.write(JSON.stringify(result))
  res.end();
})

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`
  console.log("Running", url)
  opener(url)
})