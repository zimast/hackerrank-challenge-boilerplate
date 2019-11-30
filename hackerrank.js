/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
let lines;
let currentLine;

function readLine() {
  return lines[currentLine++];
}

function parseLines(input) {
  currentLine = 0;
  lines = input.trim().split(/\r?\n/);
}

exports.parseInput = function parseInput(input) {
  const parsedInput = {};
  parseLines(input);

  // Custom parsing per challenge
  const nk = readLine().split(' ');

  parsedInput.n = parseInt(nk[0], 10);
  parsedInput.k = parseInt(nk[1], 10);

  // eslint-disable-next-line camelcase
  const r_qC_q = readLine().split(' ');

  parsedInput.r_q = parseInt(r_qC_q[0], 10);
  parsedInput.c_q = parseInt(r_qC_q[1], 10);

  parsedInput.obstacles = Array(parsedInput.k);

  for (let i = 0; i < parsedInput.k; i++) {
    parsedInput.obstacles[i] = readLine()
        .split(' ')
        .map((obstaclesTemp) => parseInt(obstaclesTemp, 10));
  }

  return parsedInput;
};
