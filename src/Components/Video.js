import React from 'react'
import Player from '@vimeo/player';

const videoContainerStyle = {
    padding: '56.25% 0 0 0',
    position: 'relative',
  };

const videoStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
};


class Video extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isMap: false
        }
    }

    getMilliseconds(minutes) {
        let milliseconds = minutes * 60000;

        return milliseconds
    }

    componentDidMount() {
        let iframe = document.querySelector('iframe');
        let player = new Player(iframe);

        player.on('ended', () => {
            this.setState({isMap: true})
        });
    }

    componentDidUpdate() {

        if(this.state.isMap) {
            setTimeout(()=> {
                this.setState({isMap: false})
            }, this.getMilliseconds(.05))
        } else {
            let iframe = document.querySelector('iframe');
            let player = new Player(iframe);

            player.on('ended', () => {
                this.setState({isMap: true})
            });
        }
    }

    render() {
        if(this.state.isMap) {
            return (
            <div className="box b">
                <p>Map!</p>
            </div>
            )
        } else {
            return (
            <div className="box b">
                <div style={videoContainerStyle}><iframe src="https://player.vimeo.com/video/333592034?autoplay=1&byline=0&portrait=0" style={videoStyle} frameBorder="0" allow="autoplay" allowfullscreen></iframe></div>
            </div> 
            )
        }
    }
}

export default Video