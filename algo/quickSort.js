import wait from "../utils.js";

const pivot = async (arr, start = 0, end = arr.length + 1, setValue, setFocused) => {
    const swap = (list, a, b) => [list[a], list[b]] = [list[b], list[a]];

    let pivot = arr[start],
        pointer = start;

    for (let i = start; i < arr.length; i++) {
        if (arr[i] < pivot) {
            pointer++;
            swap(arr, pointer, i);
            setFocused([start, pointer, end]);
            setValue(arr);
            await wait(100);
        }
    };
    swap(arr, start, pointer);

    return pointer;
}

const qs = async (arr, start = 0, end = arr.length, setValue, setFocused) => {
    let pivotIndex = await pivot(arr, start, end, setValue, setFocused);

    if (start >= end) return arr;
    await qs(arr, start, pivotIndex, setValue, setFocused);
    await qs(arr, pivotIndex + 1, end, setValue, setFocused);

    return arr;
};

export default async function quickSort(items, setValue, setFocused, sortEnded) {
    await qs(items, 0, items.length - 1, setValue, setFocused);
    sortEnded();
}