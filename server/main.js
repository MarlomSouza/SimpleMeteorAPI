import { Meteor } from "meteor/meteor"

Meteor.startup(() => {
  WebApp.connectHandlers.use("/time", (req, res, next) => {
    if (req.method === "GET") {
      const currentTime = new Date().toISOString()
      res.writeHead(200, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ time: currentTime }))
    } else {
      res.writeHead(405)
      res.end() // Método não permitido
    }
  })

  // Expose a filtered set of environment variables.
  // Only variables prefixed with PUBLIC_ plus NODE_ENV are returned to avoid leaking secrets.
WebApp.connectHandlers.use("/env", (req, res) => {
  if (req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ env: process.env }))
  } else {
    res.writeHead(405)
    res.end()
  }
})

  // Simple health/status endpoint returning plain text 'ok'
  WebApp.connectHandlers.use("/ok", (req, res, next) => {
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" })
      res.end("oka2y")
    } else {
      res.writeHead(405)
      res.end()
    }
  })
})
