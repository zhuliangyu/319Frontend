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
idb.version(5).stores({
    filters: `++_uuid, display_name, call_name, type, input, parent, attach_parent, is_category, selection_id, attachment`,
    metadata: `++_uuid, call_name, selection, meta_id_format, meta_id`,
    searchResults: `++_uuid, employeeNumber, companyCode, officeCode, groupCode, locationId, supervisorEmployeeNumber, lastName, firstName, employmentType, title, hireDate, terminationDate, yearsPriorExperience, email, workPhone, workCell, isContractor, skills, supervisor`,
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
    return new Promise (async(resolve) => {
        await idb[table].bulkPut(docs);
        resolve();
    });
}

storage.db.clearTable = async(table) => {
    await idb[table].clear();
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