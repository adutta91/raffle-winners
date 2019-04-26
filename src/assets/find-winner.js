
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
		for (let i = 0; i < participant.points; i++) {
			bucket.push(participant.name);
		}
	});

	return shuffle(bucket);
}

function findWinner(participants) {
	const bucket = fillRaffleBucket(participants);

	const randIdx = Math.floor(Math.random() * bucket.length);

	return bucket[randIdx];
}

module.exports = findWinner;