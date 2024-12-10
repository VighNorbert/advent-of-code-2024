const parse = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((line) => line.split('').map(Number));

type Location = { x: number; y: number; alt: number };

const isInBounds = (x: number, y: number, grid: number[][]) =>
	x >= 0 && x < grid[0].length && y >= 0 && y < grid.length;

const removeDuplicates = (arr: Location[]) =>
	arr.filter(
		(v, i, a) => a.findIndex((t) => t.x === v.x && t.y === v.y) === i
	);

const removeDuplicatesSum = (arr: Location[]) =>
	arr
		.map((v) => ({
			...v,
			alt: arr
				.filter((t) => t.x === v.x && t.y === v.y)
				.reduce((acc, t) => acc + t.alt, 0),
		}))
		.filter(
			(v, i, a) => a.findIndex((t) => t.x === v.x && t.y === v.y) === i
		);

export const trailheadScores = (s: string) => {
	return trailheadRatings(s, false);
};
exports.first = trailheadScores;

export const trailheadRatings = (s: string, part_two = true) => {
	return parse(s)
		.map((line, y, grid) =>
			line
				.map((cell, x) => {
					if (cell !== 0) return 0;
					let locations: Location[] = [{ x, y, alt: 1 }];
					for (let i = 1; i < 10; i++) {
						const newLocations: Location[] = [];
						for (let j = 0; j < locations.length; j++) {
							const { x, y, alt } = locations[j];
							[
								[x + 1, y],
								[x - 1, y],
								[x, y + 1],
								[x, y - 1],
							].forEach(([nx, ny]) => {
								if (
									isInBounds(nx, ny, grid) &&
									grid[ny][nx] === i
								) {
									newLocations.push({ x: nx, y: ny, alt });
								}
							});
						}
						if (part_two) {
							locations = removeDuplicatesSum(newLocations);
						} else {
							locations = removeDuplicates(newLocations);
						}
					}
					return part_two
						? locations.reduce((a, b) => a + b.alt, 0)
						: locations.length;
				})
				.reduce((a, b) => a + b, 0)
		)
		.reduce((a, b) => a + b, 0);
};
exports.second = trailheadRatings;
