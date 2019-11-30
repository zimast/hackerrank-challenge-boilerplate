/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
/* eslint-disable require-jsdoc */
/**
 *
 * HackerrankReporter.js
 * @module Hackerrank
 *
 */

'use strict';

var Mocha = require('mocha');
const {
  EVENT_RUN_BEGIN,
  EVENT_RUN_END,
  EVENT_SUITE_BEGIN,
  EVENT_SUITE_END,
  EVENT_TEST_FAIL,
  EVENT_TEST_PASS,
  EVENT_TEST_PENDING,
} = Mocha.Runner.constants;
const Base = Mocha.reporters.Base;
const color = Base.color;

/**
 * Expose `Hackerrank`
 */

exports = module.exports = HackerrankReporter;

function HackerrankReporter(runner, options) {
  Base.call(this, runner, options);

  var self = this;
  var indents = 0;
  var n = 0;

  function indent() {
    return Array(indents).join('  ');
  }

  runner.once(EVENT_RUN_BEGIN, function() {
    Base.consoleLog();
  });

  runner.on(EVENT_SUITE_BEGIN, function(suite) {
    ++indents;
    Base.consoleLog(color('suite', '%s%s'), indent(), suite.title);
  });

  runner.on(EVENT_SUITE_END, function() {
    --indents;
    if (indents === 1) {
      Base.consoleLog();
    }
  });

  runner.on(EVENT_TEST_PENDING, function(test) {
    var fmt = indent() + color('pending', '  - %s');
    Base.consoleLog(fmt, test.title);
  });

  runner.on(EVENT_TEST_PASS, function(test) {
    var fmt;
    if (test.speed === 'fast') {
      fmt =
        indent() +
        color('checkmark', '  ' + Base.symbols.ok) +
        color('checkmark', ' %s');
      Base.consoleLog(fmt, test.title);
    } else {
      fmt =
        indent() +
        color('checkmark', '  ' + Base.symbols.ok) +
        color('pass', ' %s') +
        color(test.speed, ' (%dms)');
      Base.consoleLog(fmt, test.title, test.duration);
    }
  });

  runner.on(EVENT_TEST_FAIL, function(test) {
    var fmt;
    fmt =
      indent() + color('fail', '  ' + Base.symbols.err) + color('fail', ' %s');
    Base.consoleLog(fmt, test.title);
  });

  // runner.once(EVENT_RUN_END, () => {
  //   console.log(`end: ${stats.passes}/${stats.passes + stats.failures} ok`);
  // });
}
