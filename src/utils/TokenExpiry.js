const TokenExpiry = {
    setLocalExpiry: function (key, value) {
        const now = new Date();
        const trefleToken = {
            token: value,
            expiry: (now.getTime() + 1000 * 60 * 60 * 24)
        }
        localStorage.setItem(key, JSON.stringify(trefleToken));
    },
    getLocalExpiry: function (key) {
        const itemStr = localStorage.getItem(key);

        if(!itemStr) return null;

        const trefleToken = JSON.parse(itemStr);
        const now = new Date();

        if (now.getTime() > trefleToken.expiry) {
            localStorage.removeItem(key)
            return null;
        }
        return trefleToken.token;
    }
}

export default TokenExpiry;