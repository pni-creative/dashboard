import React from 'react'
import "../Stylesheets/_fullscreen.scss"

class Fullscreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullScreen: false,
        };
    }

    componentDidMount() {
        document.addEventListener('fullscreenchange', (event) => {
            // document.fullscreenElement will point to the element that
            // is in fullscreen mode if there is one. If there isn't one,
            // the value of the property is null.
            if (document.fullscreenElement) {
                this.setState({ isFullScreen: true });
            } else {
                this.setState({ isFullScreen: false });
            }
        });
    }

    toggleFullScreen() {
        let elem = document.documentElement;
        let fullscreenElement = document.fullscreenElement;

        // Check if fullscreenElement exists
        if (fullscreenElement) {
            /* Close fullscreen */
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) { /* Firefox */
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) { /* IE/Edge */
                document.msExitFullscreen();
            }
        } else {
            /* View in fullscreen */
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) { /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) { /* IE/Edge */
                elem.msRequestFullscreen();
            }
        }
    }

    render() {
        return (
            <button
                id="fullscreen"
                className={this.state.isFullScreen ? "active" : ""}
                onClick={() => { this.toggleFullScreen() }}>
                {this.state.isFullScreen ?
                    (
                        <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23666%22%20d%3D%22M4%2C4H0v2h6V0H4V4z%20M14%2C4V0h-2v6h6V4H14z%20M12%2C18h2v-4h4v-2h-6V18z%20M0%2C14h4v4h2v-6H0V14z%22%2F%3E%0A%3C%2Fsvg%3E%0A"></img>
                    )
                    :
                    (
                        <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%20018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%2C0v2v4h2V2h4V0H2H0z%20M16%2C0h-4v2h4v4h2V2V0H16z%20M16%2C16h-4v2h4h2v-2v-4h-2V16z%20M2%2C12H0v4v2h2h4v-2H2V12z%22%2F%3E%0A%3C%2Fsvg%3E%0A"></img>
                    )
                }
            </button>
        )
    }
}

export default Fullscreen