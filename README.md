# LoRaWAN Gateway Monitor for OS2IoT

A tool for extracting and visualising LoRaWAN gateway health information from the application [OS2IoT](https://os2.eu/produkt/os2iot) using built-in HTML and JavaScript methods. The tool identifies and dynamically displays the following applicable information every thirty minutes:

- LoRaWAN Gateway ID.
- Device Name.
- Location (Placement, Address & Postal Code).
- Daily Packages (Transferred & Received).
- Last seen.
- Status.
- Map using [Leaflet](https://leafletjs.com/).

![Screenshot of interface](https://raw.githubusercontent.com/ITKCityLab/LoRaWan-gateway-monitor/main/LoRaWan_Gateway_Monitor.png)

## Implementation

This tool uses the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) object to interact with servers and retrieve data from a specific URL. In order to do this successfully, a query and an API Key are required. These are unique to the organisation, therefore they will have to be collected and input into the correlating fields as well as ensuring the queries and data packages follow the same structure as below.
```
xhttp.open('GET', 'https://os2iot-backend.prod.os2iot.kmd.dk/api/v1/chirpstack/gateway?organizationId=ORGANISATION-ID');
```

```
xhttp.setRequestHeader('x-api-key', 'API-KEY-HERE');
```

## Data packages

In order to correctly navigate the response (data), the corresponding paths throughout the code must match the structure of the package. Below is an example of the string that withdraws the Gateway Description:

```
data.result[i].description;
```

```
{
  "result": [
    {
      "id": "7276ff002e05024c",
      "name": "2016-LRW-01",
      "description": "Trige Bibliotek, Smedebroen 21, 8380 Trige\n",
      "createdAt": "2021-08-29T19:48:26.366158Z",
      "updatedAt": "2022-09-15T11:30:21.222761Z",
      "firstSeenAt": "2021-09-20T22:06:23.460213Z",
      "lastSeenAt": "2022-09-15T11:30:21.220274Z",
      "organizationID": "1",
      "networkServerID": "1",
      "location": {
        "latitude": 56.25279998779297,
        "longitude": 10.148417472839355,
        "altitude": 77,
        "source": "UNKNOWN",
        "accuracy": 0
      },
      "networkServerName": "OS2iot",
      "internalOrganizationId": 6
    }
```
