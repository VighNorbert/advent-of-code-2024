import { sum } from './utils';

export const gpsSum = (s: string) => {
	const [map, instructions] = s.trim().split('\n\n');

	const grid = map.split('\n').map((row) => row.split(''));

	let y = grid.findIndex((row) => row.includes('@'));
	let x = grid[y].indexOf('@');

	grid[y][x] = '.';

	const dirs = { '^': [-1, 0], v: [1, 0], '<': [0, -1], '>': [0, 1] };

	for (let instruction of instructions.replace('\n', '').split('')) {
		if (!(instruction in dirs)) continue;
		const [dy, dx] = dirs[instruction as keyof typeof dirs];

		const [ny, nx] = [y + dy, x + dx];

		if (grid[ny][nx] === '#') continue;
		if (grid[ny][nx] === '.') {
			[y, x] = [ny, nx];
			continue;
		}

		let [ny2, nx2] = [ny, nx];
		while (grid[ny2][nx2] === 'O') {
			[ny2, nx2] = [ny2 + dy, nx2 + dx];
		}
		if (grid[ny2][nx2] === '#') continue;
		if (grid[ny2][nx2] === '.') {
			grid[ny2][nx2] = 'O';
			grid[ny][nx] = '.';
			[y, x] = [ny, nx];
		}
	}

	return grid
		.map((row, y) =>
			row
				.map((cell, x): number => (cell === 'O' ? y * 100 + x : 0))
				.reduce(sum)
		)
		.reduce(sum);
};
exports.first = gpsSum;

export const function2 = (s: string) => {
	return 0;
};
exports.second = function2;
