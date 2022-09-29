# LoRaWAN Gateway Monitor for OS2IoT

A tool for extracting and visualising LoRaWAN gateway health information from the application [OS2IoT](https://os2.eu/produkt/os2iot) using built-in HTML and JavaScript methods. The tool identifies and dynamically displays the following applicable information every thirty minutes:

- LoRaWAN Gateway ID.
- Device Name.
- Location (Placement, Address & Postal Code).
- Daily Packages (Transferred & Received).
- Last seen.
- Status.
- [Leaflet](https://leafletjs.com/) Map.



## Implementation

This tool uses the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) object to interact with servers and retrieve data from a specific URL, wherein a desginated query and an API Key are required. These are unique to the organisation and it's correlating OS2IoT-backend, therefore they will have to be collected and input into the correlating fields within the config.js file, as well as ensuring the queries and data packages follow the same structure as below.
```
apiKey : 'API-KEY-HERE',
url_gateways : 'OS2IoT-BACKEND-URL-HERE/api/v1/chirpstack/gateway?organizationId=ORGANISATION-ID-HERE',
url_gateway : 'OS2IoT-BACKEND-URL-HERE/api/v1/chirpstack/gateway?'
```

## Data packages

In order to correctly navigate the response (in this case defined as "data"), the corresponding paths throughout the code must match the structure of the package. Below is an example of the string that withdraws the Gateway Description from the optained response query:

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
