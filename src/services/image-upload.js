import axios from 'axios';

/**
 * Upload image to photos api
 * @param image FormData
 * @returns {Promise<*>}
 */
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