const parse = (s: string) => {
	const parts = s.trim().split('\n\n');
	const ruleMap = new Map<number, number[]>();
	parts[0].split('\n').forEach((x) => {
		const [a, b] = x.split('|').map(Number);
		if (!ruleMap.has(a)) {
			ruleMap.set(a, []);
		}
		ruleMap.get(a)!.push(b);
	});
	return {
		rules: ruleMap,
		updates: parts[1].split('\n').map((x) => x.split(',').map(Number)),
	};
};

const isCorrect = (rules: Map<number, number[]>, update: number[]) => {
	return update
		.map(
			(x, i) =>
				!rules.has(x) ||
				!rules.get(x)!.some((y) => update.slice(0, i).includes(y))
		)
		.reduce((a, b) => a && b, true);
};

const identifyCorrectness = (
	rules: Map<number, number[]>,
	updates: number[][],
	correct: boolean = true
) => {
	return updates.filter((u) => isCorrect(rules, u) === correct);
};

const middleSum = (acc: number, u: number[]) => acc + u[(u.length - 1) / 2];

export const correctUpdateMiddleSum = (s: string) => {
	const { rules, updates } = parse(s);
	return identifyCorrectness(rules, updates).reduce(middleSum, 0);
};
exports.first = correctUpdateMiddleSum;

export const incorrectUpdateMiddleSum = (s: string) => {
	const { rules, updates } = parse(s);
	return identifyCorrectness(rules, updates, false)
		.map((u) => {
			let change: boolean;
			do {
				change = false;
				u.forEach((x, i) => {
					const xRules = rules.get(x) ?? [];
					for (let j = 0; j < i; j++) {
						if (xRules.includes(u[j])) {
							u = [
								...u.slice(0, j),
								x,
								...u.slice(j, i),
								...u.slice(i + 1),
							];
							change = true;
							return;
						}
					}
				});
			} while (change);
			return u;
		})
		.reduce(middleSum, 0);
};
exports.second = incorrectUpdateMiddleSum;
