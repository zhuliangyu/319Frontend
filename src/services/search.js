import axios from "axios";
import filters from "./filters";
import storage from "./storage";

import isSubset from 'is-subset';
import { uuid } from 'uuidv4';
const search = {};
const util = {};

search.postSearchResults = async(queries, uri = null) => {
  // console.log("search service queries? ", queries);
  // console.log('uri', uri);
  if (uri == null) {
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

      // Decide Here
      

      let res = await util.searchOnline(body, value);
    }
  } else {
    let basis = await storage.ss.getPair('basisURI');
    let current = await storage.ss.getPair('currentURI');
    let evaluation = false;
    try {
      evaluation = isSubset(JSON.parse(decodeURIComponent(current)), JSON.parse(decodeURIComponent(basis)));
    } catch (error) {
      //Continue.
    }
    let res = {};
    let basisName = await storage.ss.getPair('basisName');
    let basisKeyName = await storage.ss.getPair('basisKeyName');
    if (basisName == '') basisName = "(Blank Search)";
    if ((basis === current) && (basis) && (current)) {
      let data = await storage.db.toArray('searchResults');
      res.results = data;
      res.total = data.length;

    } else if (evaluation) {
      let hist = await storage.db.toArray('searchHistory');
      if(hist.length > 0) {
        hist.pop();
      }
      let obj = {uid: uuid(), name: basisName, basisKeyName: basisKeyName, uri: encodeURIComponent(JSON.stringify(uri))}
      let newHist = util.removeDuplicateSearchHistory(obj, hist);

      // hist.push({uid: uuid(), name: basisName, uri: encodeURIComponent(JSON.stringify(uri))});
      await storage.db.clearTable('searchHistory');
      await storage.db.updateDocuments('searchHistory', newHist);
      res = await util.searchOnline(uri);
    } else {
      let hist = await storage.db.toArray('searchHistory');
      if(hist.length >= 8) {
        hist = hist.splice(0,8);
      }

      let obj = {uid: uuid(), name: basisName, basisKeyName: basisKeyName, uri: encodeURIComponent(JSON.stringify(uri))}
      let newHist = util.removeDuplicateSearchHistory(obj, hist);

      // hist.push({uid: uuid(), name: basisName, uri: encodeURIComponent(JSON.stringify(uri))});
      await storage.db.clearTable('searchHistory');
      await storage.db.updateDocuments('searchHistory', newHist);
      res = await util.searchOnline(uri);
    }
    return res;
  }
};

// add new history object
// remove duplicates
// return new history array to set db
util.removeDuplicateSearchHistory = (historyObj, history) => {
  history.push(historyObj);

  console.log('history obj uri ', JSON.parse(decodeURIComponent(historyObj.uri) ));
  let unique_arr = history.filter((v,i,a) =>
    a.findIndex(t =>
      (JSON.stringify(JSON.parse(decodeURIComponent(t.uri))) === JSON.stringify(JSON.parse(decodeURIComponent(v.uri)))))
      ===
      i
    );
  return unique_arr;
}

util.searchOnline = (body, value = {}) => {
  let searchItem = {};
  return new Promise(async(resolve) => {
    return axios.post("/api/search", body).then(
      async(response) => {
        // console.table(body);
        let results = response.data.results;
        let total = response.data.total;
        let msg = response.data.msg;
        await util.saveResult(results);
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
        // storage.ss.setPair('current_search', JSON.stringify(searchItem));
        resolve({results: results, total: total, msg: msg});
      },
      (error) => {
        console.log(error);
        resolve({ error: error });
      }
    );
  })
  .catch((err) => {
    console.log(err);
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
      try {
        for (let result of results) {
          let group = await storage.db.searchDocument('metadata', {meta_id: `Group,${result.companyCode},${result.officeCode},${result.groupCode}`});
          result.groupName = group[0].value_name;
          result.skills = result.skills.toString();
          await storage.db.addDocument('searchResults', result);
        }
      } catch(e) {
        window.location.reload();
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

util.searchOffline = (uri) => {
  /* REMOVE */
}

search.parseFilterMetaId = async (meta_id_string) => {
  const value = await storage.db.searchDocument("metadata", {meta_id: meta_id_string});
  return value[0];
};

export default search;
