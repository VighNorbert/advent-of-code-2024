import { lowestMazeScore, bestPathTileCount, Queue } from '../src/day16';

const input = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`;

const longerInput = `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`;

test('day 16-1a', () => {
	expect(lowestMazeScore(input)).toBe(7036);
});
test('day 16-1b', () => {
	expect(lowestMazeScore(longerInput)).toBe(11048);
});

test('day 16-2a', () => {
	expect(bestPathTileCount(input)).toBe(45);
});
test('day 16-2b', () => {
	expect(bestPathTileCount(longerInput)).toBe(64);
});
