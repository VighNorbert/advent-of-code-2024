const parse = (s: string) => s.trim().split(' ').map(Number);

const solutions = new Map<number, Map<number, number>>();

function blink(n: number, blinks: number): number {
	if (blinks === 0) return 1;
	if (solutions.has(blinks) && solutions.get(blinks)!.has(n))
		return solutions.get(blinks)!.get(n)!;
	let l = 0;
	if (n === 0) {
		l += blink(1, blinks - 1);
	} else if (n.toString().length % 2 == 0) {
		const s = n.toString();
		l += blink(parseInt(s.slice(0, s.length / 2)), blinks - 1);
		l += blink(parseInt(s.slice(s.length / 2)), blinks - 1);
	} else {
		l += blink(n * 2024, blinks - 1);
	}
	if (!solutions.has(blinks)) solutions.set(blinks, new Map());
	solutions.get(blinks)!.set(n, l);
	return l;
}

export const blinkingSimulator = (s: string, blinks = 25) => {
	return parse(s)
		.map((n) => blink(n, blinks))
		.reduce((a, b) => a + b, 0);
};
exports.first = blinkingSimulator;

export const longBlinkingSimulator = (s: string) => {
	return blinkingSimulator(s, 75);
};
exports.second = longBlinkingSimulator;
