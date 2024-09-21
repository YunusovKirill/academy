import { useEffect, useReducer, useState } from "react";
import CoordinateLogger from "./components/CoordinateLogger";
import { LoggersContext, LoggersDispatchContext } from "./context/LoggersContext";
import { loggersReducer, loggerInit } from "./utils/loggerUtils";
import TestChild from './components/TestChild'

function App() {
  const [loggers, dispatch] = useReducer(loggersReducer, loggerInit);
  const [test, setTest] = useState(false);
  useEffect(() => {
    if (!test) setTimeout(() => setTest(true), 1000);
  }, [test]);

  return (
    <>
      <LoggersContext.Provider value={loggers}>
        <LoggersDispatchContext.Provider value={dispatch}>
          <CoordinateLogger>
            <div
              style={{
                marginTop: "-20px",
                width: "200px",
                height: "200px",
                border: "3px solid black",
              }}
            ></div>
            <div
              style={{
                width: "200px",
                height: "200px",
                border: "3px solid black",
              }}
            ></div>
            <div
              style={{
                width: "200px",
                height: "200px",
                border: "3px solid black",
              }}
            ></div>
            {test && (
              <div
                style={{
                  // display: "none",
                  width: "200px",
                  height: "200px",
                  border: "3px solid black",
                }}
              ></div>
            )}
          </CoordinateLogger>
          <CoordinateLogger>
            <div
              style={{
                marginTop: "-20px",
                width: "200px",
                height: "200px",
                border: "3px solid black",
              }}
            ></div>
            <div
              style={{
                width: "200px",
                height: "200px",
                border: "3px solid black",
              }}
            ></div>
          </CoordinateLogger>
          <CoordinateLogger>
            <div
              style={{
                marginTop: "-20px",
                width: "200px",
                height: "200px",
                border: "3px solid black",
              }}
            ></div>
            <TestChild />
          </CoordinateLogger>
        </LoggersDispatchContext.Provider>
      </LoggersContext.Provider>
    </>
  );
}

export default App;
