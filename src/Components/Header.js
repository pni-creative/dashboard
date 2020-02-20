import React from 'react';

import logo from '../pnimedia.png';

class Header extends React.Component {

    constructor(props) {
        super(props); 
            this.state = {
                vanTime: "",
                fraTime: "",
                ausTime: "",
                isTimeZoneUpdated: false,
                today: "",
            }        
    }

    getTime(timezone) {
        let time = new Date().toLocaleTimeString("en-US", {
            hour: 'numeric',
            minute:'2-digit',
            timeZone: timezone
          });

          return time
    }

    setTime() {
        this.setState({isTimeZoneUpdated: false});

        this.setState({
            vanTime: this.getTime("America/Vancouver"),
            fraTime: this.getTime("America/New_York"),
            ausTime: this.getTime("America/Mexico_City"),
        })

        this.setState({isTimeZoneUpdated: true})
    }

    setCurrentDate() {
        var options = { weekday: 'short', month: 'short', day: 'numeric'};
        var dateFormat = new Intl.DateTimeFormat('en-US', options);
        let fullDate = dateFormat.format(new Date())

        this.setState({today: fullDate})
    }

    componentDidMount() {       
        this.setTime();
        this.setCurrentDate();
    }

    componentDidUpdate(prevProps) {
        if(this.state.isTimeZoneUpdated) {
        this.setState({isTimeZoneUpdated: false});
            setTimeout(this.setTime.bind(this), 60000)
        }
    }

    render() {
        return (
            <div className="box a header">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <div className="timezones">
                    <div className="main">
                        <span className="time">Vancouver {this.state.vanTime}</span>
                        <span className="date">{this.state.today}</span>
                    </div>
                    <div className="sub">
                        <span className="time1">Austin {this.state.ausTime}</span>
                        <span className="time2">Framingham {this.state.fraTime}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header