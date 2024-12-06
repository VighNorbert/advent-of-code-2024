const parse = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((line) => line.split(''));

const orientations = [
	[0, -1], // up
	[1, 0], // right
	[0, 1], // down
	[-1, 0], // left
];

export const pathPositionsCount = (s: string) => {
	const map = parse(s);
	let orientationIndex = 0;
	let [dx, dy] = orientations[orientationIndex];
	let y = map.findIndex((line) => line.includes('^'));
	let x = map[y].indexOf('^');
	map[y][x] = 'X';
	while (x > 0 && y > 0 && x < map[0].length - 1 && y < map.length - 1) {
		const [nx, ny] = [x + dx, y + dy];
		if (map[ny][nx] === '#') {
			orientationIndex++;
			orientationIndex %= 4;
			[dx, dy] = orientations[orientationIndex];
		} else {
			x = nx;
			y = ny;
			map[y][x] = 'X';
		}
	}
	return map.reduce((acc, line) => {
		return acc + line.filter((c) => c === 'X').length;
	}, 0);
};
exports.first = pathPositionsCount;

export const loopingObstacleCount = (s: string) => {
	let loopingCount = 0;
	const mapBase = parse(s);
	for (let oy = 0; oy < mapBase.length; oy++) {
		for (let ox = 0; ox < mapBase[0].length; ox++) {
			const map = parse(s);
			if (map[oy][ox] === '^') continue;
			map[oy][ox] = '#';
			let orientationIndex = 0;
			let [dx, dy] = orientations[orientationIndex];
			let y = map.findIndex((line) => line.includes('^'));
			let x = map[y].indexOf('^');
			while (
				x > 0 &&
				y > 0 &&
				x < map[0].length - 1 &&
				y < map.length - 1
			) {
				const [nx, ny] = [x + dx, y + dy];
				if (map[ny][nx] === '#') {
					orientationIndex++;
					orientationIndex %= 4;
					if (map[y][x] == orientationIndex.toString()) {
						loopingCount++;
						break;
					} else if (map[y][x] == '.') {
						map[y][x] = orientationIndex.toString();
					}
					[dx, dy] = orientations[orientationIndex];
				} else {
					x = nx;
					y = ny;
				}
			}
		}
	}
	return loopingCount;
};
exports.second = loopingObstacleCount;
