import axios from 'axios';

export const getProfileResults = (employeeID) => {
        return axios.get('/api/employees/' + employeeID)
            .then((response) => {
                    return response.data;
                    console.log(response);
                },
                (error) => {
                    console.log(error);
                }
            );
};