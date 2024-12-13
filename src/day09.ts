import { sum } from './utils';

type File = {
	id: number;
	empty: boolean;
	length: number;
	start: number;
};

const parse = (s: string) => {
	let start = 0;
	return s
		.split('')
		.map(Number)
		.map((n, i) => {
			start += n;
			return {
				id: i / 2,
				empty: i % 2 === 1,
				length: n,
				start: start - n,
			} as File;
		});
};

export const filesystemChecksum = (s: string) => {
	const filesystem = parse(s);
	let movingFile: File | null = null;
	let result = 0;
	while (filesystem.length > 0) {
		const file = filesystem[0];
		filesystem.shift();
		if (file.empty) {
			for (let j = file.start; j < file.start + file.length; j++) {
				if (movingFile !== null) {
					if (movingFile.length === 0) {
						movingFile = null;
						j--;
						continue;
					}
					result += movingFile.id * j;
					movingFile.length--;
				} else {
					movingFile = filesystem.pop() ?? null;
					if (movingFile?.empty) {
						movingFile = filesystem.pop() ?? null;
					}
					if (movingFile !== null) {
						j--;
					}
				}
			}
		} else {
			for (let j = file.start; j < file.start + file.length; j++) {
				result += file.id * j;
			}
		}
	}
	if (movingFile !== null && movingFile.length > 0) {
		for (
			let j = movingFile.start;
			j < movingFile.start + movingFile.length;
			j++
		) {
			result += movingFile.id * j;
		}
	}
	return result;
};
exports.first = filesystemChecksum;

export const filesystemChecksumBlocks = (s: string) => {
	const filesystem = parse(s);
	const files = filesystem.filter((f) => !f.empty);
	const emptyFiles = filesystem.filter((f) => f.empty);

	const finalFiles: File[] = [];

	for (let i = files.length - 1; i > 0; i--) {
		const file = files[i];
		let moved = false;
		for (let j = 0; j < emptyFiles.length; j++) {
			const emptyFile = emptyFiles[j];
			if (emptyFile.start > file.start) {
				break;
			}
			if (emptyFile.length >= file.length) {
				const remainingLength = emptyFile.length - file.length;
				if (remainingLength > 0) {
					emptyFiles[j] = {
						id: emptyFile.id,
						empty: true,
						length: remainingLength,
						start: emptyFile.start + file.length,
					};
				} else {
					emptyFiles.splice(j, 1);
				}
				finalFiles.push({
					id: file.id,
					empty: false,
					length: file.length,
					start: emptyFile.start,
				});
				moved = true;
				break;
			}
		}
		if (!moved) {
			finalFiles.push(file);
		}
	}

	return finalFiles
		.map((f) => {
			let res = 0;
			for (let j = f.start; j < f.start + f.length; j++) {
				res += f.id * j;
			}
			return res;
		})
		.reduce(sum);
};
exports.second = filesystemChecksumBlocks;
