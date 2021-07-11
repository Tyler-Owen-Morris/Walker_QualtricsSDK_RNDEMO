import { UPDATE_AUTH } from '../constants';

const setAuth = (auth) => {
  return {
    type: UPDATE_AUTH,
    payload: auth,
  };
};

const setCreds = (creds) => {
  return {
    type: UPDATE_CREDS,
    payload: creds,
  }
}

export const updateAuth = (auth) => dispatch => {
  dispatch(setAuth(auth));
};

export const updateCreds = (creds) => dispatch => {
  dispatch(setCreds(creds));
}
