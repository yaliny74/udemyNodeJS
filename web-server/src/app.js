const express = require('express')

const app = express()

app.get('', (req, res) => res.send("hello"))
app.get('/help', (req, res) => res.send("this is help page"))
app.get('/about', (req, res) => res.send("<html><body><h1>this is about</body></html>"))
app.get('/weather', (req, res) => res.send("bir siktir git"))
app.get('*', (req, res) => res.send(`bir siktir git ${req.path}`))


app.listen(3000, () => console.log("http server started on port 3000"))
