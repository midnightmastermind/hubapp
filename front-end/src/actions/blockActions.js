import axios from "axios";

import {
  REQUEST_BLOCKS,
  RECEIVE_BLOCKS,
  GET_ERRORS
} from "./types";


export const fetchBlocks = dispatch => {
  return dispatch => {
    dispatch(requestBlocks())
    return axios
    .get("/api/blocks")
    .then(res => {
      const blocks = res.data;
      dispatch(receiveBlocks(blocks));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    })
    );
   }
};

export const updateBlock = block => dispatch => {
  let requestUrl;
  if (block._id) {
        requestUrl = '/api/blocks/' + block._id + '/update';
  } else {
       requestUrl = '/api/blocks/create';
  }
  axios
    .post(requestUrl, block)
    .then(res => {
      dispatch(fetchBlocks());
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );

};
export const receiveBlocks = blocks => {
  return {
    type: RECEIVE_BLOCKS,
    blocks
  };
};

export const requestBlocks = () => {
    return {
        type: REQUEST_BLOCKS
    };
};
