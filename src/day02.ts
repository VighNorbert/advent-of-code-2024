const parse = (s: string) => s.trim().split('\n');

export const safeReports = (s: string) => {
	return parse(s)
		.map((line) => isReportSafe(line.split(' ').map(Number)))
		.reduce((acc, x) => acc + (x ? 1 : 0), 0);
};
exports.first = safeReports;

const isReportSafe = (arr: number[]) => {
	return arr.reduce((acc, x, i, arr) => {
		return (
			acc &&
			(arr[1] > arr[0]
				? i == 0 || (x > arr[i - 1] && Math.abs(x - arr[i - 1]) <= 3)
				: i == 0 || (x < arr[i - 1] && Math.abs(x - arr[i - 1]) <= 3))
		);
	}, true);
};

export const safeReportsWithDampener = (s: string) => {
	return parse(s)
		.map((line) => {
			const arr = line.split(' ').map(Number);
			return (
				isReportSafe(arr) ||
				arr
					.map((x, i, arr) =>
						isReportSafe([...arr.slice(0, i), ...arr.slice(i + 1)])
					)
					.some((x) => x)
			);
		})
		.reduce((acc, x) => acc + (x ? 1 : 0), 0);
};
exports.second = safeReportsWithDampener;
