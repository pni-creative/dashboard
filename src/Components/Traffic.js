import React from 'react'
import "../Stylesheets/_traffic.scss"

class Traffic extends React.Component {

    componentDidMount() {

    }


    render() {
        return (
            <div className="box f">
                <div id="traffic-map">
                    <iframe id="map-iframe" width="100%" height="100%" src="https://jsfiddle.net/jinnwang/ronjfkmu/embedded/result/"
                        allowFullScreen="allowfullscreen" allowpaymentrequest="true" frameBorder="0" title="traffic-map"></iframe>
                    <div id="map-iframe-mask">
                        <h3 class="map-title">Current traffic for Vancouver</h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default Traffic