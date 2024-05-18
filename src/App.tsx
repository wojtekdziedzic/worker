import {useEffect, useState} from 'react'
import './App.css'
import {Footer, Header} from "./components";

function App() {
  const countdownWorker = new Worker('web-worker/countdownWorker.mjs', {type: 'module'});
  const [worker] = useState(countdownWorker);
  const [count, setCount] = useState(0)
  const [remaining, setRemaining] = useState(0)


  useEffect(() => {
// To start the countdown

    // console.log(worker);
    worker.postMessage({type: 'start', seconds: 60});

// To stop the countdown
//     worker.postMessage({ type: 'stop' });

// Receiving messages from the worker
    worker.onmessage = event => {
      console.log(event);
      switch (event.data.type) {
        case 'tick':
          console.log(`Remaining seconds: ${event.data.remaining}`);
          setRemaining(event.data.remaining);
          break;
        case 'done':
          console.log(`Countdown is done`);
          setRemaining(0);
          break;
      }
    };

    return () => {
      worker.postMessage({type: 'stop'});
    }


  }, []);

  return (
    <>
      <Header/>
      {/*<div>*/}
      {/*  <a href="https://vitejs.dev" target="_blank">*/}
      {/*    <img src={viteLogo} className="logo" alt="Vite logo" />*/}
      {/*  </a>*/}
      {/*  <a href="https://react.dev" target="_blank">*/}
      {/*    <img src={reactLogo} className="logo react" alt="React logo" />*/}
      {/*  </a>*/}
      {/*</div>*/}
      <button
        onClick={() => {
          worker.postMessage({type: 'stop'});
        }}
      >
        Click here to stop worker
      </button>
      <button
        onClick={() => {
          worker.postMessage({type: 'stop'});
          worker.postMessage({type: 'start', seconds: remaining})
        }}
      >
        Click here to start worker
      </button>
      <button
        onClick={() => {
          worker.postMessage({type: 'stop'});
          worker.postMessage({type: 'start', seconds: 60});
        }}
      >
        Click here to reset worker
      </button>
      <h1>{remaining}</h1>
      <div className="card">
        <button onClick={() => {
          setRemaining(60 * count);
          worker.postMessage({type: 'stop'});
          worker.postMessage({type: 'start', seconds: 60 * count});
          setCount((count) => count + 1)
        }}>
          count is {count}
        </button>
        {/*<p>*/}
        {/*  Edit <code>src/App.tsx</code> and save to test HMR*/}
        {/*</p>*/}
      </div>
      {/*<p className="read-the-docs">*/}
      {/*  Click on the Vite and React logos to learn more*/}
      {/*</p>*/}
      <Footer/>
    </>
  )
}

export default App
