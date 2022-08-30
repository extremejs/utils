import slice from "./slice.js";

/**
 * It will create an array of elements, split into groups the length of `size`.
 * If the array can't be split evenly, the final chunk will be the remaining elements.
 * @since 1.0.0
 * @param array
 * @param [size=1]
 * @example
 * chunk([1, 2, 3]);
 * // => [[1], [2], [3]]
 * @example
 * chunk([1, 2, 3, 4, 5], 2);
 * // => [[1, 2], [3, 4], [5]]
 */
export default function chunk<Value>(array: Value[], size = 1): Value[][] {
  return Array.from(
    { length: Math.ceil(array.length / size) },
    (value, index) => {
      const start = index * size;

      return slice(array, start, start + size);
    },
  );
}
