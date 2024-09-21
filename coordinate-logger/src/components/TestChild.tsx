import { useContext } from "react";
import { LoggersContext } from '../context/LoggersContext'

function TestChild() {
    const loggers = useContext(LoggersContext);
    return(
        <>
            {console.log(loggers)}
        </>
    );
}

export default TestChild;