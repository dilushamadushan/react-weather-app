import React from 'react';
import './style/style.css'
import TopButton from './components/TopButton';
import SearchBar from './components/SearchBar';
import TimeAndLocation from './components/TimeAndLocation';
import TempDetails from './components/TempDetails';
import Forecast from './components/Forecast';

function App() {
  return (
    <>
    <div className="bg-[url(src/assets/img1.jpg)] bg-cover bg-center">
      <div className='mainBox mx-auto max-w-screen-lg mt-4 py-5 px-32'>
        <div>
          <div className='flex pt-8 items-center justify-between'>
            <h3 className='text-3xl font-bold'>Weather App</h3>
            <div>
                <TopButton />
            </div>
          </div>
          <SearchBar />
          <TimeAndLocation />
          <TempDetails />
          <Forecast />
          <Forecast />
        </div>
      </div>
    </div>
    </>
  )
}

export default App
