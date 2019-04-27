import _ from 'lodash';

function CsvParser(txt) {
    let rows = txt.split('\n');
    
    let cols = _.map(rows, row => row.split(','));
    
    let participants = cols.slice(1);

    return _.map(participants, participant => ({
        name : participant[0],
        points : parseInt(participant[1]),
    }));
};

export default CsvParser;