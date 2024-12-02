import {
	appearanceSimilarityScore,
	distanceSimilarityScore,
} from '../src/day01';

test('day 1-1', () => {
	expect(
		distanceSimilarityScore(`3   4
4   3
2   5
1   3
3   9
3   3`)
	).toBe(11);
});

test('day 1-2', () => {
	expect(
		appearanceSimilarityScore(`3   4
4   3
2   5
1   3
3   9
3   3`)
	).toBe(31);
});
