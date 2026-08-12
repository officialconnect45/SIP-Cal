const http = require("http");
const fs = require("fs");
const path = require("path");

const port = Number(process.env.PORT) || 3000;
const hostname = "0.0.0.0";
const root = path.join(__dirname, "out");

const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, {
    "Content-Type": mime[ext] || "application/octet-stream",
    "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=31536000, immutable",
  });
  fs.createReadStream(filePath).pipe(res);
}

function resolvePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0].split("#")[0]);
  let relative = clean === "/" ? "/index.html" : clean;
  if (!path.extname(relative)) {
    relative = relative.endsWith("/")
      ? `${relative}index.html`
      : `${relative}.html`;
  }
  const absolute = path.normalize(path.join(root, relative));
  if (!absolute.startsWith(root)) return null;
  return absolute;
}

const server = http.createServer((req, res) => {
  const absolute = resolvePath(req.url || "/");
  if (!absolute) {
    res.writeHead(403).end("Forbidden");
    return;
  }

  fs.stat(absolute, (err, stat) => {
    if (!err && stat.isFile()) {
      sendFile(res, absolute);
      return;
    }

    const fallback = path.join(root, "index.html");
    fs.stat(fallback, (fallbackErr, fallbackStat) => {
      if (!fallbackErr && fallbackStat.isFile()) {
        sendFile(res, fallback);
        return;
      }
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end(
        "Not found"
      );
    });
  });
});

server.listen(port, hostname, () => {
  console.log(`Calc Wealth static server on http://${hostname}:${port}`);
  console.log(`Serving ${root}`);
});
