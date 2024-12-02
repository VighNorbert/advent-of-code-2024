const parse = (s: string) => s.trim().split('\n');

export function distanceSimilarityScore(s: string) {
	const data = parse(s).map((s) => s.split('   ').map(Number));
	const list1 = data.map((x) => x[0]).sort();
	const list2 = data.map((x) => x[1]).sort();

	return list1.reduce((acc, x, i) => acc + Math.abs(x - list2[i]), 0);
}

exports.first = distanceSimilarityScore;

export function appearanceSimilarityScore(s: string) {
	const data = parse(s).map((s) => s.split('   ').map(Number));
	const list2quantities = new Map<number, number>();
	data.forEach((x) => {
		if (list2quantities.has(x[1])) {
			list2quantities.set(x[1], list2quantities.get(x[1])! + 1);
		} else {
			list2quantities.set(x[1], 1);
		}
	});

	return data.reduce((acc, x) => {
		return acc + x[0] * (list2quantities.get(x[0]) ?? 0);
	}, 0);
}

exports.second = appearanceSimilarityScore;
