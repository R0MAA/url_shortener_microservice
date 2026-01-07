"use strict";

const dns = require("dns");
const urlParser = require("url");

let urlDatabase = [];
let counter = 1;

module.exports = function (app) {

  // POST short URL
  app.post("/api/shorturl", (req, res) => {
    const originalUrl = req.body.url;

    // Validate URL format
    const parsedUrl = urlParser.parse(originalUrl);
    if (!parsedUrl.protocol || !parsedUrl.hostname) {
      return res.json({ error: "invalid url" });
    }

    // DNS lookup
    dns.lookup(parsedUrl.hostname, (err) => {
      if (err) {
        return res.json({ error: "invalid url" });
      }

      const shortUrl = counter++;
      urlDatabase.push({ originalUrl, shortUrl });

      res.json({
        original_url: originalUrl,
        short_url: shortUrl
      });
    });
  });

  // GET short URL
  app.get("/api/shorturl/:short", (req, res) => {
    const short = parseInt(req.params.short);

    const record = urlDatabase.find(u => u.shortUrl === short);
    if (!record) {
      return res.json({ error: "invalid url" });
    }

    res.redirect(record.originalUrl);
  });

};
