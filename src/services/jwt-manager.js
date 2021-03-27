import storage from "./storage";

const JwtManager = () => {
    const TOKEN_KEY = 'token'

    const hasToken = () => {
        return storage.ss.getPair(TOKEN_KEY) && storage.ss.getPair(TOKEN_KEY) !== ""
    }

    const getToken = () => {
        return storage.ss.getPair(TOKEN_KEY);
    }

    const setToken = (token) => {
        storage.ss.setPair(TOKEN_KEY, token);
        return true;
    };

    const resetToken = () => {
        storage.ss.setPair(TOKEN_KEY, "");
        return true;
    }

    return {
        resetToken,
        getToken,
        setToken,
        hasToken,
    }
};

export default JwtManager();