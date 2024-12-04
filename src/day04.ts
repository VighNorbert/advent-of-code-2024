const parse = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((x) => x.split(''));

const directions = [
	[1, 0],
	[0, 1],
	[-1, 0],
	[0, -1],
	[1, 1],
	[-1, -1],
	[1, -1],
	[-1, 1],
];

export const xMasSearch = (s: string) => {
	const map = parse(s);
	const xmas = 'XMAS'.split('');
	return map
		.map((row, y) =>
			row
				.map((_cell, x) =>
					directions
						.map(([dx, dy]) =>
							xmas
								.map((letter, i): number => {
									const nx = x + dx * i;
									const ny = y + dy * i;
									if (
										ny < 0 ||
										ny >= map.length ||
										nx < 0 ||
										nx >= row.length ||
										map[ny][nx] !== letter
									) {
										return 0;
									}
									return 1;
								})
								.reduce((a, b) => Math.min(a, b))
						)
						.reduce((a, b) => a + b, 0)
				)
				.reduce((a, b) => a + b, 0)
		)
		.reduce((a, b) => a + b, 0);
};
exports.first = xMasSearch;

export const crossMasSearch = (s: string) => {
	const map = parse(s);
	const letters = ['M', 'S'];
	return map
		.map((row, y) =>
			row
				.map((cell, x) => {
					if (
						cell === 'A' &&
						x + 1 < row.length &&
						y + 1 < map.length &&
						x > 0 &&
						y > 0
					) {
						const neighbors = [
							map[y - 1][x - 1],
							map[y + 1][x + 1],
							map[y + 1][x - 1],
							map[y - 1][x + 1],
						];
						if (
							neighbors.every((x) => letters.includes(x)) &&
							neighbors[0] != neighbors[1] &&
							neighbors[2] != neighbors[3]
						) {
							return 1;
						}
					}
					return 0;
				})
				.reduce((a: number, b) => a + b, 0)
		)
		.reduce((a: number, b) => a + b, 0);
};
exports.second = crossMasSearch;
