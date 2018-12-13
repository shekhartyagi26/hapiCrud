/**
  createdBy : shravan pal
*/

const Error = require('./errors');

var apiHandler = function(req, res, data) {
    var status = "success";
    res.response({
      status,
      data
    });
}

module.exports = apiHandler;
