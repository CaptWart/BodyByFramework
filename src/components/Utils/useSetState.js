import { useReducer } from 'react';

const reducer = (previousState = {}, updatedState = {}) => {
  console.log("previousState: ", previousState);
  console.log("updateState: ", updatedState);
  return { ...previousState, ...updatedState };
};

const useSetState = (initialState = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setState = updatedState => dispatch(updatedState);

  return [state, setState];
};

export default useSetState;