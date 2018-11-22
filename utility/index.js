const bcrypt = require('bcryptjs');

class Utility {
    async bcryptPass(password) {
        try {
            let hashpass;
            if (password) {
                var salt = bcrypt.genSaltSync(2);
                hashpass = await bcrypt.hashSync(password, salt);
            }
            return hashpass;
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }

    }

    async comparePass(password) {
        try {
            
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        }
    }
}

module.exports = new Utility();