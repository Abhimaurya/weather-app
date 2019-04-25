import React from 'react';
import './dayHourCard.css';

class DayHourCard extends React.Component{

	getImage(weather){
		switch (weather){
			case 'Clear':
			return 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather01-256.png';
			case 'Clouds':
			return 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather04-256.png';
			default:
			return 'https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather01-256.png';
		}
	}
	render(){
		const forecastData = this.props.data;
		return (
			<div className="day-hour-card" onClick={e=>{this.props.fetchHourlyData(forecastData.date)}}>
				<div>{forecastData.date}
				{
					forecastData.hour && <span class="time"> {forecastData.hour} </span>
				}
				</div>

				<img className="weather-icon" alt={forecastData.weather} src={this.getImage(forecastData.weather)}></img>
				<div>
					<span className="temp">{forecastData.max} &deg;</span>
					<span className="temp min">{forecastData.min} &deg;</span>
				</div>
			</div>
		)
	}
}

export default DayHourCard;