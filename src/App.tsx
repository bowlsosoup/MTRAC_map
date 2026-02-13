import { useState } from 'react'
import { useEffect } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import Message from './components/message';
import ListGroup from './components/ListGroup';
// import Alert from './components/Alert';
// import Button from './components/Button';
import Map from './components/Map';
import getPoints from './getPoints';



function App() {
  
  const colors = ["#2563eb", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4"];

  const [points, setPoints] = useState(getPoints());

  const items = [
    {label: 'Robot 1', colour: colors[0]},
    {label: 'Robot 2', colour: colors[1]},
    {label: 'Robot 3', colour: colors[2]},
    {label: 'Robot 4', colour: colors[3]},
    {label: 'Robot 5', colour: colors[4]},
    {label: 'Robot 6', colour: colors[5]},
  ]
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSelectItem = (index: number) => {
    console.log(index);
    setSelectedIndex(index);
  }

  // const [AlertVisible, setAlertVisibility] = useState(false);

useEffect(() => {
  const interval = setInterval(() => {
    setPoints(prevPoints => 
      prevPoints.map(point => ({
        ...point,
        lat: point.lat + (Math.random() - 0.5) * 0.001,
        lng: point.lng + (Math.random() - 0.5) * 0.001,
        orientation: (point.orientation + (Math.random() - 0.5) * 30 + 360) % 360
      }))
    );
  }, 100);

  return () => clearInterval(interval);
}, []);

  return (
    <>
      {/* <div>
        {AlertVisible && <Alert onClose={() => setAlertVisibility(false)}> Alert </Alert>}
        <Button onClick={() => setAlertVisibility(true)}> Alert Button</Button>
      </div> */}
      <div /> MSTRC Lab
      <div>
        <h1>Robot Map</h1>
        <Map points={points} width={800} height={600} selectedIndex={selectedIndex} />
      </div>
      <div>
        <ListGroup items={items} heading={'Robots'} onSelectItem={handleSelectItem}/>
      </div>

    </>
  );
  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
}

export default App
