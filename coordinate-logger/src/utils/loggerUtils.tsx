export interface LoggerState {
  [key: string]: { x: number; y: number } | undefined;
}

export type LoggerAction =
  | { type: "ADD_LOGGER"; payload: { id: string; center: { x: number; y: number } } }
  | { type: "REMOVE_LOGGER"; payload: { id: string } };

export const loggerInit: LoggerState = {};

export const loggersReducer = (state: LoggerState, action: LoggerAction): LoggerState => {
  switch (action.type) {
    case "ADD_LOGGER": {
      return { ...state, [action.payload.id]: action.payload.center };
    }
    case "REMOVE_LOGGER": {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
};