const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

function getLanIPv4() {
  const nets = os.networkInterfaces();
  for (const ifaces of Object.values(nets)) {
    for (const net of ifaces || []) {
      if (net.family === "IPv4" && !net.internal) return net.address;
    }
  }
  return null;
}
const ROOT = __dirname;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

const REDIRECTS = {
  "/services": "/#tarifs",
  "/contact": "/#contact",
};

const server = http.createServer((req, res) => {
  const url = req.url.split("?")[0];

  if (REDIRECTS[url]) {
    res.writeHead(302, { Location: REDIRECTS[url] });
    res.end();
    return;
  }

  const relativePath = url === "/" ? "index.html" : url.replace(/^\//, "");
  const filePath = path.join(ROOT, relativePath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(ROOT, "index.html"), (fallbackErr, fallbackData) => {
        if (fallbackErr) {
          res.writeHead(404);
          res.end("Not found");
          return;
        }
        res.writeHead(200, { "Content-Type": MIME[".html"] });
        res.end(fallbackData);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, HOST, () => {
  const lan = getLanIPv4();
  console.log(`Tisy Clean — http://localhost:${PORT}`);
  if (lan) {
    console.log(`Réseau local (iPhone, même Wi‑Fi) — http://${lan}:${PORT}`);
  }
  console.log(`Contact — http://localhost:${PORT}/#contact`);
});
