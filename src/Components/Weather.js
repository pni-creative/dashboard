import React from 'react'

class Weather extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isCurrent: false,
            isForecast: false,
            items: [],
            forecasts: []
        };
    }

    //current weather 
    loadData() {
        console.log('load data');
        fetch("https://api.openweathermap.org/data/2.5/weather?q=vancouver,ca&APPID=8b130af0f03a9e473bb8c4aab154da38&units=metric")
            .then(res => res.json())
            .then(
                (result) => {

                    //console.log(result);
                    this.setState({
                        isCurrent: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isCurrent: true,
                        error
                    });
                }
            )
    }

    //future weather
    loadFuturedata() {
        console.log('load future data');
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=vancouver,ca&APPID=8b130af0f03a9e473bb8c4aab154da38&units=metric")
            .then(res => res.json())
            .then(
                (result) => {
                    //console.log(result);
                    this.setState({
                        isForecast: true,
                        forecast_1: result.list[0],
                        forecast_2: result.list[1]
                    });
                },
                (error) => {
                    this.setState({
                        isForecast: true,
                        error
                    });
                }
            )
    }

    //convert time and date
    convert(unixtimestamp) {
        // Months array
        let months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Convert timestamp to milliseconds
        let date = new Date(unixtimestamp * 1000);

        // Year
        //let year = date.getFullYear();

        // Month
        //let month = months_arr[date.getMonth()];

        // Day
        //let day = date.getDate();

        // Hours
        let hours = date.getHours();

        // Minutes
        let minutes = "0" + date.getMinutes();

        // Seconds
        // let seconds = "0" + date.getSeconds();

        // Display date time in MM dd, yyyy h:m format
        let convdataTime = hours + ':' + minutes.substr(-2);
        return convdataTime;
    }

    componentDidMount() {
        //refresh data every 2 hours
        this.intervalId = setInterval(() => 
            this.loadData(), 2 * 60 * 60 * 10000
        );
        this.intervalForecast = setInterval(() => 
            this.loadFuturedata(), 2 * 60 * 60 * 10000  
        );

        //load current weather
        this.loadData(); 
        //load future weather
        this.loadFuturedata();
    }

    componentWillUnmount() {
        clearInterval(this.intervalId)
        clearInterval(this.intervalForecast)
    }

    render() {
        const { error, isCurrent, isForecast, forecast_1, forecast_2, items } = this.state;
        if (error) {
            return (

            <div class="box e">
                <div class="title">
                    <p>Weather</p>
                </div>

                <div class="current">
                    <p>Oops&hellip;couldn't load data.</p>
                </div>
            </div>

            );
        } else if (!isCurrent || !isForecast) {
            return <div>Loading...</div>;
        } else {

            const currentTemp = Math.round(items.main.temp);

            return (

                <div className="box e weather">
                    <div className="title">
                        <p>Weather</p>
                    </div>

                    <div className="weather-container">
                        <div className="current">
                            <p className="date">now</p>
                            <img src={'http://openweathermap.org/img/wn/' + items.weather[0].icon + '@2x.png'} alt="" />

                            <p>{currentTemp}&deg;</p>
                            <p className="desc">{items.weather[0].description}</p>
                        </div>

                        <div className="forecast-1">
                            <p className="date">{this.convert(forecast_1.dt)}</p>
                            <img src={'http://openweathermap.org/img/wn/' + forecast_1.weather[0].icon + '@2x.png'} alt="" />
                            <p>{Math.round(forecast_1.main.temp)}&deg;</p>
                            <p className="desc">{forecast_1.weather[0].description}</p>   
                        </div>

                        <div className="forecast-2">
                            <p className="date">{this.convert(forecast_2.dt)}</p>
                            <img src={'http://openweathermap.org/img/wn/' + forecast_2.weather[0].icon + '@2x.png'} alt="" />
                            <p>{Math.round(forecast_2.main.temp)}&deg;</p> 
                            <p className="desc">{forecast_2.weather[0].description}</p>                   
                        </div>
                    </div>  
                </div>

            );
        }
    }
}

export default Weather