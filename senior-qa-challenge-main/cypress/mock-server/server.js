//http://localhost:3001/api/mockOslo

const express = require('express');
const app = express();

app.get('/api/mockOslo', (req, res) => {


    const mkedResponse = {
        "coord": {
            "lon": 11.1729,
            "lat": 60.2839
        },
        "weather": [
            {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 22.17,
            "feels_like": 21.49,
            "temp_min": 21.08,
            "temp_max": 22.74,
            "pressure": 1024,
            "humidity": 40
        },
        "visibility": 10000,
        "wind": {
            "speed": 5.14,
            "deg": 190
        },
        "clouds": {
            "all": 0
        },
        "dt": 1686490582,
        "sys": {
            "type": 2,
            "id": 2006195,
            "country": "NO",
            "sunrise": 1686448247,
            "sunset": 1686515950
        },
        "timezone": 7200,
        "id": 3142539,
        "name": "Råholt",
        "cod": 400
    };


    res.json(mkedResponse);
});


const port = 3001;

app.listen(port, () => {
  console.log(`Mock server is running on port ${port}`);
});

