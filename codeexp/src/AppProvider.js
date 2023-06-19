import { createContext, useReducer, useContext } from "react";

const AppContext = createContext(null);
const AppDispatchContext = createContext(null);
// Get the State stored in Context
export const useAppContext = () => {
  return useContext(AppContext);
};
// Get the Dispatch Function used in Reducer
export const useAppDispatchContext = () => {
  return useContext(AppDispatchContext);
};

const myReducer = (state, action) => {
  switch (action.type) {
    case "completedQuestId": {
      return { ...state, completedQuestId: action.val };
    }
    case "setUserInfo": {
      return { ...state, userInfo: action.val };
    }
    case "allQuests": {
      return { ...state, allQuests: action.val };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

const initialState = { userInfo: { uid: "123" } };
export const AppProvider = ({ children }) => {
  const [myState, dispatch] = useReducer(myReducer, initialState);

  return (
    <AppContext.Provider value={myState}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};
