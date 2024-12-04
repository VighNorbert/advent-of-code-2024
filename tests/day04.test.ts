import { xMasSearch, crossMasSearch } from '../src/day04';

const inputA = `..X...
.SAMX.
.A..A.
XMAS.S
.X....`;
const inputB = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

test('day 4-1a', () => {
	expect(xMasSearch(inputA)).toBe(4);
});
test('day 4-1b', () => {
	expect(xMasSearch(inputB)).toBe(18);
});

test('day 4-2', () => {
	expect(crossMasSearch(inputB)).toBe(9);
});
