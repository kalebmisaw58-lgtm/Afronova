// Entry point for cPanel Node.js Selector
// This file starts the Next.js standalone server.
// cPanel → Node.js → Application startup file: server.js

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev  = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app  = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(`> AfroNova ready on http://localhost:${port}`);
  });
});
