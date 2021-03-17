import axios from 'axios';

export const getProfilePicture = (employeeID) => {
    return axios.get('/api/photos/' + employeeID)
        .then((response) => {
                return response.data;
            },
            (error) => {
                console.log(error);
            }
        );
};