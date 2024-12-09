import { filesystemChecksum, filesystemChecksumBlocks } from '../src/day09';

const input = `2333133121414131402`;

test('day 9-1', () => {
	expect(filesystemChecksum(input)).toBe(1928);
});

test('day 9-2', () => {
	expect(filesystemChecksumBlocks(input)).toBe(2858);
});
