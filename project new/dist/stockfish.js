// Download Stockfish WASM
const stockfishUrl = 'https://unpkg.com/stockfish.wasm@0.10.0/stockfish.js';

fetch(stockfishUrl)
  .then(response => response.text())
  .then(content => {
    const blob = new Blob([content], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);
    worker.onmessage = (e) => {
      self.postMessage(e.data);
    };
    self.onmessage = (e) => {
      worker.postMessage(e.data);
    };
  })
  .catch(error => {
    console.error('Error loading Stockfish:', error);
  });