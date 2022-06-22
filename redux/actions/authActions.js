import { UPDATE_AUTH, UPDATE_CREDS, UPDATE_VARS } from '../constants';

const setAuth = auth => {
  //console.log("Reducer auth:", auth)
  return {
    type: UPDATE_AUTH,
    payload: auth,
  };
};

const setCreds = creds => {
  //console.log("creds reducer:", creds);
  return {
    type: UPDATE_CREDS,
    payload: creds,
  };
};

const setVars = vars => {
  //console.log("vars reducer:", vars);
  return {
    type: UPDATE_VARS,
    payload: vars,
  };
};

export const updateAuth = auth => dispatch => {
  dispatch(setAuth(auth));
};

export const updateCreds = creds => dispatch => {
  dispatch(setCreds(creds));
};

export const updateVars = vars => dispatch => {
  dispatch(setVars(vars));
};
