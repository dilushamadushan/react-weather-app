import { DateTime } from "luxon";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchWeatherData = (inforType, searchParams) => {
    const url  = new URL(BASE_URL + inforType);
    url.search = new URLSearchParams({...searchParams, appid: API_KEY});

    return fetch(url).then((res) => res.json());
};

const iconUrlFromCode = (i) => `http://openweathermap.org/img/wn/${i}@2x.png`;

const formatToLocalTime = (secs, offset, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") =>
    DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

const formatCurrentWeather = (data) => {
    const {
        coord: {lon, lat},
        main: {temp,feels_like, temp_min, temp_max, humidity},
        name,
        dt,
        sys: { country, sunrise, sunset },
        weather,
        wind: {speed},
        timezone,
    } = data;

    const {main: details,icon} = weather[0];
    const formattedLocalTime = formatToLocalTime(dt,timezone);

    return {
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        country,
        sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
        sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
        speed,
        details,
        icon : iconUrlFromCode(icon),
        formattedLocalTime,
        dt,
        timezone,
        lon,
        lat
    }
}

const formatForecastWeather = (secs, offset, data) => {
    const hourly = data
    .map((f) => ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, offset, "hh:mm a"),
        icon: iconUrlFromCode(f.weather[0].icon),
        date: f.dt_txt
    })).slice(0, 5);

    const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
        temp: f.main.temp,
        title: formatToLocalTime(f.dt, offset, "hh:mm a"),
        icon: iconUrlFromCode(f.weather[0].icon),
        date: f.dt_txt
    }));

    return {hourly,daily};
}

const getFormattedWeatherData = async (searchParams) => {
    const formatedCurrentWeather = await fetchWeatherData(
        "weather", 
        searchParams
    ).then(formatCurrentWeather);

    const{dt, timezone, lon, lat} = formatedCurrentWeather;

    const forecastResponse = await fetchWeatherData('forecast', {
        lat,
        lon,
        units: searchParams.units,
    });

    const formatedForecastWeather = formatForecastWeather(
        dt, 
        timezone, 
        forecastResponse.list
    );

    return {...formatedCurrentWeather, ...formatedForecastWeather};
}

export default getFormattedWeatherData;