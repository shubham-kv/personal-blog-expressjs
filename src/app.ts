import "dotenv/config";
import express from "express";

const app = express();

app.disable("x-powered-by");

app.get("/", (_, res) => {
  res.json({
    message: "Hello World",
  });
});

export default app;
