const axios = require('axios');

const sendMessage = (message) => {
  console.log(message);
  return axios({
    method: 'POST',
    url: process.env.WEBHOOK_URL,
    data: message,
    json: true,
  });
};

const processRecord = (record) => {
  const subject = record.Sns.Subject;
  const message = JSON.parse(record.Sns.Message);
  return sendMessage({
    text: subject,
    attachments: [{
      text: message.NewStateReason,
      fields: [{
        title: 'Time',
        value: message.StateChangeTime,
        short: true,
      }, {
        title: 'Alarm',
        value: message.AlarmName,
        short: true,
      }, {
        title: 'Account',
        value: message.AWSAccountId,
        short: true,
      }, {
        title: 'Region',
        value: message.Region,
        short: true,
      }],
    }],
  });
};

module.exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(`event received: ${JSON.stringify(event)}`);
  Promise.all(event.Records.map(processRecord))
    .then(() => callback(null))
    .catch((err) => {
      console.log('Error', err);
      callback(err);
    });
};
