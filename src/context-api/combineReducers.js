const combineReducers =
  (...reducers) =>
  (state, action) =>
    reducers.reduce((newState, reducer) => reducer(newState, action), state);

/*
// At module level, so the combined function doesn't change.
const combinedReducer = combineReducers(reducer1, reducer2);

// Inside your component.
const [state, dispatch] = useReducer(combinedReducer, initialState)
 */
