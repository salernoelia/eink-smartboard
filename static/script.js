document.addEventListener("DOMContentLoaded", function () {
  fetchStationBoard();
  updateTime();

  // Refresh station board every 10 seconds
  setInterval(fetchStationBoard, 10000);
  // Update time every second
  setInterval(updateTime, 1000);
});

function fetchStationBoard() {
  var apiUrl =
    "http://transport.opendata.ch/v1/stationboard?station=Zürich+Morgental";
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var departures = data.stationboard;
      var departuresTable = document.getElementById("departures");
      // Clear previous entries
      departuresTable.innerHTML = "";

      departures.forEach(function (departure) {
        var row = document.createElement("tr");
        row.innerHTML =
          "<td>" +
          departure.number +
          "</td>" +
          "<td>" +
          resolveCategory(departure.category) +
          "</td>" +
          "<td>" +
          departure.to +
          "</td>" +
          '<td class="right-align">' +
          formatTime(departure.stop.departure) +
          "</td>" +
          '<td class="right-align">' +
          (departure.stop.platform || "N/A") +
          "</td>";
        departuresTable.appendChild(row);
      });
    })
    .catch(function (error) {
      console.error("Error fetching data:", error);
    });
}

function resolveCategory(categoryCode) {
  var categories = {
    B: "Bus",
    T: "Tram",
    Z: "Zug",
  };
  return categories[categoryCode] || categoryCode;
}

function formatTime(dateTimeString) {
  if (!dateTimeString) return "N/A";
  var date = new Date(dateTimeString);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function updateTime() {
  var currentTimeElement = document.getElementById("current-time");
  var now = new Date();
  currentTimeElement.textContent = now.toLocaleString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
