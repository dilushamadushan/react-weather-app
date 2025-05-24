import React from 'react'

const TopButton = () => {
    const city = [
        {id : 1,name: 'New York'},
        {id : 2,name: 'Los Angeles'},
        {id : 3,name: 'Chicago'},
        {id : 4,name: 'Houston'},
    ]
  return (
    <div className='flex items-center justify-between my-2'>
        {city.map((c) => (
            <button 
            key ={c.id}
            className='text-lg font-medium hover:bg-gray-500 hover:text-white px-3 py-2 rounded-md transition ease-in'>
                {c.name}
            </button>
        ))}
    </div>
  )
}

export default TopButton
