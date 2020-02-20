import React from 'react'

class Weather extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: []
          };
    }

    //current weather 
    loadData() {
        console.log('load data');
        fetch("https://api.openweathermap.org/data/2.5/weather?q=vancouver,ca&APPID=8b130af0f03a9e473bb8c4aab154da38&units=metric")
        .then(res => res.json())
        .then(
          (result) => {
              console.log(result);
             this.setState({
              isLoaded: true,
              items: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

    loadFuturedata () {
        console.log('load future data');
    }

    componentDidMount() {
        //refresh data every 2 hours
        //this.intervalId = setInterval(() => this.loadData(), 2 * 60 * 60 * 1000);
        this.loadData(); // also load one immediately
        //this.loadFutureData();
    }    

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return (

                <div class="box e">
                <div class="title">
                    <p>Weather</p>
                </div>

                <div class="current">
                    <p>Failed to load content</p>
                </div>
            </div>
 
            );
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {

            const imgUrl = 'http://openweathermap.org/img/wn/' + items.weather[0].icon + '.png';
            const currentTemp = Math.round(items.main.temp);

            return (

                <div className="box e">
                    <div className="title">
                        <p>Weather</p>
                    </div>

                    <div class="current">

                            <img src={imgUrl} alt="" />

                            <p>{currentTemp}&deg;</p>
                            <p>{items.weather[0].description}</p>
                                
                    </div>
                </div>

            );
        }
    }
}
 
export default Weather