function LocalWeather() {
    // const [latitude, setLatitude] = React.useState(0)
    // const [longitude, setLongitude] = React.useState(0)
    const [city, setCity] = React.useState('')
    const [temp, setTemp] = React.useState(0)
    const [weather, setWeather] = React.useState('')
    const [humidity, setHumidity] = React.useState(0)
    const [windSpeed, setWindSpeed] = React.useState(0)
    const [celsius, setCelsius] = React.useState(true)

    const OpenWeatherApi = 'https://api.openweathermap.org/data/2.5/weather?'
    const API_ID = 'YOUR API ID'

    // const onSuccess = (position) => {
    //     setLatitude(position.coords.latitude)
    //     setLongitude(position.coords.longitude)
    //     console.log(position, newPosition)
    // }
    const onError = (error) => {
        console.log(error.message)
    }

    const fetchWeatherData = async (position) => {
        try {
            const response = await fetch(
                `${OpenWeatherApi}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_ID}&units=metric`
            )
            const data = await response.json()
            console.log(typeof 273.15)
            setCity(data.name)
            setTemp(data.main.temp)
            setWeather(data.weather[0].main)
            setHumidity(data.main.humidity)
            setWindSpeed(data.wind.speed)
            console.log(data)
        } catch (e) {
            console.log(e)
        }
    }

    function getWeatherIcon() {
        switch (weather) {
            case 'Drizzle':
                return 'wi wi-day-sleet'
            case 'Rain':
                return 'wi wi-day-rain'
            case 'Snow':
                return 'wi wi-day-snow'
            case 'Clear':
                return 'wi wi-day-sunny'
            case 'Thunderstorm':
                return 'wi wi-day-snow-thunderstorm'
            default:
                return 'wi wi-day-cloudy'
        }
    }

    function switchTempUnit() {
        setCelsius(!celsius)
    }

    React.useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            fetchWeatherData(position)
        }, onError)
    }, [])

    return (
        <div className='container'>
            <div className='locale h2'>
                Weather in {city}
                <span>{location.latitude} </span>
                <span>{location.longitude}</span>
            </div>
            <div className='weather'>
                <div className='temp'>
                    {celsius ? temp : (parseInt(temp) * 9) / 5 + 32}
                    <span id='degree' onClick={() => switchTempUnit()}>
                        {celsius ? '°C' : '°F'}
                    </span>
                </div>
                <div className='weatherDesc d-flex justify-content-start align-items-center'>
                    <i className={getWeatherIcon()}></i>
                    <div className='description'>{weather}</div>
                </div>
                <div className='d-flex justify-content-between'>
                    <span>Humidity: </span>
                    <span>{humidity}</span>
                </div>
                <div className='d-flex justify-content-between'>
                    <span>Wind Speed: </span>
                    <span>{windSpeed}km/s</span>
                </div>
            </div>
        </div>
    )
}

const container = document.getElementById('app')
const root = ReactDOM.createRoot(container)
root.render(<LocalWeather />)
