function LocalWeather() {
    const [location, setLocation] = React.useState({ lat: '', lon: '' })
    const [city, setCity] = React.useState('')
    const [temp, setTemp] = React.useState(0)
    const [weather, setWeather] = React.useState('')
    const [humidity, setHumidity] = React.useState(0)
    const [windSpeed, setWindSpeed] = React.useState(0)
    const [celsius, setCelsius] = React.useState(true)

    const fCCWeatherApi = 'https://weather-proxy.freecodecamp.rocks/api/current?'

    const onSuccess = (position) => {
        setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
        })
    }
    const onError = (error) => {
        console.log(error.message)
    }

    async function fetchWeatherData() {
        try {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(onSuccess, onError)
            } else {
                console.log('geolocation is not available')
            }
            const response = await fetch(`${fCCWeatherApi}lat=${location.lat}&lon=${location.lon}`)
            const data = await response.json()
            setCity(data.name)
            setTemp(data.main.temp)
            setWeather(data.weather[0].main)
            setHumidity(data.main.humidity)
            setWindSpeed(data.wind.speed)
            // console.log(data)
        } catch (e) {
            console.log(e)
        }
    }

    function getWeatherIcon() {
        switch (weather) {
            case 'Drizzle':
                return 'wi wi-day-sleet'
            case 'rain':
                return 'wi wi-day-rain'
            case 'snow':
                return 'wi wi-day-snow'
            case 'clear':
                return 'wi wi-day-sunny'
            case 'thunderstorm':
                return 'wi wi-day-snow-thunderstorm'
            default:
                return 'wi wi-day-cloudy'
        }
    }

    function switchTempUnit() {
        setCelsius(!celsius)
    }

    React.useEffect(() => {
        fetchWeatherData()
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
