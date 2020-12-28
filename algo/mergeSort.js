import wait from "../utils.js";

let dep = [];
let ar = [];

// Merging two sorted subarrays properly
async function merge(arr1, arr2, setValue, setFocused) {
  // Make a new array, and 2 pointers to keep track of elements of arr1 and arr2     
  let res = [],
      i = 0,
      j = 0;
  
  // Loop until either arr1 or arr2 becomes empty
  while (i < arr1.length && j < arr2.length) {
      // If the current element of arr1 is lesser than that of arr2, push arr1[i] and increment i         
      if (arr1[i] < arr2[j]) {
          res.push(arr1[i]);
          i++;
      } else {
          res.push(arr2[j]);
          j++;
      }
      setFocused([dep.indexOf(arr1[i]), dep.indexOf(arr2[j])]);
      await wait(100);
  }

  // Add the rest of the remining subarray, to our new array
  while (i < arr1.length) {
      res.push(arr1[i]);
      i++;
      setFocused([dep.indexOf(arr1[i])]);
      await wait(50);
  }
  while (j < arr2.length) {
      res.push(arr2[j]);
      j++;
      setFocused([dep.indexOf(arr2[j])]);
      await wait(50);
  }
  return res;
}

// Recursive merge sort
async function ms(arr, setValue, setFocused) {
  // Base case
  if (arr.length <= 1) return arr;

  // Splitting into two halves
  let mid = Math.floor(arr.length / 2);
  let left = await ms(arr.slice(0, mid), setValue, setFocused);
  let right = await ms(arr.slice(mid), setValue, setFocused);

  // merging the two sorted halves
  const mrgd = await merge(left, right, setValue, setFocused);
  dep = [...dep].filter(e => !mrgd.includes(e));
  dep = [...mrgd, ...dep];
  setValue(dep);
  await wait(100);
  return mrgd
}

// Recursive merge sort
export default async function mergeSort(arr, setValue, setFocused, sortEnded) {
  dep = [...arr];
  const finl = await ms(arr, setValue, setFocused);
  setValue(finl);
  sortEnded();
}