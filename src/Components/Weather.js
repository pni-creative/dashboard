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

    componentDidMount() {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=vancouver,ca&APPID=8b130af0f03a9e473bb8c4aab154da38&units=metric")
          .then(res => res.json())
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                //items: result.list
                items: result
              });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              this.setState({
                isLoaded: true,
                error
              });
            }
          )
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
            return (

                <div class="box e">
                <div class="title">
                    <p>Weather</p>
                </div>

                <div class="current">
                    <p>success</p>

                    <ul>
                        {items.main.temp}&#8451;

                        {/* {items.map(item => (
                            <li key={item.dt}>
                                {item.dt_txt} :{item.main.temp}&#8451;
                            </li>
                        ))} */}
                    </ul>
                </div>
            </div>

            );
        }
    }
}

export default Weather