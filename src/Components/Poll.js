import React from 'react'
import * as firebase from "firebase/app"
import 'firebase/database';

class Poll extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          question: "How's your day going?",
          optionA: "😀",
          optionB: "😫",
          percentA: 0,
          percentB: 0,
          votesTotal: 0
        }
    }

    componentDidMount() {
    
        // Firebase configuration
        const firebaseConfig = {
        };
  
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    
        const database = firebase.database();
        
        database.ref().on('value', snapshot => {
            
            let countA = 0;
            let countB = 0;
            
            snapshot.forEach((child) => { 
                
                if (child.val().vote === this.state.optionA) {
                    countA++;
                } else {
                    countB++;
                }
            });
            
            this.setState({
                percentA: (countA / (countA + countB)) * 100, 
                percentB: (countB / (countA + countB)) * 100,
                votesTotal: countA + countB
            });
        }); 
    }
    
    render() {
        const aStyle = {width: `${this.state.percentA}%`}
        const bStyle = {width: `${this.state.percentB}%`}
        return (
            <div className="box d poll">
                <div className="title">
                    <h1>Poll</h1>
                </div>
                <h2>{this.state.question}</h2>
                <ul>
                    <li>
                        <span className="option">{this.state.optionA}</span>
                        <span className={`result ${this.state.percentA ? 'show' : null}`} style={aStyle}>
                            <span className="result-percent">{this.state.percentA}%</span>
                        </span>
                    </li>
                    <li>
                        <span className="option">{this.state.optionB}</span>
                        <span className={`result ${this.state.percentB ? 'show' : null}`} style={bStyle}>
                            <span className="result-percent">{this.state.percentB}%</span>
                        </span>
                    </li>
                </ul>
                <p>Total votes: <strong>{this.state.votesTotal}</strong></p>
                <p>Text your mood to <strong>604-373-3PNI (764)</strong></p>

            </div>
        )
    }
}

export default Poll
