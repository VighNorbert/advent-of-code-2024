import { blinkingSimulator, longBlinkingSimulator } from '../src/day11';

const smallInput = `0 1 10 99 999`;
const input = `125 17`;

test('day 11-1a', () => {
	expect(blinkingSimulator(smallInput, 1)).toBe(7);
});
test('day 11-1b', () => {
	expect(blinkingSimulator(input)).toBe(55312);
});

test('day 11-2', () => {
	expect(longBlinkingSimulator(input)).toBe(65601038650482);
});
