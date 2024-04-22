import React, { useState, useEffect } from 'react';

function Theme() {
    const [Theme, setTheme]  = useState('light');
    const toggleTheme = () => {
        setTheme(Theme == 'dark' ? 'light' : 'dark');
    }
    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme' , Theme);
    } , [Theme]);
  return (
    <>
      {/* <div className='flex justify-end p-3'>
        <input onClick={toggleTheme} type="checkbox" className="toggle" />
      </div> */}
    </>
  )
}

export default Theme