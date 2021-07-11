import { UPDATE_AUTH, UPDATE_CREDS } from '../constants';

const authReducer = (state = null, action) => {
  switch (action.type) {
    case UPDATE_AUTH:
      return action.payload;
    case UPDATE_CREDS:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
