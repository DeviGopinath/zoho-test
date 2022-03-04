const connection = require("../model/dbService");

const query = require("../queries/query");

let instance = null;
class Controller {
    static getDbServiceInstance() {
        return instance ? instance : new Controller();
    }

    async insertData(data) {
        try {
            const response = await new Promise((resolve, reject) => {
                const name = data.name;
                const phone = data.phone;
                const email = data.email;
                connection.query(
                    query.query4,
                    [name, phone, email],
                    (err, result) => {
                        if (err) reject(new Error(err.message));

                        resolve(result);
                    }
                );
            });

            return response !== 0 ? true : false;
        } catch (error) {
            console.log("error in write", error);
            return false;
        }
    }

    async getData() {
        try {
            const response = await new Promise((resolve, reject) => {
                connection.query(query.query1, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.rows);
                });
            });

            return response;
        } catch (error) {
            console.log("error in reading base data", error);
            return false;
        }
    }

    async getAuth(data) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `select password from credentials where email='${data}';`;
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    //console.log(result.rows);
                    resolve(result);
                });
            });
            return response;
        } catch (error) {
            console.log("login failed", error);
            return false;
        }
    }

    async userExist(data) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `select * from credentials where email='${data}';`;
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return response;
        } catch (error) {
            console.log("query failed", error);
            return false;
        }
    }
    async insertNewUser(username, password, secretcode) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = `insert into credentials(email,password,secretcode)  values('${username}','${password}','${secretcode}') returning *;`;
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return response;
        } catch (error) {
            console.log("query failed", error);
            return false;
        }
    }
}

module.exports = Controller;
