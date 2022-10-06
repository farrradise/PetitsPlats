export default class Database {
    /**
     * 
     * @param {string} url 
     */
    constructor(url) {
        this._url = url
        if (Database.exists) {
            return Database.instance
        } 

        Database.instance = this
        Database.exists = true

        return this
    }

    async get() {
        return fetch(this._url)
            .then(res => res.json())
            .then(res => {
                return res;
            })
            .catch(err => console.log('an error occurs', err))
    }


}
