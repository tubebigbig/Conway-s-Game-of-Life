import React, { useState, useCallback } from "react";
import "./App.scss";

const around = [
  [1, -1],
  [1, 0],
  [1, 1],
  [0, -1],
  [0, 1],
  [-1, -1],
  [-1, 0],
  [-1, 1]
];

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < 50; i++) {
    rows.push(Array.from(Array(50), () => false));
  }

  return rows;
};

const App: React.FC = () => {
  let status = false;
  let [map, setMap] = useState(() => {
    return generateEmptyGrid();
  });
  const changeMap = (i: number, k: number) => {
    let newMap = [...map];
    newMap[i][k] = !newMap[i][k];
    setMap([...newMap]);
  };
  const randomMap = () => {
    let newMap = [...map];
    for (let i = 0; i < newMap.length; i++) {
      const element = newMap[i];
      for (let k = 0; k < element.length; k++) {
        const randomNum = Math.random() < 0.3;
        newMap[i][k] = randomNum;
      }
    }
    setMap([...newMap]);
  };
  const compute = useCallback(() => {
    setMap(g => {
      let newMap = JSON.parse(JSON.stringify(g));
      logic(g, newMap);
      return newMap;
    });
    setTimeout(compute, 100);
  }, []);
  const logic = (g: any[], newMap: any[]) => {
    for (let i = 0; i < g.length; i++) {
      const element = g[i];
      for (let k = 0; k < element.length; k++) {
        let exist = 0;
        around.forEach(([x, y]) => {
          if (
            i + x >= 0 &&
            k + y >= 0 &&
            i + x < 50 &&
            k + y < 50 &&
            g[i + x][k + y]
          ) {
            exist++;
          }
        });
        if (g[i][k]) {
          if (exist < 2 || exist > 3) newMap[i][k] = false;
        } else {
          if (exist === 3) newMap[i][k] = true;
        }
      }
    }
  };

  const clear = () => {
    setMap(
      Array.from({ length: 50 }, () => Array.from({ length: 50 }, () => false))
    );
  };
  return (
    <>
      <button onClick={randomMap}>random</button>
      <button
        onClick={() => {
          status = !status;
          compute();
        }}
      >
        {!status ? "run" : "pause"}
      </button>
      <button onClick={compute}>compute</button>
      <button onClick={clear}>clear</button>
      <div className="App">
        {map.map((col, i) => {
          return col.map((row, k) => {
            return (
              <div
                className={row ? "focus" : ""}
                onClick={() => changeMap(i, k)}
                key={i + "_" + k}
              ></div>
            );
          });
        })}
      </div>
    </>
  );
};

export default App;

// import React, { useState, useCallback, useRef } from "react";

// const numRows = 50;
// const numCols = 50;

// const operations = [
//   [0, 1],
//   [0, -1],
//   [1, -1],
//   [-1, 1],
//   [1, 1],
//   [-1, -1],
//   [1, 0],
//   [-1, 0]
// ];

// const generateEmptyGrid = () => {
//   const rows = [];
//   for (let i = 0; i < numRows; i++) {
//     rows.push(Array.from(Array(numCols), () => 0));
//   }

//   return rows;
// };

// const App: React.FC = () => {
//   const [grid, setGrid] = useState(() => {
//     return generateEmptyGrid();
//   });

//   const [running, setRunning] = useState(false);

//   const runningRef = useRef(running);
//   runningRef.current = running;

//   const runSimulation = useCallback(() => {
//     if (!runningRef.current) {
//       return;
//     }

//     setGrid(g => {
//       const gridCopy = JSON.parse(JSON.stringify(g));
//       for (let i = 0; i < numRows; i++) {
//         for (let k = 0; k < numCols; k++) {
//           let neighbors = 0;
//           operations.forEach(([x, y]) => {
//             const newI = i + x;
//             const newK = k + y;
//             if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
//               neighbors += g[newI][newK];
//             }
//           });

//           if (neighbors < 2 || neighbors > 3) {
//             gridCopy[i][k] = 0;
//           } else if (g[i][k] === 0 && neighbors === 3) {
//             gridCopy[i][k] = 1;
//           }
//         }
//       }
//       return gridCopy;
//     });

//     setTimeout(runSimulation, 100);
//   }, []);

//   return (
//     <>
//       <button
//         onClick={() => {
//           setRunning(!running);
//           if (!running) {
//             runningRef.current = true;
//             runSimulation();
//           }
//         }}
//       >
//         {running ? "stop" : "start"}
//       </button>
//       <button
//         onClick={() => {
//           const rows = [];
//           for (let i = 0; i < numRows; i++) {
//             rows.push(
//               Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0))
//             );
//           }

//           setGrid(rows);
//         }}
//       >
//         random
//       </button>
//       <button
//         onClick={() => {
//           setGrid(generateEmptyGrid());
//         }}
//       >
//         clear
//       </button>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: `repeat(${numCols}, 20px)`
//         }}
//       >
//         {grid.map((rows, i) =>
//           rows.map((col, k) => (
//             <div
//               key={`${i}-${k}`}
//               onClick={() => {
//                 const gridCopy = JSON.parse(JSON.stringify(grid));
//                 gridCopy[i][k] = grid[i][k] ? 0 : 1;
//                 setGrid(gridCopy);
//               }}
//               style={{
//                 width: 20,
//                 height: 20,
//                 backgroundColor: grid[i][k] ? "pink" : undefined,
//                 borderBottom: "solid 1px gray",
//                 borderRight: "solid 1px gray"
//               }}
//             />
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// export default App;
