document.getElementById("current-time").textContent =
  new Date().toLocaleString();

function updateTime() {
  var currentTimeElement = document.getElementById("current-time");
  currentTimeElement.textContent = new Date().toLocaleString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
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
  var date = new Date(dateTimeString);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function fetchDepartures() {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "http://transport.opendata.ch/v1/stationboard?station=Zürich+Morgental&limit=9",
    true
  );
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 400) {
      var departures = JSON.parse(xhr.responseText).stationboard;
      var departuresBody = document.getElementById("departures-body");
      var html = "";
      for (var i = 0; i < departures.length; i++) {
        html +=
          "<tr>" +
          "<td>" +
          departures[i].number +
          "</td>" +
          "<td>" +
          resolveCategory(departures[i].category) +
          "</td>" +
          "<td>" +
          departures[i].to +
          "</td>" +
          '<td class="right-align">' +
          formatTime(departures[i].stop.departure) +
          "</td>" +
          '<td class="right-align">' +
          (departures[i].stop.platform || "N/A") +
          "</td>" +
          "</tr>";
      }
      departuresBody.innerHTML = html;
    } else {
      console.error("Error fetching departures:", xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Error fetching departures:", xhr.statusText);
  };
  xhr.send();
}

setInterval(updateTime, 1000);
setInterval(fetchDepartures, 10000);
fetchDepartures();
