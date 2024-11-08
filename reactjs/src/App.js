import { Oval } from 'react-loader-spinner';
import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [weather, setWeather] = useState({ loading: false, data: {}, forecast: [], error: false });
  const [favorites, setFavorites] = useState([]);

  const toDateFunction = () => {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const WeekDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  };

  const search = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setWeather(prev => ({ ...prev, loading: true }));
      const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
      const weather_url = 'https://api.openweathermap.org/data/2.5/weather';
      const forecast_url = 'https://api.openweathermap.org/data/2.5/forecast';

      try {
        // Fetch current weather
        const weatherRes = await axios.get(weather_url, {
          params: {
            q: input,
            units: 'metric',
            appid: api_key,
          },
        });
        // Fetch 5-day forecast
        const forecastRes = await axios.get(forecast_url, {
          params: {
            q: input,
            units: 'metric',
            appid: api_key,
          },
        });

                // Filter the forecast data to show one result per day
                const dailyForecast = forecastRes.data.list.filter((_, index) => index % 8 === 0);

     

                setWeather({
                  data: weatherRes.data,
                  forecast: dailyForecast,
                  loading: false,
                  error: false,
                });
                setInput('');
              } catch (error) {
                setWeather({ data: {}, forecast: [], loading: false, error: true });
                setInput('');
              }
            }
          };

          // Save a city as a favorite
  const addFavorite = () => {
    if (!favorites.includes(input)) {
      const newFavorites = [...favorites, input];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

   // Remove all favorites
   const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

   // Load favorites from localStorage on app load
   useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  }, []);

   // Handle clicking on a favorite city
   const handleFavoriteClick = (city) => {
    setInput(city);
  };

  return (
    <div className="App">
      <h1>Application Météo grp204</h1>
      <div className='search_bar'>
        <input
          type='text'
          className='city-search'
          placeholder='Entrez le nom de la ville...'
          name='query'
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={search}
        />
        <button onClick={addFavorite} className='btnfav'> Ajouter aux favoris</button>
        <p>Appuyez sur Entrée pour rechercher</p>
      </div>

      {/* Favorite cities list */}
      <div className="favorites">
        <h3>Villes Favorites:</h3>
        <ul>
          {favorites.map((city, index) => (
            <li key={index} onClick={() => handleFavoriteClick(city)}>
              {city}
            </li>
          ))}
        </ul>
        {favorites.length > 0 && (
          <button onClick={clearFavorites} className='btn-clear'>Supprimer tous les favoris</button>
        )}
      </div>

      {weather.loading && (
        <p>Loading...</p>
      )}

      {weather.error && (
        <span className='error-message'>
          <FontAwesomeIcon icon={faFrown} />
          <span>Ville introuvable</span>
        </span>
      )}



      {weather.forecast.length > 0 && (
        <div className="forecast">
          <h3>Prévisions météo sur 5 jours</h3>
          <div className="forecast-grid">
            {weather.forecast.map((day, index) => (
              <div key={index} className="forecast-day">
                <p>{new Date(day.dt_txt).toLocaleDateString('fr-FR')}</p>
                <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt={day.weather[0].description} />
                <p>{Math.round(day.main.temp)}°C</p>
                <p>Vitesse du vent : {weather.data.wind.speed}m/s</p>

              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
