import {UPDATE_AUTH, UPDATE_CREDS, UPDATE_VARS} from '../constants';

const initialState = {
  auth: null,
  creds: {
    //brandID: 'cnb',
    brandID: 'walkersandbox',
    projectID: 'ZN_9XhdWiyfHvNt0ai', //this is for walkersandbox brand
    //projectID: 'ZN_3Lae6Zo5x1SPpOJ', //this is for CNB
    //projectID: 'ZN_d5TRrsV1GMEawSy',
    extRefID: 'TEST_CONTACT123',
  },
  custom_vars: [
    {
      key: 0,
      name: 'navigation',
      value: 'home',
    },
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
