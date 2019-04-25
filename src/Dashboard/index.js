import React from 'react';
import './Dashboard.css';
import DayHourCard from './../dayHourCard';
import { getDaysData, getHoursData } from './../services';

class Dashboard extends React.Component{
	constructor(props){
		super(props);
		this.city = [
			{cod:1275339,name:'Mumbai'},
			{cod:1273294,name:'Delhi'},
			{cod:1277333,name:'Bangalore'},
			{cod:1264527,name:'Chennai'},
			{cod:1275004,name:'Kolkata'},
			{cod:1264733,name:'Lucknow'},
		]
		this.state = {
			daily:true,
			hourly:false,
			dayData:null,
			hourData:null,
			citySelected:1275339
		}
		this.fetchHourlyData = this.fetchHourlyData.bind(this)
	}
	fetchDaysData(){
		const citySelected = this.state.citySelected;
		getDaysData(citySelected)
		.then((resp)=>{
			const daysArr = []
			let filteredData = resp.data.list.filter(n=>{
				let date = n.dt_txt.split(" ")[0];
				if(daysArr.indexOf(date) < 0 && daysArr.length < 5){
					daysArr.push(date);
					return true;
				}
				return false;
			})
			filteredData = filteredData.map((data)=>({
				min:data.main.temp_min,
				max:data.main.temp_max,
				weather:data.weather[0].main,
				date:data.dt_txt.split(" ")[0]
			}));
			console.log(filteredData);
			this.setState({dayData:filteredData,hourly:false})
		})
	}

	fetchHourlyData(date){
		if(this.state.hourly){
			return;
		}
		const citySelected = this.state.citySelected;
		getHoursData(citySelected)
		.then((resp)=>{
			let filteredData = resp.data.list.filter(n=>{
				if(n.dt_txt.split(" ")[0] === date){
					return true;
				}
				return false;
			})
			filteredData = filteredData.map((data)=>({
				min:data.main.temp_min,
				max:data.main.temp_max,
				weather:data.weather[0].main,
				date:data.dt_txt.split(" ")[0],
				hour:data.dt_txt.split(" ")[1]
			}));
			console.log(filteredData);
			this.setState({dayData:filteredData,hourly:true})
		})
	}

	setCity(citySelected){
		this.setState({citySelected:citySelected});
	}
	componentDidMount(){
		this.fetchDaysData(this.state.citySelected);
	}
	render(){
		const {dayData, hourData, daily, hourly} = this.state;
		const city = this.city;
		return (
			<div>
				<div className="header">
					<select onChange={e=>{this.setCity(e.target.value);this.fetchDaysData()}}>
						{
							city.map((city)=>(<option value={city.cod}>{city.name}</option>))
						}
					</select>

				</div>
				{
					hourly ? <div className="label">Hourly Forecast</div> : <div className="label">5 Day Forecast</div>
				}
				<div className="forecast-container">
					{
						daily && dayData && dayData.map((dayData)=>(<DayHourCard data={dayData} fetchHourlyData={this.fetchHourlyData}></DayHourCard>))
					}
					{
						hourly && hourData && hourData.map((hourData)=>(<dayHourCard data={hourData} fetchHourlyData={this.fetchHourlyData}></dayHourCard>))
					}
				</div>
			</div>
		)
	}
}

export default Dashboard;