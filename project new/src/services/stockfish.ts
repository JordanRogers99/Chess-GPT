import { Chess } from 'chess.js';

class StockfishService {
  private worker: Worker | null = null;
  private isReady = false;
  private onMoveCallback: ((move: string) => void) | null = null;

  constructor() {
    this.initializeWorker();
  }

  private async initializeWorker() {
    try {
      const wasmSupported = typeof WebAssembly === 'object';
      if (!wasmSupported) {
        throw new Error('WebAssembly not supported');
      }

      const response = await fetch('https://unpkg.com/stockfish.wasm@0.10.0/stockfish.wasm');
      const wasmBinary = await response.arrayBuffer();
      const wasmModule = await WebAssembly.compile(wasmBinary);

      const workerBlob = new Blob([`
        importScripts('https://unpkg.com/stockfish.js@10.0.2/stockfish.js');
        
        let stockfish = new Worker(stockfishjs);
        
        onmessage = function(e) {
          stockfish.postMessage(e.data);
        };
        
        stockfish.onmessage = function(e) {
          postMessage(e.data);
        };
      `], { type: 'application/javascript' });

      this.worker = new Worker(URL.createObjectURL(workerBlob));
      this.worker.onmessage = this.handleMessage.bind(this);
      this.init();
    } catch (error) {
      console.error('Failed to initialize Stockfish:', error);
    }
  }

  private init() {
    if (!this.worker) return;
    this.worker.postMessage('uci');
    this.worker.postMessage('isready');
    this.worker.postMessage('setoption name Skill Level value 10');
    this.worker.postMessage('ucinewgame');
  }

  private handleMessage(event: MessageEvent) {
    const message = event.data;
    
    if (message === 'readyok') {
      this.isReady = true;
    }
    
    if (typeof message === 'string' && message.includes('bestmove')) {
      const move = message.split(' ')[1];
      if (this.onMoveCallback && move && move !== '(none)') {
        this.onMoveCallback(move);
      }
    }
  }

  public makeMove(fen: string, callback: (move: string) => void) {
    if (!this.worker) {
      this.initializeWorker().then(() => {
        if (this.worker && this.isReady) {
          this.onMoveCallback = callback;
          this.worker.postMessage(`position fen ${fen}`);
          this.worker.postMessage('go depth 15');
        }
      });
      return;
    }

    if (!this.isReady) {
      setTimeout(() => this.makeMove(fen, callback), 100);
      return;
    }

    this.onMoveCallback = callback;
    this.worker.postMessage(`position fen ${fen}`);
    this.worker.postMessage('go depth 15');
  }

  public destroy() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}

export default new StockfishService();