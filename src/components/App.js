import React, { Component } from 'react';
import '../styles/App.css';
import { filter, size, map, includes } from 'lodash';

import findWinner from '../assets/find-winner';
import startConfetti from '../assets/confetti';

import Header from './Header';
import UploadResultsButton from './UploadResultsButton';

class App extends Component {
  state = {
    participants : [],
    winners : [],
  }
  
  celebrate() {
    startConfetti();
    document.getElementById("cheer").play();
    document.getElementById("tada").play();
  }
  
  chooseWinner = e => {
    const { participants } = this.state;
    
    // remove previous winners from participant pool
    let participantPool = filter(participants, participant => participant.points && !includes(this.state.winners, participant.name));
    
    if (size(participantPool)) {
      // add winner to state list
      this.setState(prev => ({ winners : [ ...prev.winners, findWinner(participantPool) ]}));
      this.celebrate();
    } else {
      // alert user if no more available winners
      alert('No more eligible participants!');
    }
  }
  
  updateParticipants = participants => {
    this.setState({ participants });
  }
  
  // syntactic sugar helper function
  conditionalDisplay(content, condition) {
    return condition ? content : null;
  }
  
  render() {
    const {
      conditionalDisplay, updateParticipants, chooseWinner,
      state : { participants, winners }
     } = this;
    
    return (
      <div className="App wrapper">
        <Header>
          <UploadResultsButton onUpload={updateParticipants} />
        </Header>
        
        {conditionalDisplay(
          <section id='pull-ticket'>
            <div
              className="btn btn-success"
              onClick={chooseWinner}
            >
              Pull Ticket From Bucket
            </div>
          </section>,
          size(participants)
        )}
        
        {conditionalDisplay(
          <section id='winners'>
            <h3>Winners</h3>
            <ul>
              {map(winners, winner => (
                <li key={winner} className="winner">{winner}</li>
              ))}
            </ul>
          </section>,
          size(winners)
        )}
        
      </div>
    );
  }
}

export default App;
