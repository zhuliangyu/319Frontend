import axios from 'axios';

export const uploadImage = (image) => {
    return axios.post('/api/photos', image)
        .then((response) => {
                console.log(response);
                return response;
            },
            (error) => {
                console.log(error);
                return error;
            }
        );
};