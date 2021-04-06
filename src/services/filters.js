/*
    Filtering Service: handles lists of filters, dynamic, offline filtering.
*/

import storage from './storage';
import querystring from 'querystring';
const filters = {};
const util = {};

filters.init = async() => {

    return new Promise(async(resolve, reject) => {
        if (!storage.ss.getFlag('filters')) {
            try {
    
                let response = await fetch("/api/filters/", {"method": "GET"});
                if (!response.ok) {
    
                    reject(`Network Error (ID: FILTER_${response.status})`);
    
                } else {
        
                    const data = await response.json();
                    util.parse(data);
                    resolve();
    
                }
        
            } catch(e) {
    
                reject(`Network Error (ID: FILTER_000): No Connection.`);
    
            }
        } else {
            resolve();
        }
    });
}

filters.get = () => {

    const queryObj = util.queryObj;
    return queryObj;
}

filters.getQS = (selection, attach = null, raw = []) => {
    
    return new Promise(async(resolve) => {
        let localQuueryObj = {};
        for (const e of selection) {
            let data = e.split(",");
            let filterName = data[0];
            console.log(filterName);
            let dbResult = await storage.db.searchDocument('filters', {call_name: filterName});
            console.log(dbResult);
            let filterMetadata = dbResult[0];
    
            if (!(filterName in localQuueryObj)) {
                localQuueryObj[filterName] = {
                    type: "OR",
                    values: []
                };
            }
    
            let obj = {};
            let idx = 1;
            if (filterMetadata.attach_parent == "true") {
                filterMetadata.attachment.forEach((parentId) => {
                    obj[parentId] = data[idx];
                    idx++;
                })
            }
    
            obj[filterMetadata.selection_id] = data[idx];
    
            localQuueryObj[filterName].values.push(obj);
    
        }
        localQuueryObj.meta = raw;
        if (attach != null) {
            localQuueryObj = Object.assign(localQuueryObj, attach);
        }
        let qstr = encodeURIComponent(JSON.stringify(localQuueryObj));
        resolve(qstr);
    })
    
}

// Here, FilterType = "Keyword" (default) or "Selection".

filters.getFilterList = async(filterType = "Keyword") => {
    return new Promise(async(resolve) => {
        const filterList = await storage.db.searchDocument('filters', {type: filterType});
        let i = 0;
        for (let x of filterList) {
            let metadata = await storage.db.searchDocument('metadata', {call_name: x.call_name});
            x.metadata = metadata;
            filterList[i] = x;
            i++;
        }
        resolve(filterList);
    });
}

filters.set = async(selection) => {
    console.log('filters.js selection', selection);
    return new Promise(async(resolve) => {

        for (const e of selection) {
            let data = e.split(",");
            let filterName = data[0];
            let dbResult = await storage.db.searchDocument('filters', {call_name: filterName});
            let filterMetadata = dbResult[0];
    
            if (!(filterName in util.queryObj)) {
                util.queryObj[filterName] = {
                    type: "OR",
                    values: []
                };
            }
    
            let obj = {};
            let idx = 1;
            if (filterMetadata.attach_parent == "true") {
                filterMetadata.attachment.forEach((parentId) => {
                    obj[parentId] = data[idx];
                    idx++;
                })
            }
    
            obj[filterMetadata.selection_id] = data[idx];
    
            util.queryObj[filterName].values.push(obj);
    
        }
        resolve();
    })

}

filters.clear = () => {
    util.queryObj = {};
}

filters.getChildFromAncestor = async(child_call_name, ancestorIds) => {
    let records = await storage.db.searchDocument('metadata', {call_name: child_call_name});
    let matches = records.filter(record => record.meta_id.includes(`${child_call_name},${ancestorIds.toString()}`));

    return matches;
}

// Private Helpers

util.queryObj = {};

util.parse = async(data) => {

    // Clear Exisitng Data

    await storage.db.clearTable('filters');

    // Adding to DB
    data.forEach(async(doc) => {

        let collection = {
            call_name: doc.filter_name,
            is_category: !(doc.isFilterable).toString(),
            type: (doc.filter_input != undefined) ? "Keyword":"Selection",
            input: (doc.filter_input != undefined) ? doc.filter_input.split("_")[0] : doc.filter_inputs,
            parent: doc.filter_parent,
            selection_id: doc.filter_id_name,
            attach_parent: doc.attach_parent.toString(),
            display_name: doc.filter_display
        }

        await storage.db.addDocument('filters', collection);
    });

    // attach parents

    let attachables = await storage.db.searchDocument('filters', {attach_parent: "true"});
    let updates = [];

    for (let toattach of attachables) {
        let parent = {};
        let attachments = [];
        let parent_name = toattach.parent;

       do {
            parent = await storage.db.searchDocument('filters', {call_name: parent_name});
            attachments.push(parent[0].selection_id);
            parent_name = parent[0].parent;
        } while (parent_name != null);

        attachments.reverse();

        toattach['attachment'] = attachments;
        updates.push(toattach);
    }

    await storage.db.updateDocuments('filters', updates);
    util.generateMetadata();
    storage.ss.setFlag('filters');
}

util.generateMetadata = async() => {

        await storage.db.clearTable('metadata');
        const dataset = await filters.getFilterList('Selection');
        for (let filter of dataset) {
            for (let value of filter.input) {
                let record = {};

                record.call_name = filter.call_name;
                record.display_name = filter.display_name;
                record.value_name = value.value_name;
                record.value_id = value.value_id;

                let meta_id_format = [`${filter.call_name}`];
                if (filter.attach_parent == "true") {
                    meta_id_format = meta_id_format.concat(filter.attachment);
                    record.meta_id = `${filter.call_name},${value.value_id.toString()}`
                } else {
                    record.meta_id = `${filter.call_name},${value.value_id[value.value_id.length - 1]}`
                }

                meta_id_format.push(filter.selection_id);
                record.meta_id_format = meta_id_format;

                await storage.db.addDocument('metadata', record);
            }
        }
}

export default filters;