import * as React from "react";
// import { useHistory,useLocation,useParams } from 'react-router-dom';

let ContextUnivers = React.createContext();

let initialState = 'globale';

// console.log('ALLLLO');

let reducer = (state, action) => {
  switch (action.type) {
    case "changeUnivers":
      console.log('changeUnivers',action.payload);
      return action.payload||initialState;
  }
};

function ContextUniversProvider(props) {

  let [state, dispatch] = React.useReducer(reducer, initialState);
  let value = { state, dispatch };
  console.log('value',value);

  return (
    <ContextUnivers.Provider value={value}>{props.children}</ContextUnivers.Provider>
  );
}

export { ContextUnivers, ContextUniversProvider};
