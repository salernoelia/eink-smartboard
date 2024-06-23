import express from "express";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

function resolveCategory(categoryCode) {
  const categories = {
    B: "Bus",
    T: "Tram",
    Z: "Zug",
  };
  return categories[categoryCode] || categoryCode;
}

function formatTime(dateTimeString) {
  if (!dateTimeString) return "N/A";
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

app.get("/", async (req, res) => {
  const apiUrl =
    "http://transport.opendata.ch/v1/stationboard?station=Zürich+Morgental&limit=8";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.render("index", {
      departures: data.stationboard,
      resolveCategory,
      formatTime,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.get("/api/departures", async (req, res) => {
  const apiUrl =
    "http://transport.opendata.ch/v1/stationboard?station=Zürich+Morgental&limit=8";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data.stationboard);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
