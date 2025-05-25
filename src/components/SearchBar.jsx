import React, { useState } from 'react'
import { BiSearch,BiCurrentLocation } from 'react-icons/bi'

const SearchBar = ({setQuery,setUnits}) => {
    const [city,setCity] = useState("");

    const handleSearch = () => {
        if(city !== "") setQuery({q: city});
    };

    const handleLocation = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                const {latitude, longitude} = position.coords
                setQuery({lat: latitude, lon: longitude})
            });
        };
    };

  return (
    <div className='flex flex-row justify-center my-6'>
       <div className= "flex flex-row w-3/4 items-center justify-center space-x-4">
            <input 
                value = {city}
                onChange={(e) => setCity(e.currentTarget.value)}
                type='text'
                placeholder='search by city...'
                className='text-gray-500 text-xl ml-8 font-light p-2 pl-4 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase bg-white rounded-md'
            />
            <BiSearch 
                size = {30}  
                className='cursor-pointer transition ease-out hover:scale-125'
                onClick={handleSearch}
            />
            <BiCurrentLocation 
                size={30}
                className = 'cursor-pointer transition ease-out hover:scale-125'
                onClick={handleLocation}
            />
       </div>
       <div className='flex flex-row w-1/4 items-center justify-center'>
            <button className='text-2xl font-medium transition ease-out hover:scale-125'
                    onClick={() => setUnits("metric")}
            >
                °C 
            </button>
            <p className='text-2xl font-medium transition ease-out mx-1'> | </p>
            <button className='text-2xl font-medium transition ease-out hover:scale-125'
                    onClick={() => setUnits("imperial")}
            >
                °F 
            </button>
       </div>
        
    </div>
  )
}

export default SearchBar
