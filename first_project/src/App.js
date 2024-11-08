import React, { useState, useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown, faStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './App.css';

function Grp204WeatherApp() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({ loading: false, data: {}, error: false });
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris au démarrage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Sauvegarder les favoris
  const saveFavorite = (city) => {
    if (!favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  // Supprimer tous les favoris
  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  // Obtenir la date en français pour les prévisions
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  // Fonction pour rechercher les données météo
  const searchWeather = async (city = input) => {
    setWeather({ ...weather, loading: true });
    setInput('');
    setForecast([]);
    
    const currentWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

    try {
      // Requête pour les données météo actuelles
      const weatherRes = await axios.get(currentWeatherUrl, {
        params: { q: city, units: 'metric', appid: api_key },
      });
      setWeather({ data: weatherRes.data, loading: false, error: false });

      // Requête pour les prévisions météo
      const forecastRes = await axios.get(forecastUrl, {
        params: { q: city, units: 'metric', appid: api_key },
      });

      // Obtenir les prévisions pour les 5 prochains jours
      const dailyForecasts = forecastRes.data.list.filter(reading => reading.dt_txt.includes("12:00:00")).slice(0, 5);
      setForecast(dailyForecasts);

    } catch (error) {
      setWeather({ ...weather, data: {}, error: true, loading: false });
    }
  };

  // JSX
  return (
    <div className="App">
      <h1 className="app-name">Application Météo grp204</h1>
      
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Entrez le nom de la ville..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={(event) => event.key === 'Enter' && searchWeather()}
        />
        <button onClick={() => saveFavorite(weather.data.name)}>
          <FontAwesomeIcon icon={faStar} /> Ajouter aux favoris
        </button>
      </div>

      {/* Liste des villes favorites */}
      {favorites.length > 0 && (
        <div className="favorites">
          <h3>Villes favorites :</h3>
          <ul>
            {favorites.map((city, index) => (
              <li key={index} onClick={() => searchWeather(city)}>{city}</li>
            ))}
          </ul>
          <button onClick={clearFavorites} className="clear-favorites">
            Supprimer tous les favoris
          </button>
        </div>
      )}

      {weather.loading && <Oval color="red" height={100} width={100} />}
      
      {weather.error && (
        <span className="error-message">
          <FontAwesomeIcon icon={faFrown} />
          <span>Ville introuvable</span>
        </span>
      )}

      {weather.data && weather.data.main && (
        <div className="weather-info">
          <h2>{weather.data.name}, {weather.data.sys.country}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
            alt={weather.data.weather[0].description}
          />
          <p>{Math.round(weather.data.main.temp)}°C</p>
          <p>Vitesse du vent : {weather.data.wind.speed} m/s</p>
        </div>
      )}

      {/* Prévisions sur plusieurs jours */}
      {forecast.length > 0 && (
        <div className="forecast">
          <h3>Prévisions sur 5 jours :</h3>
          <div className="forecast-cards">
            {forecast.map((day, index) => (
              <div key={index} className="forecast-card">
                <p>{formatDate(day.dt)}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                />
                <p className="temp">{Math.round(day.main.temp)}°C</p>
                <p>Vitesse du vent : {day.wind.speed} m/s</p> {/* Affichage de la vitesse du vent */}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Grp204WeatherApp;
