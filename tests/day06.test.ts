import { pathPositionsCount, loopingObstacleCount } from '../src/day06';

const input = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

test('day 6-1', () => {
	expect(pathPositionsCount(input)).toBe(41);
});

test('day 6-2', () => {
	expect(loopingObstacleCount(input)).toBe(6);
});
