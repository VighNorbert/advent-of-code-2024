const parse = (s: string) => s.trim().split('mul(');

export const mulSums = (s: string) => {
	return parse(s)
		.map((x, i) => {
			if (i === 0) return 0;
			const parts = x.split(')');
			if (parts.length === 1) return 0;
			const nums = parts[0].split(',');
			if (
				nums.length !== 2 ||
				nums.some((n) => n.split('').some((c) => isNaN(parseInt(c))))
			) {
				return 0;
			}
			return parseInt(nums[0]) * parseInt(nums[1]);
		})
		.reduce((a, b) => a + b, 0);
};
exports.first = mulSums;

export const mulSumsDoDont = (s: string) => {
	return s
		.split('do()')
		.map((t) => t.split("don't()")[0])
		.map(mulSums)
		.reduce((a, b) => a + b, 0);
};
exports.second = mulSumsDoDont;
