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
  WebApp.connectHandlers.use("/env", (req, res, next) => {
    if (req.method === "GET") {
      const allowed = {}
      const includeKeys = ["NODE_ENV"]
      Object.keys(process.env).forEach((key) => {
        if (key.startsWith("PUBLIC_") || includeKeys.includes(key)) {
          allowed[key] = process.env[key]
        }
      })
      res.writeHead(200, { "Content-Type": "application/json" })
      res.end(JSON.stringify({ env: allowed }))
    } else {
      res.writeHead(405)
      res.end()
    }
  })

  // Simple health/status endpoint returning plain text 'ok'
  WebApp.connectHandlers.use("/ok", (req, res, next) => {
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" })
      res.end("ok")
    } else {
      res.writeHead(405)
      res.end()
    }
  })
})
