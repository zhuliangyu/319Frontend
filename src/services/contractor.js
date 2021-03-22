import axios from 'axios';

// formats the contractor object for http request
export const formatContractor = (contractor, imageFileName) => {
    // make a deep copy
    let res = JSON.parse(JSON.stringify(contractor));
    for (let [key, value] of Object.entries(res)) {
        // delete empty fields
        if (value === "" || value === null) {
            delete res[key];
        // format dropdown items
        } else if (key === "companyCode" || key === "officeCode" || key === "groupCode" || key === "locationId" ) {
            res[key] = res[key][value.length-1]
        // format number fields
        } else if (key === "supervisorEmployeeNumber" || key === "yearsPriorExperience") {
            res[key] = parseInt(value)
        }
    }

    // update image url
    if (imageFileName !== "") {
        res["photoUrl"] = imageFileName;
    }
    return res;
}

// send addContractor request
export const addContractor = (contractor) => {
    return axios.post('/api/contractors', contractor)
        .then((response) => {
                // return response.data;
                console.log(response);
                return response;
            },
            (error) => {
                console.log(error);
                return error;
            }
        );
};