import { fenceCostByPerimeter, fenceCostBySides } from '../src/day12';

const input4x4 = `AAAA
BBCD
BBCC
EEEC`;

const input5x5 = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`;

const inputEX = `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`;

const inputAB = `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`;

const input10x10 = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`;

test('day 12-1-a', () => {
	expect(fenceCostByPerimeter(input4x4)).toBe(140);
});
test('day 12-1-b', () => {
	expect(fenceCostByPerimeter(input5x5)).toBe(772);
});
test('day 12-1-c', () => {
	expect(fenceCostByPerimeter(input10x10)).toBe(1930);
});

test('day 12-2-a', () => {
	expect(fenceCostBySides(input4x4)).toBe(80);
});
test('day 12-2-b', () => {
	expect(fenceCostBySides(input5x5)).toBe(436);
});
test('day 12-2-c', () => {
	expect(fenceCostBySides(inputEX)).toBe(236);
});
test('day 12-2-d', () => {
	expect(fenceCostBySides(inputAB)).toBe(368);
});
test('day 12-2-e', () => {
	expect(fenceCostBySides(input10x10)).toBe(1206);
});
