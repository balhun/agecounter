import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import './App.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';


function App() {
  const [birthdate, setBirthdate] = useState(dayjs(Cookies.get("birthdate")) || dayjs('2000-01-01'));
  const [age, setAge] = useState("0.00000000");
  const [change, setChange ] = useState(Cookies.get("birthdate") ? false : true)


  function setBirthdateAndSave(date) {
    setChange(false);
    setBirthdate(date)
    Cookies.set("birthdate", date, { expires: 365 });
  }

  const calculateAge = (birthdate) => {
    const birthTime = new Date(birthdate).getTime();
    const now = new Date().getTime();
    const ageInMilliseconds = now - birthTime;
    return (ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)).toFixed(8);
};

useEffect(() => {
    if (!birthdate) return;
    const interval = setInterval(() => {
        setAge(calculateAge(birthdate));
    }, 100);

    return () => clearInterval(interval);
}, [birthdate]);

  return (
    <>
      {change ? 
        <div className='birthdate'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="What's your birthdate?" value={birthdate} onChange={(date) => setBirthdateAndSave(date)}/>
          </LocalizationProvider>
        </div>
        :
        <div className='age' onClick={() => setChange(true)}>
          {age == "0.00000000" ? "" : <h1 className="age-display">You are {age} years old</h1>}
        </div>
      }
    </>
  )
}

export default App
