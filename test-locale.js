const http = require("http");

const options = {
  hostname: "localhost",
  port: 3000,
  path: "/",
  method: "GET",
  headers: {
    "Accept-Language": "fr",
  },
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  if (res.statusCode >= 300 && res.statusCode < 400) {
    console.log(`REDIRECT LOCATION: ${res.headers.location}`);
  }
});

req.on("error", (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
