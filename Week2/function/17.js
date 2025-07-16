function() {
	var ratings = [2,3,1,4,5];

	// You should return an array containing only the largest rating. Remember that reduce always
	// returns an array with one item.
	// Complete this expression
    return ratings.reduce((max , currentValue) => {
        return currentValue > max ? currentValue : max;
    });
}
		