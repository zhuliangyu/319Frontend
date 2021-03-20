import axios from 'axios';
import storage from './storage';

export const getProfileResults = async(employeeID) => {
        return axios.get('/api/employees/' + employeeID)
            .then(async(response) => {
                let result = response.data;
                let group = await storage.db.searchDocument('metadata', {meta_id: `Group,${result.companyCode},${result.officeCode},${result.groupCode}`});
                let office = await storage.db.searchDocument('metadata', {meta_id: `Office,${result.companyCode},${result.officeCode}`});
                result.groupName = group[0].value_name;
                result.officeName = office[0].value_name;
                return result;
                console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );
};