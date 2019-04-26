
// =========================================================== //
// ----- Array shuffle utility ------------------------------- //
// =========================================================== //
// source: https://github.com/Daplie/knuth-shuffle/blob/master/index.js
function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
};

function fillRaffleBucket(participants) {
	const bucket = [];

	participants.forEach(participant => {
		// put a ticket w/ participant's name in bucket for each point they earned
		for (let i = 0; i < participant.points; i++) {
			bucket.push(participant.name);
		}
	});

	// shuffle the bucket, and return the array
	return shuffle(bucket);
}

function findWinner(participants) {
	const bucket = fillRaffleBucket(participants);

	// choose random idx to select winner
	const randIdx = Math.floor(Math.random() * bucket.length);

	return bucket[randIdx];
}

module.exports = findWinner;