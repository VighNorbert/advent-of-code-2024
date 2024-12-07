const unconcat = (possibilities: number[], value: number) => {
	return possibilities.map(
		(x) => (x - value) / Math.pow(10, value.toString().length)
	);
};

const calibrationsSumAdjustable = (s: string, concat = false) => {
	return s
		.trim()
		.split('\n')
		.map((line) => {
			const [[testValue], values] = line
				.split(': ')
				.map((x) => x.split(' ').map(Number));
			let possibilities = [testValue];
			values.reverse().forEach((v, i, arr) => {
				possibilities = [
					...possibilities.map((x) => x - v),
					...possibilities.map((x) => x / v),
					...(concat ? unconcat(possibilities, v) : []),
				].filter((x) => x % 1 == 0 && (x > 0 || i == arr.length - 1));
			});
			return possibilities.includes(0) ? testValue : 0;
		})
		.reduce((acc, value) => acc + value, 0);
};

export const calibrationsSum = (s: string) => {
	return calibrationsSumAdjustable(s, false);
};
exports.first = calibrationsSum;

export const calibrationsSumWithConcat = (s: string) => {
	return calibrationsSumAdjustable(s, true);
};
exports.second = calibrationsSumWithConcat;
