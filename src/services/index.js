import axios from 'axios';
const apiToken = 'ca67b1fbff53af6f5c9ee6add7958e7d';
export function getDaysData(city){
	return axios.get('https://api.openweathermap.org/data/2.5/forecast?id='+city+'&APPID='+apiToken)
}

export function getHoursData(city){
	return axios.get('https://api.openweathermap.org/data/2.5/forecast/hourly?id='+city+'&APPID='+apiToken)
}