import axios from "axios";
import filters from "../../../services/filters";
import * as actions from "../constants/action-types";

export const performSearchSuccess = (results) => ({
  type: actions.PERFORM_SEARCH_SUCCESS,
  payload: {
    results,
  },
});

export const performSearchFailure = (error) => ({
  type: actions.PERFORM_SEARCH_FAILURE,
  payload: {
    error,
  },
});

export const performSearch = (value) => (dispatch) => {
  console.log(value);
  let keyword_filter = determineFilterString(value);

  let body = {
    [keyword_filter]: {
      type: null,
      values: [],
    },
  };

  if (keyword_filter == "WorkCell" || keyword_filter == "WorkPhone") {
    body[keyword_filter].values.push(value.inputValue);
  } else if (keyword_filter == "Email") {
    body[keyword_filter].values.push(value.inputValue);
  };

  // console.log(filters);
  console.log("perform search action...");
  axios
    .post("/api/search", body)
    .then(
      (response) => {
        console.log(response);
        dispatch(performSearchSuccess);
      },
      (error) => {
        console.log(error);
      }
    );
};

const determineFilterString = (value) => {
  switch (value.filter_name) {
    case "Work Cell":
      return "WorkCell";
    case "Work Phone":
      return "WorkPhone";
    case "Email":
      return "Email";
    default:
      return "";
  }
};
