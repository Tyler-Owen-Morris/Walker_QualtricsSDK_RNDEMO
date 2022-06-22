import { UPDATE_AUTH, UPDATE_CREDS, UPDATE_VARS } from '../constants';

const initialState = {
  auth: null,
  creds: {
    brandID: 'smartnews',
    //brandID: 'walkersandbox',
    //projectID: 'ZN_9XhdWiyfHvNt0ai', //this is for walkersandbox brand
    //projectID: 'ZN_40H0UIBvgsiTEBE', //this is for smartnews
    projectID: 'ZN_3OSd4nH9nOQsTc2',
    //projectID: 'ZN_d5TRrsV1GMEawSy',
    //extRefID: 'TEST_CONTACT123',
    extRefID: 'XeRILVNuSkyMAam-iostKA',
  },
  custom_vars: [
    {
      key: 0,
      name: 'deviceToken',
      value: 'XeRILVNuSkyMAam-iostKA',
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
