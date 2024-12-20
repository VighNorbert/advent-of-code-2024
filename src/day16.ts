export class Queue<T> {
	constructor(private priorityFun: (item: T) => number) {}
	private data: T[] = [];
	push(item: T) {
		let split = this.data.findIndex(
			(p) => this.priorityFun(p) > this.priorityFun(item)
		);
		split = split === -1 ? this.data.length : split;
		this.data = [
			...this.data.slice(0, split),
			item,
			...this.data.slice(split),
		];
	}
	shift() {
		return this.data.shift();
	}
}

type Position = { x: number; y: number };
type QueueItem = {
	x: number;
	y: number;
	steps: number;
	heading: number;
};

const dirs = [
	{ x: 0, y: -1 },
	{ x: 1, y: 0 },
	{ x: 0, y: 1 },
	{ x: -1, y: 0 },
];

const addPosition = (
	queue: Queue<QueueItem>,
	x: number,
	y: number,
	steps: number,
	heading: number
) => {
	queue.push({ x, y, steps, heading });
};

export const lowestMazeScore = (s: string) => {
	const maze = s
		.trim()
		.split('\n')
		.map((l) => l.split(''));
	const y = maze.findIndex((row) => row.includes('S'));
	const x = maze[y].indexOf('S');

	const queue = new Queue<QueueItem>((qi) => qi.steps);
	addPosition(queue, x, y, 1000, 0);
	addPosition(queue, x, y, 0, 1);
	addPosition(queue, x, y, 1000, 2);
	addPosition(queue, x, y, 2000, 3);

	const unvisited: Position[] = maze
		.map((row, y) =>
			row
				.map((c, x) => ({ x, y, c }))
				.filter((c) => c.c !== '#' && c.c !== 'S')
		)
		.flat();

	while (true) {
		const { x, y, steps, heading } = queue.shift()!;
		if (maze[y][x] === 'E') return steps;

		const dir = dirs[heading];
		const [nextX, nextY] = [x + dir.x, y + dir.y];
		if (unvisited.some((v) => v.x === nextX && v.y === nextY)) {
			addPosition(queue, nextX, nextY, steps + 1, heading);
			addPosition(queue, nextX, nextY, steps + 1001, (heading + 1) % 4);
			addPosition(queue, nextX, nextY, steps + 2001, (heading + 2) % 4);
			addPosition(queue, nextX, nextY, steps + 1001, (heading + 3) % 4);
			unvisited.splice(
				unvisited.findIndex((v) => v.x === nextX && v.y === nextY),
				1
			);
		}
	}
};
exports.first = lowestMazeScore;

export const bestPathTileCount = (s: string) => {
	return 0;
};
exports.second = bestPathTileCount;
