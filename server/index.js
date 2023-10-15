import express from "express";
const app = express();
const PORT = 3001;

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server" });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
