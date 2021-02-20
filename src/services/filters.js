/*
    Filtering Service: handles lists of filters, dynamic, offline filtering.
*/

import storage from './storage';
const filters = {};
const util = {};

filters.init = async() => {

    if (!storage.ss.getFlag('filters')) {
        try {

            let response = await fetch("/api/filters/", {"method": "GET"});
            if (!response.ok) {

                throw new Error(`Network Error (ID: FILTER_${response.status})`);

            } else {
    
                const data = await response.json();
                util.parse(data);

            }
    
        } catch(e) {

            throw new Error(`Network Error (ID: FILTER_000): No Connection.`);

        }
    }
} 


filters.get = () => {

    const queryObj = util.queryObj;
    return queryObj;
}

// Here, FilterType = "Keyword" (default) or "Selection".

filters.getFilterList = async(filterType = "Keyword") => {
    return new Promise(async(resolve) => {
        const filterList = await storage.db.searchDocument('filters', {type: filterType});
        resolve(filterList);
    });
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

    storage.ss.setFlag('filters');
}





export default filters;