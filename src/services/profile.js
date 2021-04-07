import axios from 'axios';
import storage from './storage';

export const getProfileResults = async(employeeID) => {
        return axios.get('/api/employees/' + employeeID)
            .then(async(response) => {
                try {
                    let result = response.data;
                    let group = await storage.db.searchDocument('metadata', {meta_id: `Group,${result.companyCode},${result.officeCode},${result.groupCode}`});
                    let office = await storage.db.searchDocument('metadata', {meta_id: `Office,${result.companyCode},${result.officeCode}`});
                    let company = await storage.db.searchDocument('metadata', {meta_id: `Company,${result.companyCode}`});
                    let loc = await storage.db.searchDocument('metadata', {meta_id: `Location,${result.locationId}`});
                    result.groupName = group[0].value_name;
                    result.officeName = office[0].value_name;
                    result.companyName = company[0].value_name;
                    result.locationName = loc[0].value_name;
                    return result;
                    console.log(response);
                } catch (error) {
                    window.location.reload();
                }
                
                },
                (error) => {
                    console.log(error);
                }
            );
};