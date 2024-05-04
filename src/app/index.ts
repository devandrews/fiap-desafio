import express from "express";

const { PORT = 3000 } = process.env;

function main() {
  const app = express();

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

main();
