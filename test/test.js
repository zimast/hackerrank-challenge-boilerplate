/* eslint-disable require-jsdoc */
const fileSystem = require('fs');
const path = require('path');
const chai = require('chai');
const expect = chai.expect;

// Custom Imports
const {parseInput} = require('../hackerrank');
const {queensAttack} = require('../main');

// Config - variable
const challengeName = 'Queen\'s attack II';

// Config - persistent
const inputsFolder = path.resolve(__dirname, 'inputs/');
const outputsFolder = path.resolve(__dirname, 'outputs/');

// #############################################################################

const testCases = [];

function itShouldClauseForTestCase(testCaseNumber) {
  it(`Test case ${testCaseNumber}`, function() {
    expect(queensAttack(testCases[testCaseNumber].input)).to.equals(
        testCases[testCaseNumber].output,
    );
  });
}

describe(`Challenge ${challengeName}`, function() {
  // Set how many test cases are available
  const numberOfTestCases = fileSystem.readdirSync(inputsFolder).length;

  describe(`${numberOfTestCases} Test cases`, function() {
    // Load test cases with their outputs
    before(function() {
      for (let i = 0; i < numberOfTestCases; i++) {
        const inputData = fileSystem
            .readFileSync(`${inputsFolder}/input_${i}`, 'utf8')
            .toString('utf8');

        const outputData = fileSystem
            .readFileSync(`${outputsFolder}/output_${i}`, 'utf8')
            .toString('utf8');

        testCases[i] = {
          input: parseInput(inputData),
          output: outputData,
        };
      }
    });

    for (let i = 0; i < numberOfTestCases; i++) {
      itShouldClauseForTestCase(i);
    }
  });
});
