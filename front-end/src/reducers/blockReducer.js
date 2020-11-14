import {
  RECEIVE_BLOCKS, REQUEST_BLOCKS
} from "../actions/types";
import {getTreeFromFlatData} from "react-sortable-tree";
const isEmpty = require("is-empty");
const initialState = {
  blocks: [],
  retrievingBlocks: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case REQUEST_BLOCKS:
      return {
          ...state,
          retrievingBlocks: true
      }
    case RECEIVE_BLOCKS:
      return {
        ...state,
        blocks: [action.blocks],
        retrievingBlocks: false
      };

    default:
      return state;
  }
}
