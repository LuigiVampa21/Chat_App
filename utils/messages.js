const moment = require("moment");

const formatMessage = function (username, text) {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
};

module.exports = formatMessage;
