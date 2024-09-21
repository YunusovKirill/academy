import { createContext, useReducer, ReactNode, Dispatch } from "react";
import { loggerInit, loggersReducer, LoggerState, LoggerAction } from "../utils/loggerUtils";

export const LoggersContext = createContext<LoggerState>(loggerInit);
export const LoggersDispatchContext = createContext<Dispatch<LoggerAction> | undefined>(undefined);

interface LoggerProviderProps {
  children: ReactNode;
}

export const LoggerProvider = ({ children }: LoggerProviderProps) => {
  const [loggers, dispatch] = useReducer(loggersReducer, loggerInit);

  return (
    <LoggersContext.Provider value={loggers}>
      <LoggersDispatchContext.Provider value={dispatch}>
        {children}
      </LoggersDispatchContext.Provider>
    </LoggersContext.Provider>
  );
};