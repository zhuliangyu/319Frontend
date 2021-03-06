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

  if (Object.keys(value).length === 0) {
    let body = filters.get();
    let res = await util.searchOnline(body, value);

    return res;
  } else {
    let body =
      filterName === "name"
        ? util.createBodyForNameSearch(inputValue)
        : util.createBodyNameForNumberOrEmail(filterName, inputValue);

    // console.log('performing search action...');

    let res = await util.searchOnline(body, value);

    return res;
  }
};

util.searchOnline = (body, value) => {
  let searchItem = {};
  return new Promise(async(resolve) => {
    if (Object.keys(value).length === 0) {
      console.log('empty_search detected');
      return resolve({ results: [], total: 0, error: 'empty_search' });
    }
    return axios.post("/api/search", body).then(
      async(response) => {
        let results = response.data.results;
        let total = response.data.total;
        await util.saveResult(results);
        // console.log("value", value);
        if (Object.keys(value).length !== 0) {
          searchItem = {
            keyword: value,
            filterObject: body,
          }
        } else {
          searchItem = {
            filterObject: body,
          }
        }
        storage.ss.setPair('current_search', JSON.stringify(searchItem));
        resolve({results: results, total: total, error: 'no_error'});
      },
      (error) => {
        console.log(error);
        resolve({ results: [], total: 0, error: 'server_error', message: error });
      }
    );
  })
  .then((res) => {
    window.dispatchEvent(new Event('update_search'));

    // TODO: handle null searches
    // Update search history if unique search
    let search_history = JSON.parse(storage.ls.getPair('searchHistory'));
    search_history.push(searchItem);
    let search_history_serialized = search_history.map(e => JSON.stringify(e));
    let search_history_serialized_set = new Set(search_history_serialized);
    let unique_search_history = [...search_history_serialized_set];
    const unique_arr = unique_search_history.map(e => JSON.parse(e));
    // console.log(unique_arr);

    storage.ls.setPair('searchHistory', JSON.stringify(unique_arr));

    return res;
  });
}

search.detectType = (input) => {

  let regexp = /\S+@\S+\.\S+/;
  if (regexp.test(String(input).toLowerCase())) {
    return "Email";
  }

  regexp = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
  if (regexp.test(String(input).toLowerCase())) {
    return "WorkCell";
  }

  return 'Name';
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

  if (filterName === "WorkCell" || filterName === "WorkPhone") {
    body[filterName].values.push(inputValue);
  } else if (filterName === "Email") {
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

// Create filter chips

search.parseFilter = async (searchObj) => {
  let search_params = JSON.parse(searchObj);
  let filter_chips = [];
  if (search_params !== null && search_params !== undefined) {
    const filter_object = search_params.filterObject;
    for (let call_name of Object.keys(filter_object)) {
      if (call_name !== 'Name' && call_name !== 'WorkCell' && call_name !== 'WorkPhone' && call_name !== 'Email') {
        for (let i = 0; i < Object.keys(filter_object[call_name].values).length; i++) {
          let value_strings = [];
          let valueKeys = Object.keys(filter_object[call_name].values[i]);
          for (let valueKey of valueKeys) {
            value_strings.push(filter_object[call_name].values[i][valueKey]);
          }
          const meta_id_value = await util.parseFilterMetaId(`${call_name},${value_strings.join()}`);
          filter_chips.push(meta_id_value);
        }
      }
    }
  }
  return filter_chips;
};

util.parseFilterMetaId = async (meta_id_string) => {
  const value = await storage.db.searchDocument("metadata", {meta_id: meta_id_string});
  return value[0];
};

export default search;
