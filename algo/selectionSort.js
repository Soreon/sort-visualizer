import wait from "../utils.js";

export default async function selectionSort(inputArr, setValue, setFocused, sortEnded) {
    let n = inputArr.length;

    for (let i = 0; i < n; i++) {
        // Finding the smallest number in the subarray
        let min = i;
        for (let j = i + 1; j < n; j++) {
            if (inputArr[j] < inputArr[min]) {
                min = j;
            }
        }
        if (min != i) {
            setFocused([min, i]);
            // Swapping the elements
            let tmp = inputArr[i];
            inputArr[i] = inputArr[min];
            inputArr[min] = tmp;
        }
        setValue(inputArr);
        await wait(100);
    }
    sortEnded();
}