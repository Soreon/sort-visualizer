import wait from "../utils.js";

export default async function insertionSort(inputArr, setValue, setFocused, sortEnded) {
    let n = inputArr.length;
    for (let i = 1; i < n; i++) {
        // Choosing the first element in our unsorted subarray
        let current = inputArr[i];
        // The last element of our sorted subarray
        let j = i - 1;
        while ((j > -1) && (current < inputArr[j])) {
            inputArr[j + 1] = inputArr[j];
            j--;
            setFocused([i, j]);
            setValue(inputArr);
            await wait(100);
        }
        inputArr[j + 1] = current;
    }
    sortEnded();
}