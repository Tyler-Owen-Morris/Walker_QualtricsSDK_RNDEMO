import {UPDATE_AUTH, UPDATE_CREDS, UPDATE_VARS} from '../constants';

const initialState = {
  auth: null,
  creds: {
    brandID: 'walkersandbox',
    projectID: 'ZN_9XhdWiyfHvNt0ai', //this is for walkersandbox brand
    extRefID: 'tmorris',
  },
  custom_vars: [
    {key: 0, name: 'test', value: 'true'},
    {key: 1, name: 'Number', value: '55'},
    {key: 2, name: 'String', value: 'sample string'},
  ],
};

const authReducer = (state = initialState, action) => {
  //console.log("ACTION:", action)
  switch (action.type) {
    case UPDATE_AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case UPDATE_CREDS:
      return {
        ...state,
        creds: action.payload,
      };
    case UPDATE_VARS:
      return {
        ...state,
        custom_vars: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
