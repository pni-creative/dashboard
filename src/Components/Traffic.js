import React from 'react'
import "../Stylesheets/_traffic.scss"

class Traffic extends React.Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.state = {
            currentTime: "",
        }
    }

    componentDidMount() {
        this.refreshMap();
        this.updateTime();
    }

    refreshMap() {
        const refreshRate = 600 * 1000; // every x seconds * 1000
        const mapRef = this.mapRef.current;

        setInterval(() => {
            mapRef.src += "";
            this.updateTime();
        }, refreshRate);
    }

    updateTime() {
        let time = new Date().toLocaleTimeString("en-US", {
            hour: 'numeric',
            minute: '2-digit',
        });
        this.setState({ currentTime: time });
    }

    render() {
        return (
            <div id="traffic-map">
                <iframe
                    ref={this.mapRef}
                    id="map-iframe"
                    width="100%"
                    height="100%"
                    src="https://jsfiddle.net/jinnwang/ronjfkmu/embedded/result/"
                    allowFullScreen="allowfullscreen"
                    allowpaymentrequest="true"
                    frameBorder="0"
                    title="traffic-map"></iframe>
                <div id="map-iframe-header">
                    <h3 class="map-title">Current traffic for Vancouver</h3>
                    <p class="map-time">Last Update: {this.state.currentTime}</p>
                </div>
            </div>
        )
    }
}

export default Traffic