/*
    Filtering Service: handles lists of filters, dynamic, offline filtering.
*/

export const filters = {};
const util = {};

filters.init = async() => {

    try {
        let response = await fetch("/api/filters", {"method": "GET"});

        if (!response.ok) {
            const msg = `Network Error (ID: FILTER_${response.status})`;
            throw new Error(msg);
        } else {

            const data = response.json;
            util.parse(data);
        }

    } catch(e) {
        throw new Error(`Network Error (ID: FILTER_000): No Connection.`);
    }
} 

filters.get = () => {
    
}

filters.apply = () => {

}

filters.reset = () => {

}