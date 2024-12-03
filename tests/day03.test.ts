import { mulSums, mulSumsDoDont } from '../src/day03';

const input1 = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`;

test('day 3-1', () => {
	expect(mulSums(input1)).toBe(161);
});

const input2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

test('day 3-2', () => {
	expect(mulSumsDoDont(input2)).toBe(48);
});
