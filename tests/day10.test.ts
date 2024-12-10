import { trailheadScores, trailheadRatings } from '../src/day10';

const smallInput = `0123
1234
8765
9876`;

const midInput = `1190119
1111198
1112117
6543456
7651987
8761111
9871111`;

const input = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

test('day 10-1a', () => {
	expect(trailheadScores(smallInput)).toBe(1);
});
test('day 10-1b', () => {
	expect(trailheadScores(input)).toBe(36);
});

test('day 10-2a', () => {
	expect(trailheadRatings(midInput)).toBe(13);
});
test('day 10-2b', () => {
	expect(trailheadRatings(input)).toBe(81);
});
