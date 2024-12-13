import { diff, minmax, range, sum } from './utils';

type Position = { x: number; y: number };

const connectedness = (positions: Position[], p: Position) =>
	(positions.some(({ x, y }) => p.x === x && p.y - 1 === y) ? 1 : 0) +
	(positions.some(({ x, y }) => p.x - 1 === x && p.y === y) ? 1 : 0) +
	(positions.some(({ x, y }) => p.x === x && p.y + 1 === y) ? 1 : 0) +
	(positions.some(({ x, y }) => p.x + 1 === x && p.y === y) ? 1 : 0);

const getLetterPositions = (map: string[][], l: string) =>
	map
		.map((row, y) =>
			row
				.map((cell, x) => {
					if (cell === l) return { x, y } as Position;
				})
				.filter((p) => p !== undefined)
				.map((p) => p as Position)
		)
		.flat();

const getConnectedParts = (positions: Position[]) => {
	let parts: Position[][] = [];
	positions.forEach((p) => {
		const connectedParts: number[] = [];
		for (let ip of parts.keys()) {
			if (connectedness(parts[ip], p)) {
				connectedParts.push(ip);
			}
		}
		if (connectedParts.length == 1) {
			parts[connectedParts[0]].push(p);
		} else if (connectedParts.length == 0) {
			parts.push([p]);
		} else {
			parts = [
				...parts.filter((_, i) => !connectedParts.includes(i)),
				[...connectedParts.map((ip) => parts[ip]).flat(), p],
			];
		}
	});
	return parts;
};

const fenceCost = (s: string, func: (p: Position[]) => number) => {
	const map = s
		.trim()
		.split('\n')
		.map((n) => n.split(''));
	return Array.from(new Set(map.flat()))
		.map((l) =>
			getConnectedParts(getLetterPositions(map, l)).map(
				(obj) => obj.length * func(obj)
			)
		)
		.flat()
		.reduce(sum);
};

export const fenceCostByPerimeter = (s: string) =>
	fenceCost(s, (obj: Position[]) =>
		obj.map((p) => 4 - connectedness(obj, p)).reduce(sum)
	);

exports.first = fenceCostByPerimeter;

const sidesByAxis = (
	obj: Position[],
	ax1: (p: Position) => number,
	ax2: (p: Position) => number
) =>
	range(minmax(obj.map(ax1)))
		.map((n) =>
			[-1, 1].map((d) =>
				obj
					.filter(
						(p) =>
							ax1(p) === n &&
							!obj.some(
								(p1) =>
									ax1(p1) == ax1(p) + d && ax2(p1) == ax2(p)
							)
					)
					.map(ax2)
					.sort(diff)
					.reduce(
						(acc: number, n: number, i: number, arr: number[]) =>
							acc + (i == 0 || n - arr[i - 1] != 1 ? 1 : 0),
						0
					)
			)
		)
		.flat()
		.reduce(sum);

export const fenceCostBySides = (s: string) =>
	fenceCost(
		s,
		(obj: Position[]) =>
			sidesByAxis(
				obj,
				(p: Position) => p.x,
				(p: Position) => p.y
			) +
			sidesByAxis(
				obj,
				(p: Position) => p.y,
				(p: Position) => p.x
			)
	);

exports.second = fenceCostBySides;
