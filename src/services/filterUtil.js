export const getCompaniesFromFilters = (filterList) => {
    let companies = filterList.filter(filter => filter.call_name === "Company");
    return companies[0].input;
}

export const getOfficesFromCompany = (filterList, company) => {
    let offices = filterList.filter(filter => filter.call_name === "Office")
    return offices[0].input.filter(input => (input.value_id[0] === company[0]));
}

export const getGroupsFromLocation = (filterList, location) => {
    let groups = filterList.filter(filter => filter.call_name === "Group");
    return groups[0].input.filter(input =>
        (input.value_id[0] === location[0]) && (input.value_id[0] === location[0]))
}

export const getLocationsFromFilters = (filterList) => {
    let locations = filterList.filter(filter => filter.call_name === "Location");
    return locations[0].input;
}