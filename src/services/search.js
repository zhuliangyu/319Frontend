import axios from "axios";
import filters from "./filters";
import storage from "./storage";
const search = {};
const util = {};

search.postSearchResults = async(queries) => {
  console.log("search service queries? ", queries);

  const value = queries;
  const filterName = Object.keys(value)[0];
  const inputValue = value[filterName];

  if (value == null) {
    console.log("error: value is null");
  } else {
    let body =
      filterName === "name"
        ? util.createBodyForNameSearch(inputValue)
        : util.createBodyNameForNumberOrEmail(filterName, inputValue);

    // console.log('performing search action...');

    console.log(body);

    let res = await util.searchOnline(body);

    return res;
  }
};

util.searchOnline = (body) => {
  return new Promise(async(resolve) => {
    return axios.post("/api/search", body).then(
      async(response) => {
        let results = response.data.results;
        await util.saveResult(results);
        resolve(results);
      },
      (error) => {
        console.log(error);
        resolve();
      }
    );
  })
}

util.saveResult = async(results) => {
  return new Promise(async(resolve) => {
    await storage.db.clearTable('searchResults');
    if (results) {
      for (let result of results) {
        let group = await storage.db.searchDocument('metadata', {meta_id: `Group,${result.companyCode},${result.officeCode},${result.groupCode}`});
        result.groupName = group[0].value_name;
        result.skills = result.skills.toString();
        await storage.db.addDocument('searchResults', result);
      }
    }

    resolve(results);
  })
}

util.createBodyForNameSearch = (inputValue) => {
  let body = filters.get();
  if (inputValue.includes(" ")) {
    let firstName = inputValue.substring(0, inputValue.indexOf(" "));
    let lastName = inputValue.substring(inputValue.indexOf(" ") + 1);
    body.FirstName = {
      type: "AND",
      values: [firstName],
    }
    body.LastName = {
      type: "AND",
      values: [lastName],
    }

  } else {
    
    body.Name = {
      type: "AND",
      values: [inputValue]
    }
  }

  filters.clear();
  return body;
};

util.createBodyNameForNumberOrEmail = (filter_name, inputValue) => {
  let filterName = util.determineFilterString(filter_name);

  let body = filters.get();

  body[filterName] = {
    type: null,
    values: [],
  }

  if (filterName == "WorkCell" || filterName == "WorkPhone") {
    body[filterName].values.push(inputValue);
  } else if (filterName == "Email") {
    body[filterName].values.push(inputValue);
  }

  filters.clear();
  return body;
};

util.determineFilterString = (filter_name) => {
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

export default search;
