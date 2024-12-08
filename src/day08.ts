const parse = (s: string) =>
	s
		.trim()
		.split('\n')
		.map((l) => l.split(''));

const addAntinode = (
	map: string[][],
	locations: { x: number; y: number }[],
	n: { x: number; y: number }
) => {
	if (n.x >= 0 && n.x < map[0].length && n.y >= 0 && n.y < map.length) {
		if (!locations.some((v) => v.x === n.x && v.y === n.y)) {
			locations.push(n);
		}
		return true;
	}
	return false;
};

export const antinodeCount = (s: string, resonance = false) => {
	const map = parse(s);
	const antinodeLocations: { x: number; y: number }[] = [];
	map.reduce((acc, row) =>
		Array.from(new Set([...acc, ...row])).filter((a) => a !== '.')
	)
		.map((antenna) =>
			map
				.map((row, y) =>
					row.map((cell, x) => (cell == antenna ? { x, y } : null))
				)
				.flat()
				.filter((a) => a)
		)
		.forEach((antennaLocations) => {
			for (let i = 0; i < antennaLocations.length; i++) {
				for (let j = i + 1; j < antennaLocations.length; j++) {
					const [a, b] = [antennaLocations[i]!, antennaLocations[j]!];
					const [dx, dy] = [a.x - b.x, a.y - b.y];
					let [flagA, flagB, n] = [true, true, resonance ? 0 : 1];
					while (flagA || flagB) {
						flagA = addAntinode(map, antinodeLocations, {
							x: a.x + n * dx,
							y: a.y + n * dy,
						});
						flagB = addAntinode(map, antinodeLocations, {
							x: b.x - n * dx,
							y: b.y - n * dy,
						});
						n++;
						if (!resonance) {
							[flagA, flagB] = [false, false];
						}
					}
				}
			}
		});
	return Array.from(antinodeLocations).length;
};
exports.first = antinodeCount;

export const antinodeCountWithResonanceHarmonics = (s: string) => {
	return antinodeCount(s, true);
};
exports.second = antinodeCountWithResonanceHarmonics;
