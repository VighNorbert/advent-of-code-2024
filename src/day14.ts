const simulate = (s: string, width = 101, height = 103, n = 100) => {
	return s
		.trim()
		.split('\n')
		.map((l) =>
			l
				.substring(2)
				.split(' v=')
				.map((p) => p.split(',').map(Number))
		)
		.map(([[px, py], [vx, vy]]) => ({
			x: (((px + n * vx) % width) + width) % width,
			y: (((py + n * vy) % height) + height) % height,
		}));
};

export const safetyFactor = (s: string, width = 101, height = 103) => {
	const positions = simulate(s, width, height);
	const [x_mid, y_mid] = [(width - 1) / 2, (height - 1) / 2];
	return (
		positions.filter(({ x, y }) => x < x_mid && y < y_mid).length *
		positions.filter(({ x, y }) => x > x_mid && y < y_mid).length *
		positions.filter(({ x, y }) => x < x_mid && y > y_mid).length *
		positions.filter(({ x, y }) => x > x_mid && y > y_mid).length
	);
};
exports.first = safetyFactor;

const printMap = (
	positions: { x: number; y: number }[],
	width = 101,
	height = 103
) => {
	let interesting = false;
	let rows = [];
	for (let y = 0; y < height; y++) {
		let row = '';
		for (let x = 0; x < width; x++) {
			if (positions.some((p) => p.x === x && p.y === y)) {
				row += '#';
			} else {
				row += ' ';
			}
		}
		if (row.includes('##########')) interesting = true;
		rows.push(row);
	}
	return { interesting, rows };
};

export const findAXmasTree = (s: string, width = 101, height = 103) => {
	let i = 0;
	while (true) {
		const res = printMap(simulate(s, width, height, i));
		if (res.interesting) {
			for (let row of res.rows) {
				console.log(row);
			}
			return i;
		}
		i++;
	}
};
exports.second = findAXmasTree;
