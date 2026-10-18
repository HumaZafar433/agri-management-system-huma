import { useState, useEffect } from "react";

function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    let active = true;

    const fetchWeather = async () => {
      try {
        const url =
          "https://api.open-meteo.com/v1/forecast" +
          "?latitude=31.5204&longitude=74.3587" +
          "&current=temperature_2m,relative_humidity_2m,wind_speed_10m" +
          "&daily=precipitation_probability_max,temperature_2m_max,temperature_2m_min" +
          "&timezone=Asia%2FKarachi&forecast_days=4";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Weather data is unavailable");
        }

        const data = await response.json();

        if (active) {
          setWeather(data);
          setError("");
          setLastUpdated(new Date().toLocaleTimeString());
        }
      } catch (err) {
        if (active) {
          setError("Unable to load weather. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchWeather();

    const interval = setInterval(fetchWeather, 600000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return <p>Loading live weather...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!weather) {
    return null;
  }

  const current = weather.current;
  const daily = weather.daily;

  const humidityStatus =
    current.relative_humidity_2m < 40
      ? "Low"
      : current.relative_humidity_2m > 70
      ? "High"
      : "Optimal";

  return (
    <div className="card border-0 shadow-sm rounded-4">
      <div className="card-body p-4">

        <h5 className="fw-bold">Live Weather - Lahore</h5>

        <div className="row g-3 mt-2">

          <div className="col-md-3">
            <p className="text-muted mb-1">Temperature</p>
            <h3>{current.temperature_2m}°C</h3>
          </div>

          <div className="col-md-3">
            <p className="text-muted mb-1">Air Humidity</p>
            <h3>{current.relative_humidity_2m}%</h3>
            <span className="badge text-bg-success">
              {humidityStatus}
            </span>
          </div>

          <div className="col-md-3">
            <p className="text-muted mb-1">Wind Speed</p>
            <h3>{current.wind_speed_10m} km/h</h3>
          </div>

          <div className="col-md-3">
            <p className="text-muted mb-1">Rain Chance Today</p>
            <h3>{daily.precipitation_probability_max[0]}%</h3>
          </div>

        </div>

        <hr />

        <h6 className="fw-bold">Next 3 Days Forecast</h6>

        <div className="row g-3 mt-1">
          {daily.time.slice(1, 4).map((day, index) => (
            <div className="col-md-4" key={day}>
              <div className="bg-light rounded-3 p-3">
                <strong>{day}</strong>

                <p className="mb-1 mt-2">
                  Max: {daily.temperature_2m_max[index + 1]}°C
                </p>

                <p className="mb-0">
                  Min: {daily.temperature_2m_min[index + 1]}°C
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-muted small mt-3 mb-0">
          Last updated: {lastUpdated}
        </p>

      </div>
    </div>
  );
}

export default WeatherCard;