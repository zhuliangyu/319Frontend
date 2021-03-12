// TODO: unit test
/**
 * Get company filters from a list of filter
 * @param filterList
 * @returns []input of company filters
 */
export const getCompaniesFromFilters = (filterList) => {
    let companies = filterList.filter(filter => filter.call_name === "Company");
    return companies[0].input;
}

/**
 * Get corresponding office filters from a list of filter and a given company code
 * @param filterList
 * @param company: company code [], should only have one member
 * @returns []input of office filters
 */
export const getOfficesFromCompany = (filterList, company) => {
    let offices = filterList.filter(filter => filter.call_name === "Office")
    return offices[0].input.filter(input => (input.value_id[0] === company[0]));
}

/**
 * Get corresponding group filters from a list of filter and a given group code
 * @param filterList
 * @param location: location code [], length should be 2
 * @returns []input of group filters
 */
export const getGroupsFromOffice = (filterList, location) => {
    let groups = filterList.filter(filter => filter.call_name === "Group");
    let results =  groups[0].input.filter(input =>
        (input.value_id[0] === location[0]) && (input.value_id[1] === location[1]));
    return results;
}

/**
 * Get location filters from a list of filter
 * @param filterList
 * @returns []input of company filters
 */
export const getLocationsFromFilters = (filterList) => {
    let locations = filterList.filter(filter => filter.call_name === "Location");
    return locations[0].input;
}