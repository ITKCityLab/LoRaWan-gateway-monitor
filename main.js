function msToTime(ms) {
  let seconds = (ms / 1000).toFixed(0);
  let minutes = (ms / (1000 * 60)).toFixed(0);
  let hours = (ms / (1000 * 60 * 60)).toFixed(0);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (seconds < 60) return seconds + " sek. siden";
  else if (minutes < 60) return minutes + " min. siden";
  else if (hours < 24) return hours + " timer siden";
  else return days + " dage siden"
};

function loadXMLDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.open('GET', config.url_gateways);
  xhttp.setRequestHeader('x-api-key', config.apiKey);
  xhttp.onreadystatechange = function() {

    if (xhttp.readyState == 4 && xhttp.status == 200) {

      document.body.innerHTML = "";

      var data = JSON.parse(xhttp.responseText);

      var div = document.createElement("DIV");
      div.id = "watermark";
      document.body.appendChild(div);

      var map_div = document.createElement("DIV");
      map_div.id = "map";
      document.body.appendChild(map_div);

      let dateObj = new Date();
      let timeStr = dateObj.toLocaleTimeString('da-DK', {hour: 'numeric', minute: 'numeric'}).replace('.',':');
      let dateStr = dateObj.toLocaleDateString('da-DK', {day: 'numeric', month: 'short', year: 'numeric'});
      let timeDateStr = dateStr + ', ' + timeStr;

      var marker_group = L.featureGroup();
      var map = L.map('map', {zoomSnap: 0.35, zoomControl: false, dragging: true, doubleClickZoom: true, scrollWheelZoom: true, boxZoom: false}).setView([56.167664,10.205216], 10.8);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | Opd. '+timeDateStr}).addTo(map);
      
      var table_div = document.createElement("DIV");
      table_div.id = "table_div";
      table_div.style.margin = "0px";
      table_div.style.padding = "0px";
      table_div.style.border = "0px";
      document.body.appendChild(table_div);
      let create_table = document.createElement('Table');
      create_table.id = "Gateways";
      table_div.append(create_table);

      let table = document.getElementById("Gateways");
      let row = table.insertRow(0);
      row.style.backgroundColor = "#005f7c";
      row.style.color = "white";
      row.style.paddingTop = "12px";
      row.style.paddingBottom = "12px";
      row.style.fontWeight = "bold";

      let cell1 = row.insertCell(0);
      cell1.innerHTML = "Nr.";

      let cell2 = row.insertCell(1);
      cell2.innerHTML = "LoRaWAN Gateway ID";

      let cell3 = row.insertCell(2);
      cell3.innerHTML = "Navn";

      let cell4 = row.insertCell(3);
      cell4.innerHTML = "Lokation";

      let cell5 = row.insertCell(4);
      cell5.innerHTML = "Modtaget";

      let cell6 = row.insertCell(5);
      cell6.innerHTML = "Sendt";

      let cell7 = row.insertCell(6);
      cell7.innerHTML = "Seneste aktivitet";

      /*
      let cell8 = row.insertCell(7);
      cell8.innerHTML = "Status";
      */

      for (let i = 0; i < data.totalCount; i++) {

          let table = document.getElementById("Gateways");
          let row = table.insertRow(-1);

          let cell1 = row.insertCell(-1);
          cell1.innerHTML = "#"+(i+1);
          cell1.className = "right"

          let cell2 = row.insertCell(-1);
          cell2.innerHTML = data.resultList[i].gatewayId;
          cell2.className = "right";

          let cell3 = row.insertCell(-1);
          cell3.innerHTML = data.resultList[i].name;

          let cell4 = row.insertCell(-1);
          cell4.innerHTML = data.resultList[i].description.substring(0,30);

          let cell5 = row.insertCell(-1);
          cell5.innerHTML = data.resultList[i].rxPacketsReceived;
          cell5.className = "right";

          let cell6 = row.insertCell(-1);
          cell6.innerHTML = data.resultList[i].txPacketsEmitted;
          cell6.className = "right"

          let cell7 = row.insertCell(-1);
          cell7.innerHTML = data.resultList[i].description;
          cell7.className = "right";

          let current_date_now = new Date();
          current_date_now.toLocaleString('da-dk', {timeZone: 'Europe/Copenhagen'});
          let current_date_db_now = new Date(data.resultList[i].lastSeenAt);
          current_date_db_now.toLocaleString('da-dk', {timeZone: 'Europe/Copenhagen'});

          let current_date = current_date_now - current_date_db_now;
          cell7.innerHTML = (current_date < 36*10**9) ? msToTime(current_date) : "ERROR!";

          let cell8 = row.insertCell(-1);
          cell8.innerHTML = (current_date < 3600000) ? "&#10004" : "&#10006";
          cell8.style.backgroundColor = (current_date < 3600000) ? "#50ff5db5" : "#ff5050b5";


          let markers = (current_date < 3600000) ?
          L.marker([data.resultList[i].location.latitude, data.resultList[i].location.longitude],
          {icon: L.divIcon({className: 'online', html: (i+1) })}).addTo(map) :
          L.marker([data.resultList[i].location.latitude, data.resultList[i].location.longitude],
          {icon: L.divIcon({className: 'offline', html: (i+1) })}).addTo(map);


          /*
          let xhttp_pakker = new XMLHttpRequest();
          xhttp_pakker.open('GET', config.url_gateway+data.resultList[i].id);
          xhttp_pakker.setRequestHeader('x-api-key', config.apiKey);
          xhttp_pakker.onreadystatechange = function() {

              if (xhttp_pakker.readyState == 4 && xhttp_pakker.status == 200) {

                let data_pakker = JSON.parse(xhttp_pakker.responseText);

                let cell5 = row.insertCell(-1);
                cell5.innerHTML = data_pakker.stats[data_pakker.stats.length-1].rxPacketsReceived;

                let cell6 = row.insertCell(-1);
                cell6.innerHTML = data_pakker.stats[data_pakker.stats.length-1].txPacketsReceived;

                let cell7 = row.insertCell(-1);
                
                let current_date_now = new Date();
                current_date_now.toLocaleString('da-dk', {timeZone: 'Europe/Copenhagen'});
                let current_date_db_now = new Date(data.resultList[i].lastSeenAt);
                current_date_db_now.toLocaleString('da-dk', {timeZone: 'Europe/Copenhagen'});

                let current_date = current_date_now - current_date_db_now;
                cell7.innerHTML = (current_date < 36*10**9) ? msToTime(current_date) : "ERROR!";

                let cell8 = row.insertCell(-1);
                cell8.innerHTML = (current_date < 3600000) ? "&#10004" : "&#10006";
                cell8.style.backgroundColor = (current_date < 3600000) ? "#50ff5db5" : "#ff5050b5";

                let markers = (current_date < 3600000) ?
                L.marker([data.resultList[i].location.latitude, data.resultList[i].location.longitude],
                {icon: L.divIcon({className: 'online', html: (i+1) })}).addTo(map) :
                L.marker([data.resultList[i].location.latitude, data.resultList[i].location.longitude],
                {icon: L.divIcon({className: 'offline', html: (i+1) })}).addTo(map);

                marker_group.addLayer(markers);
                map.fitBounds(marker_group.getBounds());

              }
          }
          xhttp_pakker.send();
           */
            }
          
      }
    }
  xhttp.send();
};