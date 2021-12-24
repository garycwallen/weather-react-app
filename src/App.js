import { useState } from 'react';
const api = {
  key: process.env.REACT_APP_API_KEY_WEATHER_APP,
  base: 'https://api.openweathermap.org/data/2.5/',
};

export default function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === 'Enter') {
      // TODO: Add in selection on search for units, or on-demand conversion
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
        });
    }
  };

  const dateBuilder = () => {
    let today = new Date().toDateString();

    return `${today}`;
  };

  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? weather.main.temp > 61
            ? 'app warm'
            : 'app'
          : 'app'
      }
    >
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Search...'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <>
            <div className='location-box'>
              <div className='location'>
                {weather.name}, {weather.sys.country}
              </div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temperature'>
                {Math.round(weather.main.temp)}°F
              </div>
              <div className='condition'>{weather.weather[0].main}</div>
            </div>
          </>
        ) : (
          ''
        )}
      </main>
    </div>
  );
}
