import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/UploadResultsButton.css';
import CsvParser from '../assets/csv-parser';

class UploadResultsButton extends Component {
    onFile = e => {
        const { onUpload } = this.props;
        
        const file = e.target.files[0];
        
        if (file) {
            var reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = function (evt) {
                const participants = CsvParser(evt.target.result);
                onUpload(participants);
            }
            reader.onerror = function (evt) {
                console.log('error *****---->>>', evt);
                alert("Error! Check console.");
            }
        }
    }
    
    render() {
        return (
            <label className="btn btn-success btn-outline btn-upload">
                <input type="file" hidden={true} onChange={this.onFile}/>
                Upload Results
            </label>
        );
    }
};

UploadResultsButton.propTypes = {
    onUpload : PropTypes.func.isRequired,
};

export default UploadResultsButton;