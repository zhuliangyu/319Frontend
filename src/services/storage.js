/*
    Storage Service: handles IndexedDB and SessionStorage.
*/

import Dexie from 'dexie';

// Exportable Object
const storage = {};
storage.db = {};
storage.ss = {};
storage.ls = {};

// IndexedDB

const idb = new Dexie('AE_Directory');
idb.version(103).stores({
    filters: `++_uuid, display_name, call_name, type, input, parent, attach_parent, is_category, selection_id, attachment`,
    metadata: `++_uuid, call_name, value_name, meta_id_format, meta_id, display_name`,
    searchResults: `++_uuid, employeeNumber, companyCode, officeCode, groupCode, locationId, supervisorEmployeeNumber, lastName, firstName, employmentType, title, hireDate, terminationDate, yearsPriorExperience, email, workPhone, workCell, isContractor, skills, supervisor`,
    pinnedProfiles: `employeeNumber, title, groupName, lastName, firstName, status`,
    viewHistory: `employeeNumber, title, groupName, lastName, firstName, email, workCell`,
    
    searchHistory: `uid, timestamp, name, basisKeyName, url`,
});

storage.db.addDocument = async(table, doc) => {
    await idb[table].add(doc);
}

storage.db.searchDocument = async(table, doc) => {
    return new Promise (async(resolve) => {
        let data = await idb[table].where(doc).toArray();
        resolve(data);
    });
}

storage.db.updateDocuments = async(table, docs) => {
    // console.table(docs);
    return new Promise (async(resolve) => {
        await idb[table].bulkPut(docs);
        resolve();
    });
}

storage.db.clearTable = async(table) => {
    await idb[table].clear();
}

storage.db.toArray = async(table) => {
    return new Promise(async(resolve) => {
        let data = await idb[table].toArray();
        resolve(data);
    });
}

storage.db.delete = async(table, key) => {
    return new Promise(async(resolve) => {
        let data = await idb[table].delete(key);
        resolve(data);
    });
}

// Session Storage

storage.ss.setFlag = (key) => {
    sessionStorage.setItem(`_${key}Flag`, true);
}

storage.ss.getFlag = (key) => {
    const res = sessionStorage.getItem(`_${key}Flag`);
    return (res === 'true');
}

storage.ss.setPair = (key,value) => {
    sessionStorage.setItem(key, value);
}

storage.ss.getPair = (key) => {
    const res = sessionStorage.getItem(key);
    return res;
}

storage.ls.setPair = (key,value) => {
    localStorage.setItem(key, value);
}

storage.ls.getPair = (key) => {
    const res = localStorage.getItem(key);
    return res;
}


export default storage;