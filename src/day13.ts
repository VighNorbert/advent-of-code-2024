import { sum } from './utils';

const getPosition = (s: string, div: string, partTwo = false) => ({
	x:
		parseInt(s.split('X' + div)[1].split(',')[0]) +
		(partTwo ? 10000000000000 : 0),
	y: parseInt(s.split('Y' + div)[1]) + (partTwo ? 10000000000000 : 0),
});

const parse = (s: string, partTwo: boolean) =>
	s
		.trim()
		.split('\n\n')
		.map((machine) => {
			const [a, b, p] = machine.split('\n');
			return {
				a: getPosition(a, '+'),
				b: getPosition(b, '+'),
				p: getPosition(p, '=', partTwo),
			};
		});

export const tokens = (s: string, partTwo = false) => {
	return parse(s, partTwo)
		.map((m) => {
			const b =
				(m.p.y * m.a.x - m.p.x * m.a.y) /
				(m.b.y * m.a.x - m.b.x * m.a.y);
			const a = (m.p.x - b * m.b.x) / m.a.x;
			if (b % 1 == 0 && b >= 0 && a % 1 == 0 && a >= 0) return 3 * a + b;
			return 0;
		})
		.reduce(sum);
};
exports.first = tokens;

export const function2 = (s: string) => {
	return tokens(s, true);
};
exports.second = function2;
