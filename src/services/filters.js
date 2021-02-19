/*
    Filtering Service: handles lists of filters, dynamic, offline filtering.
*/

import storage from './storage';
const filters = {};
const util = {};

filters.init = async() => {

    try {
        //let response = await fetch("https://api-ae.dhruv.tech/filters/", {"method": "GET"});

        let response = {
            ok: true,
            json: [
                {
                  "filter_inputs": [
                    {
                      "value_name": "Acme Seeds Inc.",
                      "value_id": [
                        "01"
                      ]
                    },
                    {
                      "value_name": "Acme Planting Ltd.",
                      "value_id": [
                        "02"
                      ]
                    },
                    {
                      "value_name": "Acme Harvesting Ltd.",
                      "value_id": [
                        "03"
                      ]
                    }
                  ],
                  "filter_name": "Companies",
                  "filter_id_name": "Comapny_id",
                  "filter_display": "Company",
                  "filter_parent": null,
                  "attach_parent": false,
                  "isFilterable": true
                },
                {
                  "filter_inputs": [
                    {
                      "value_name": "Corporate",
                      "value_id": [
                        "01",
                        "01"
                      ]
                    },
                    {
                      "value_name": "Vancouver",
                      "value_id": [
                        "01",
                        "02"
                      ]
                    },
                    {
                      "value_name": "Corporate",
                      "value_id": [
                        "02",
                        "01"
                      ]
                    },
                    {
                      "value_name": "Vancouver",
                      "value_id": [
                        "02",
                        "02"
                      ]
                    },
                    {
                      "value_name": "Victoria",
                      "value_id": [
                        "02",
                        "03"
                      ]
                    },
                    {
                      "value_name": "Victoria",
                      "value_id": [
                        "03",
                        "03"
                      ]
                    },
                    {
                      "value_name": "Prince George",
                      "value_id": [
                        "03",
                        "04"
                      ]
                    }
                  ],
                  "filter_name": "Offices",
                  "filter_id_name": "Office_id",
                  "filter_display": "Office",
                  "filter_parent": "Companies",
                  "attach_parent": true,
                  "isFilterable": true
                },
                {
                  "filter_inputs": [
                    {
                      "value_name": "Administration",
                      "value_id": [
                        "01",
                        "01",
                        "01"
                      ]
                    },
                    {
                      "value_name": "Marketing",
                      "value_id": [
                        "01",
                        "01",
                        "02"
                      ]
                    },
                    {
                      "value_name": "Sales",
                      "value_id": [
                        "01",
                        "01",
                        "03"
                      ]
                    },
                    {
                      "value_name": "Accounting",
                      "value_id": [
                        "01",
                        "01",
                        "04"
                      ]
                    },
                    {
                      "value_name": "Human Resources",
                      "value_id": [
                        "01",
                        "01",
                        "05"
                      ]
                    },
                    {
                      "value_name": "Administration",
                      "value_id": [
                        "02",
                        "01",
                        "01"
                      ]
                    },
                    {
                      "value_name": "Marketing",
                      "value_id": [
                        "02",
                        "01",
                        "02"
                      ]
                    },
                    {
                      "value_name": "Marketing",
                      "value_id": [
                        "02",
                        "01",
                        "03"
                      ]
                    },
                    {
                      "value_name": "Sales",
                      "value_id": [
                        "02",
                        "02",
                        "04"
                      ]
                    },
                    {
                      "value_name": "IT",
                      "value_id": [
                        "02",
                        "02",
                        "05"
                      ]
                    },
                    {
                      "value_name": "Service",
                      "value_id": [
                        "02",
                        "02",
                        "06"
                      ]
                    },
                    {
                      "value_name": "Administration",
                      "value_id": [
                        "03",
                        "03",
                        "01"
                      ]
                    },
                    {
                      "value_name": "Marketing & Sales",
                      "value_id": [
                        "03",
                        "03",
                        "03"
                      ]
                    },
                    {
                      "value_name": "Distribution",
                      "value_id": [
                        "03",
                        "03",
                        "04"
                      ]
                    },
                    {
                      "value_name": "Sales",
                      "value_id": [
                        "03",
                        "03",
                        "05"
                      ]
                    },
                    {
                      "value_name": "Operations",
                      "value_id": [
                        "03",
                        "04",
                        "09"
                      ]
                    }
                  ],
                  "filter_name": "Groups",
                  "filter_id_name": "Group_id",
                  "filter_display": "Group",
                  "filter_parent": "Offices",
                  "attach_parent": true,
                  "isFilterable": true
                },
                {
                  "filter_inputs": [
                    {
                      "value_name": "Vancouver",
                      "value_id": [
                        "GHHDT1H7"
                      ]
                    },
                    {
                      "value_name": "Prince George",
                      "value_id": [
                        "JGH7T"
                      ]
                    },
                    {
                      "value_name": "Kelowna",
                      "value_id": [
                        "LDFS8F3DDS"
                      ]
                    },
                    {
                      "value_name": "Victoria",
                      "value_id": [
                        "TH8LF9"
                      ]
                    }
                  ],
                  "filter_name": "Locations",
                  "filter_id_name": "Location_id",
                  "filter_display": "Physical Location",
                  "filter_parent": null,
                  "attach_parent": false,
                  "isFilterable": true
                },
                {
                  "filter_inputs": [
                    {
                      "value_name": "Agriculture",
                      "value_id": [
                        "1"
                      ]
                    },
                    {
                      "value_name": "Accounting",
                      "value_id": [
                        "2"
                      ]
                    },
                    {
                      "value_name": "Management",
                      "value_id": [
                        "3"
                      ]
                    },
                    {
                      "value_name": "Marketing & Sales",
                      "value_id": [
                        "4"
                      ]
                    }
                  ],
                  "filter_name": "Category_id",
                  "filter_id_name": "Category_id",
                  "filter_display": "Skill Category",
                  "filter_parent": null,
                  "attach_parent": false,
                  "isFilterable": true
                },
                {
                  "filter_inputs": [
                    {
                      "value_name": "Planting",
                      "value_id": [
                        "1",
                        "1"
                      ]
                    },
                    {
                      "value_name": "People Skills",
                      "value_id": [
                        "3",
                        "10"
                      ]
                    },
                    {
                      "value_name": "Conflict Resolution",
                      "value_id": [
                        "3",
                        "11"
                      ]
                    },
                    {
                      "value_name": "Work Safe",
                      "value_id": [
                        "3",
                        "12"
                      ]
                    },
                    {
                      "value_name": "Wage Negotiation",
                      "value_id": [
                        "3",
                        "13"
                      ]
                    },
                    {
                      "value_name": "Marketing",
                      "value_id": [
                        "4",
                        "14"
                      ]
                    },
                    {
                      "value_name": "Sales",
                      "value_id": [
                        "4",
                        "15"
                      ]
                    },
                    {
                      "value_name": "Customer Service",
                      "value_id": [
                        "4",
                        "16"
                      ]
                    },
                    {
                      "value_name": "Harvesting",
                      "value_id": [
                        "1",
                        "2"
                      ]
                    },
                    {
                      "value_name": "Fertilizing",
                      "value_id": [
                        "1",
                        "3"
                      ]
                    },
                    {
                      "value_name": "Irrigating",
                      "value_id": [
                        "1",
                        "4"
                      ]
                    },
                    {
                      "value_name": "Maths",
                      "value_id": [
                        "2",
                        "6"
                      ]
                    },
                    {
                      "value_name": "Financial Statements",
                      "value_id": [
                        "2",
                        "7"
                      ]
                    },
                    {
                      "value_name": "Statement Analysis",
                      "value_id": [
                        "2",
                        "8"
                      ]
                    },
                    {
                      "value_name": "Projection",
                      "value_id": [
                        "2",
                        "9"
                      ]
                    }
                  ],
                  "filter_name": "Skills",
                  "filter_id_name": "Skill_id",
                  "filter_display": "Skill",
                  "filter_parent": "Category_id",
                  "attach_parent": false,
                  "isFilterable": true
                },
                {
                  "filter_input": "text_input",
                  "filter_name": "FirstName",
                  "filter_id_name": null,
                  "filter_display": "First Name",
                  "filter_parent": null,
                  "attach_parent": false,
                  "isFilterable": true
                },
                {
                  "filter_input": "text_input",
                  "filter_name": "LastName",
                  "filter_id_name": null,
                  "filter_display": "Last Name",
                  "filter_parent": null,
                  "attach_parent": false,
                  "isFilterable": true
                },
                {
                  "filter_input": "text_input",
                  "filter_name": "Title",
                  "filter_id_name": null,
                  "filter_display": "Title",
                  "filter_parent": null,
                  "attach_parent": false,
                  "isFilterable": true
                },
                {
                  "filter_input": "date_input",
                  "filter_name": "HireDate",
                  "filter_id_name": null,
                  "filter_display": "Hire Date",
                  "filter_parent": null,
                  "attach_parent": false,
                  "isFilterable": true
                },
                {
                  "filter_input": "date_input",
                  "filter_name": "TerminationDate",
                  "filter_id_name": null,
                  "filter_display": "Termination Date",
                  "filter_parent": null,
                  "attach_parent": false,
                  "isFilterable": true
                },
                {
                  "filter_input": "numeric_input",
                  "filter_name": "YearsPriorExperience",
                  "filter_id_name": null,
                  "filter_display": "Years of Prior Experience",
                  "filter_parent": null,
                  "attach_parent": false,
                  "isFilterable": true
                },
                {
                  "filter_input": "text_input",
                  "filter_name": "Email",
                  "filter_id_name": null,
                  "filter_display": "Email Address",
                  "filter_parent": null,
                  "attach_parent": false,
                  "isFilterable": true
                },
                {
                  "filter_input": "text_input",
                  "filter_name": "WorkCell",
                  "filter_id_name": null,
                  "filter_display": "Work Cell",
                  "filter_parent": null,
                  "attach_parent": false,
                  "isFilterable": true
                },
                {
                  "filter_input": "text_input",
                  "filter_name": "WorkPhone",
                  "filter_id_name": null,
                  "filter_display": "Work Phone",
                  "filter_parent": null,
                  "attach_parent": false,
                  "isFilterable": true
                }
              ]
        }
        if (!response.ok) {
            // const msg = `Network Error (ID: FILTER_${response.status})`;
            // throw new Error(msg);
        } else {

            const data = response.json;
            util.parse(data);
        }

    } catch(e) {
        // throw new Error(`Network Error (ID: FILTER_000): No Connection.`);
        console.log(e);
    }
} 

filters.get = () => {
    // Query Builder
    return {};
}

util.parse = async(data) => {

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
    let i = [];

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
        console.log("1");
        i.push(toattach);
    }

    await storage.db.updateDocuments('filters', i);
}

export default filters;