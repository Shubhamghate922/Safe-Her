import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();

// Closure state memory counter example
const createCounter = () => {
  let count = 0; // Enclosed state variable
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count,
  };
};

const closureCounter = createCounter();

/**
 * @route   GET /api/demo/blocking-vs-nonblocking
 * @desc    Demonstrates blocking (sync) vs non-blocking (async) execution in Node.js
 * @access  Public
 */
router.get('/blocking-vs-nonblocking', async (req, res) => {
  const mode = req.query.mode || 'non-blocking';
  const start = performance.now();

  if (mode === 'blocking') {
    // Synchronous CPU blocking loop (Simulates blocking the Node.js Event Loop thread)
    const iterations = 50000000;
    let sum = 0;
    for (let i = 0; i < iterations; i++) {
      sum += Math.sqrt(i);
    }
    const end = performance.now();
    
    return res.status(200).json({
      success: true,
      mode: 'SYNCHRONOUS_BLOCKING',
      message: 'Event loop was blocked during CPU-bound computation!',
      iterationsProcessed: iterations,
      resultSum: Math.round(sum),
      executionTimeMs: (end - start).toFixed(2),
      explanation: 'Synchronous operations block the single-threaded Node.js Event Loop. No other HTTP requests can be handled while this loop runs.',
    });
  } else {
    // Asynchronous non-blocking execution using Promises / I/O timers
    await new Promise((resolve) => setTimeout(resolve, 50));
    const end = performance.now();

    return res.status(200).json({
      success: true,
      mode: 'ASYNCHRONOUS_NON_BLOCKING',
      message: 'Node.js processed this operation asynchronously using libuv / Event Loop non-blocking I/O!',
      delayMs: 50,
      executionTimeMs: (end - start).toFixed(2),
      explanation: 'Non-blocking async code delegates heavy I/O or delays to libuv thread pool / OS kernel. The Event Loop remains free to handle incoming requests concurrently.',
    });
  }
});

/**
 * @route   GET /api/demo/closures
 * @desc    Demonstrates Closure lexical scope state retention in Node.js
 * @access  Public
 */
router.get('/closures', (req, res) => {
  const currentVal = closureCounter.increment();

  res.status(200).json({
    success: true,
    topic: 'JavaScript Closures',
    retainedCounterValue: currentVal,
    explanation: 'The closureCounter retains access to the inner count variable defined in createCounter scope even long after createCounter finished executing.',
    codeSnippet: `const createCounter = () => {
  let count = 0; // Enclosed lexical scope
  return { increment: () => ++count, getValue: () => count };
};`,
  });
});

/**
 * @route   GET /api/demo/modules-info
 * @desc    Explains CommonJS (CJS) vs ES Modules (ESM) in Node.js
 * @access  Public
 */
router.get('/modules-info', (req, res) => {
  res.status(200).json({
    success: true,
    activeModuleSystemInThisServer: 'ES Modules (ESM) with "type": "module" in package.json',
    comparison: [
      {
        feature: 'Syntax',
        commonJS: 'const express = require("express"); module.exports = router;',
        esModules: 'import express from "express"; export default router;',
      },
      {
        feature: 'Loading Type',
        commonJS: 'Synchronous runtime resolution',
        esModules: 'Asynchronous static/compile-time resolution',
      },
      {
        feature: 'File Extensions',
        commonJS: '.cjs or default when package.json lacks "type": "module"',
        esModules: '.mjs or .js when "type": "module" is declared in package.json',
      },
      {
        feature: 'Top-Level Async',
        commonJS: 'Not supported natively (must wrap in async IIFE)',
        esModules: 'Top-level await supported out of the box in Node.js 14.8+',
      },
    ],
  });
});

/**
 * @route   GET /api/demo/server-architecture
 * @desc    Explains how Node.js HTTP Server & Express Router work
 * @access  Public
 */
router.get('/server-architecture', (req, res) => {
  res.status(200).json({
    success: true,
    architecture: {
      httpServer: 'http.createServer(app) listens on PORT 5000 and parses incoming TCP byte streams into HTTP req & res streams',
      eventLoopStages: [
        '1. Timers (setTimeout, setInterval)',
        '2. Pending Callbacks (I/O callbacks)',
        '3. Poll (Fetch new I/O events, execute socket callbacks)',
        '4. Check (setImmediate)',
        '5. Close Callbacks (socket.on("close"))',
      ],
      expressRoutingPipeline: [
        'Client Request -> Express Middleware Stack (Cors, JSON parser, Logger)',
        '-> Matching Express Router Path (/api/users)',
        '-> Controller Action (Async Mongoose Mongo DB Query)',
        '-> Response formatting (res.status(200).json(...))',
      ],
    },
  });
});

export default router;
