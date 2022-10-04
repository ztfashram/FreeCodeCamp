function LocalWeather() {
	const [location, setLocation] = React.useState({});
	const [error, setError] = React.useState(null);

	React.useEffect(() => {
		getLocation();
		fetchWeatherData();
		console.log(location);
	}, []);

	function getLocation() {
		const success = (position) => {
			const { latitude, longitude } = position.coords;
			setLocation({ latitude, longitude });
		};
		const error = (error) => {
			setError(error.message);
		};
		navigator.geolocation.getCurrentPosition(success, error);
	}

	function fetchWeatherData() {
		const { latitude, longitude } = location;
		console.log(location);
		const FCCapi = "https://weather-proxy.freecodecamp.rocks/api/current?";
		fetch(
			`${FCCapi}lat=${parseInt(latitude, 10)}&lon=${parseInt(
				longitude,
				10
			)}`
		)
			.then((res) => res.json())
			.then((data) => console.log(data));
	}

	return (
		<div className="container">
			<div className="locale h2">
				{error ? error : "Sydney"}
				<span>{location.latitude} </span>
				<span>{location.longitude}</span>
			</div>
			<div className="weather">
				<div className="temp h1">
					16<span id="degree">°C</span>
				</div>
				<div className="weather">
					<img src="" alt="" className="icon" />
					<div className="description">Cloudy</div>
				</div>
				<div className="d-flex justify-content-between">
					<span>Humidity: </span>
					<span>84</span>
				</div>
				<div className="d-flex justify-content-between">
					<span>Wind Speed: </span>
					<span>1.34km/s</span>
				</div>
			</div>
		</div>
	);
}

const container = document.getElementById("app");
const root = ReactDOM.createRoot(container);
root.render(<LocalWeather />);
