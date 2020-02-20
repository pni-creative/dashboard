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
          percentB: 0
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
                percentB: (countB / (countA + countB)) * 100
            });
        }); 
    }
    
    render() {
        return (
            <div className="box d">
                <div className="title">
                    <p>Poll</p>
                </div>
                <p>{this.state.question}</p>
                <ul>
                    <li>{this.state.optionA}</li>
                    <li>{this.state.optionB}</li>
                </ul>
                <p>Text your mood to 604-373-3PNI (764)</p>
                <pre>{this.state.percentA}%</pre>
                <pre>{this.state.percentB}%</pre>
            </div>
        )
    }
}

export default Poll
