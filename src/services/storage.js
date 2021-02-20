/*
    Storage Service: handles IndexedDB and SessionStorage.
*/

import Dexie from 'dexie';

// Exportable Object
const storage = {};
storage.db = {};
storage.ss = {};

// IndexedDB

const idb = new Dexie('AE_Directory');
idb.version(1).stores({
    filters: `++_uuid, display_name, call_name, type, input, parent, attach_parent, is_category, selection_id, attachment`
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
    sessionStorage.setItem(key, true);
}

storage.ss.getFlag = (key) => {
    const res = sessionStorage.getItem(key);
    return (res === 'true');
}



export default storage;