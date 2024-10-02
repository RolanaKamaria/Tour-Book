import SmallHeader from "../../layout/SmallHeader"
import backButton from "../../../assets/images/backButton.svg"
import WeatherPhoto from "../../../assets/images/weather.svg"
import SearchIcon from "../../../assets/images/weatherIcon.png"
import { useEffect, useState } from "react";
import axios from "axios";
import WeatherLineChart from "./WeatherLineChart";
import { useNavigate } from "react-router-dom";

function Weather() {
  const [city, setCity] = useState('حمص');
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = "7611591014c19ce10b7025aee7e85779";
  const navigate = useNavigate()
  useEffect(() => {
    if (city) {
      fetchWeatherData();
      console.log(weatherData)
    }
  }, []);

  const request = () => {
    fetchWeatherData()
  }
  const handelBack = () => {
    navigate('/orgnizer-home');
  }
  //get weather prediction using openweathermap forcast api
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      setWeatherData(response.data);
    } catch (error) {

      console.error('Error fetching weather data:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }

    }

  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <div className=" text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia'] text-center py-40">Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <SmallHeader />
      <div className="flex flex-row items-center mx-10 mt-10
                    xl:space-x-80 xl:px-24 
                    lg:space-x-60 lg:px-20
                    md:space-x-60 md:px-16">
        <div className="flex flex-col justify-center items-center">
        <div className="flex flex-row justify-center items-center 
                    xl:space-x-10 lg:space-x-8 md:space-x-6  ">
          <img src={backButton} onClick={handelBack} className=" hover:cursor-pointer 
                            xl:w-12 xl:h-12
                            lg:w-10 lg:h-10
                            md:w-8 md:h-8" />
          <div className=" text-title-light xl:text-3xl lg:text-2xl md:text-xl font-['Georgia']">Weather</div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <div className="flex flex-row items-center 
          xl:space-x-8 lg:space-x-6 md:space-x-4">
          <input type="text" onChange={(e) => { setCity(e.target.value) }} placeholder="enter city ..."
            className="flex flex-col drop-shadow-[1px_1px_rgba(117,135,142)] text-input-text-light bg-post-bg-light  border-solid border-2 border-text-light py-1 text-center
                            xl:rounded-xl xl:text-xl xl:h-10 xl:w-40 
                            lg:rounded-lg lg:text-lg lg:h-9 lg:w-32
                            md:rounded-md md:text-base  md:h-8 md:w-28" />
          <img src={SearchIcon} onClick={request}
            className="hover:cursor-pointer  hover:drop-shadow-[1px_1px_rgba(117,135,142)] xl:w-20 xl:h-20 lg:w-16 lg:h-16 md:w-14 md:h-14" />
            </div>
        </div>
      </div>
      <div className="flex flex-row justify-center xl:px-28 lg:px-24 md:px-20 pt-5 ">
        <div className="flex flex-col justify-center rounded-lg w-2/3 drop-shadow-[1px_1px_rgba(117,135,142)]  border-solid border-2 border-text-light mb-10
            bg-gradient-to-br from-backOpacityBgFrom-light from-3% via-post-bg-light via-40% to-backOpacityBgTo-light to-80% ">

          <WeatherLineChart weatherData={weatherData.list} />

        </div>
        <div className="flex flex-col justify-center items-end w-1/3">
          <img src={WeatherPhoto} />
        </div>
      </div>
    </div>
  )
}

export default Weather