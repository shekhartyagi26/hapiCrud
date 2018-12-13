const bcrypt = require('bcryptjs');

class Utility {
    async bcryptPass(password) {
        try {
            let hashpass;
            if(!password) {
                hashpass = undefined;
            }
            if (password) {
                var salt = bcrypt.genSaltSync(2);
                hashpass = await bcrypt.hashSync(password, salt);
            }
            return hashpass;
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

module.exports = new Utility();