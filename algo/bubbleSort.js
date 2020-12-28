import wait from '../utils.js';

// export default async function bubbleSort(arr, setValue, setFocused, sortEnded) {
//     const n = arr.length;
//     for (let i = 0; i < n - 1; i++) {
//         for (let j = 0; j < n - i - 1; j++) {
//             if (arr[j] > arr[j + 1]) {
//                 setFocused([j, j + 1]);
//                 [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
//             }
//             setValue(arr);
//             await wait(10);
//         }
//     }
//     sortEnded();
// } 

export default async function bubbleSort (inputArr, setValue, setFocused, sortEnded) {
    let len = inputArr.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < len; i++) {
            if (inputArr[i] > inputArr[i + 1]) {
                setFocused([i, i + 1]);
                [inputArr[i], inputArr[i + 1]] = [inputArr[i + 1], inputArr[i]];
                swapped = true;
            }
        }
        setValue(inputArr);
        await wait(100);
    } while (swapped);
    sortEnded();
};