import React from 'react';
import { useState, useEffect } from 'react';
import './style/style.css'
import TopButton from './components/TopButton';
import SearchBar from './components/SearchBar';
import TimeAndLocation from './components/TimeAndLocation';
import TempDetails from './components/TempDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function capitalizeFirstLetter(string){
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function App() { 

  const [query, setQuery] = useState({q:"Colombo"});
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(0);

  useEffect(() => {
    const fetchWeather = async () => {

      const message = query.q ? query.q : "current location";
      toast.info(`Fetching weather data for ${capitalizeFirstLetter(message)}`);

      const data = await getFormattedWeatherData({ ...query, units });
      if(data) toast.success(`Fetched weather data for ${data.name}, ${data.country}`)
      setWeather(data);
    };

    fetchWeather();
  }, [query, units]);

  return (
    <>
    <div className="bg-[url(src/assets/img1.jpg)] bg-cover bg-center">
      <div className='mainBox mx-auto max-w-screen-lg mt-4 py-5 px-32'>
        <div>
          <div className='flex pt-8 items-center justify-between'>
            <h3 className='text-3xl font-bold'>Weather App</h3>
            <div>
                <TopButton setQuery = {setQuery}/>
            </div>
          </div>
          <SearchBar setQuery = {setQuery} setUnits = {setUnits} />
          {weather &&(
            <>
              <TimeAndLocation weather = {weather} />
              <TempDetails weather = {weather} units = {units}/>
              <Forecast title = "3 hour step forecast" data = {weather.hourly} />
              <Forecast title = "daily forecast" data = {weather.hourly} />
            </>
          )}

          <ToastContainer autoClose = {2500} hideProgressBar = {true} theme= "colored" />
        </div>
      </div>
    </div>
    </>
  )
}

export default App
