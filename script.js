/* eslint-disable import/extensions */
import mergeSort from './algo/mergeSort.js';
import bubbleSort from './algo/bubbleSort.js';
import selectionSort from './algo/selectionSort.js';
import quickSort from './algo/quickSort.js';
import insertionSort from './algo/insertionSort.js';
import wait from './utils.js';

const sorts = {
  'bubbleSort': bubbleSort,
  'selectionSort': selectionSort,
  'mergeSort': mergeSort,
  'quickSort': quickSort,
  'insertionSort': insertionSort,
};

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let audioContext = null;
let o = null;
let soundPlaying = false;
let sorting = false;
let sorted = false;

const { width, height } = canvas;

let values = [];
let focused = [];
const numberOfValues = 50;
const barWidth = Math.floor(width / numberOfValues);

const map = (value, x1, y1, x2, y2) => (value - x1) * (y2 - x2) / (y1 - x1) + x2;

function init() {
  values = [];
  for (let i = 0; i < numberOfValues; i += 1) values.push(Math.random());
}

function setValues(a) {
  values = a;
}

function setFocused(a) {
  focused = a;
}

function playSound() {
  if (!soundPlaying) {
    soundPlaying = true;
    o.connect(audioContext.destination);
  }
}

function stopSound() {
  if (soundPlaying) {
    soundPlaying = false;
    o.disconnect(audioContext.destination);
  }
}

function playTone() {
  if (!o || focused.length === 0) return;
  const sum = focused.reduce((a, b) => a + b, 0);
  const avg = sum / focused.length;
  stopSound();
  const frequency = map(avg, 0, values.length, 16, 7902);
  o.frequency.value = frequency;
  playSound();
}

function drawRectangles() {
  for (let i = 0; i < values.length; i += 1) {
    if (focused.includes(i)) context.fillStyle = '#F00';
    context.fillRect(i * barWidth, height, barWidth, Math.floor(-height * values[i]));
    context.fillStyle = '#000';
  }
}

async function check() {
  for (let i = 0; i < values.length; i += 1) {
    setFocused([i]);
    await wait(10);
  }
  setFocused([]);
  stopSound();
}

function clear() {
  context.clearRect(0, 0, width, height);
}

function draw() {
  clear();
  drawRectangles();
  playTone();
}

function animate() {
  draw();
  requestAnimationFrame(animate);
}

function sortEnded() {
  stopSound();
  setFocused([]);
  sorting = false;
  setTimeout(check, 250);
  stopSound();
  sorted = true;
}

function sort() {
  const sortName = document.getElementById('sortSelector').value;
  sorts[sortName](values, setValues, setFocused, sortEnded);
}

init();
animate();

document.getElementById('sort').addEventListener('click', () => {
  if (sorted) {
    init();
  }
  if (sorting) return;
  sort();
  sorting = true;
})

document.getElementById('init').addEventListener('click', () => {
  audioContext = new AudioContext();
  o = audioContext.createOscillator();
  o.type = "triangle";
  o.start();
  document.getElementById('init').remove();
  document.getElementById('sort').disabled = false;
});

document.getElementById('sortSelector').addEventListener('change', () => {
  if (sorted) init();
});