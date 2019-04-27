import React, { Component } from 'react';
import '../styles/App.css';
import { filter, size, map, includes } from 'lodash';

import findWinner from '../assets/find-winner';

import UploadResultsButton from './UploadResultsButton';
import { conditionalExpression } from '@babel/types';

class App extends Component {
  state = {
    participants : [],
    winners : [],
  }
  
  chooseWinner = e => {
    const { participants } = this.state;
    // remove previous winners from participant pool
    let participantPool = filter(participants, participant => participant.points && !includes(this.state.winners, participant.name));
    
    if (size(participantPool)) {
      // add winner to state list
      this.setState(prev => ({ winners : [ ...prev.winners, findWinner(participantPool) ]}))
    } else {
      // alert user if no more available winners
      alert('No more eligible participants!');
    }
  }
  
  updateParticipants = participants => {
    this.setState({ participants });
  }
  
  conditionalDisplay(content, condition) {
    return condition ? content : null;
  }
  
  render() {
    const { participants, winners } = this.state;
    
    return (
      <div className="App">
        <UploadResultsButton onUpload={this.updateParticipants} />
        
        {this.conditionalDisplay(
          <div
            className="btn btn-success"
            onClick={this.chooseWinner}
          >
            Pull Ticket From Bucket
          </div>,
          size(participants)
        )}
        
        {this.conditionalDisplay(
          <React.Fragment>
            <h3>Winners</h3>
            <ul>
              {map(winners, winner => <li key={winner} className="winner">{winner}</li>)}
            </ul>
          </React.Fragment>,
          size(winners)
        )}
        
      </div>
    );
  }
}

export default App;
