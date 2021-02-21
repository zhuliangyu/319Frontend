import axios from 'axios';

const search = {};
const util = {};

export const postSearchResults = (queries) => {
  console.log('search service queries? ', queries);

  // not accurate, need to get ALL values including those from filter?

  const value = queries;
  const filterName = Object.keys(value)[0];
  const inputValue = value[filterName];

  if (value == null) {
    console.log('error: value is null');
  } else {
    let body =
      filterName == 'name'
        ? createBodyForNameSearch(inputValue)
        : createBodyNameForNumberOrEmail(filterName, inputValue);

    console.log('performing search action...');

    console.log(body);

    return axios.post('/api/search', body)
      .then((response) => {
        return response.data;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
};

const createBodyForNameSearch = (inputValue) => {
  let body = {};
  if (inputValue.includes(" ")) {
    let firstName = inputValue.substring(
      0,
      inputValue.indexOf(" ")
    );
    let lastName = inputValue.substring(
      inputValue.indexOf(" ") + 1
    );
    let firstNameObj = {
      FirstName: {
        type: "AND",
        values: [firstName],
      },
    };
    let lastNameObj = {
      LastName: {
        type: "AND",
        values: [lastName],
      },
    };
    body = { firstNameObj, lastNameObj };
  } else {
    let nameObj = {
      Name: {
        type: "AND",
        values: [inputValue],
      },
    };
    body = nameObj;
  }

  return body;
};

const createBodyNameForNumberOrEmail = (filter_name, inputValue) => {
  let filterName = determineFilterString(filter_name);
  let body = {
    [filterName]: {
      type: null,
      values: [],
    },
  };

  if (filterName == "WorkCell" || filterName == "WorkPhone") {
    body[filterName].values.push(inputValue);
  } else if (filterName == "Email") {
    body[filterName].values.push(inputValue);
  }
};

const determineFilterString = (filter_name) => {
  switch (filter_name) {
    case "workCell":
      return "WorkCell";
    case "workPhone":
      return "WorkPhone";
    case "email":
      return "Email";
    default:
      return "";
  }
};
