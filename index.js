const AWS = require('aws-sdk');
exports.handler = function (event, context, callback) {
    
        var message = event.Records[0].Sns.Message;
        var token = event.Records[0].Sns.Subject;
        console.log('Message received from SNS:', message);
        console.log('Message received from SNS:', token);
        callback(null, "Success");
        const SES_CONFIG = {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
            region: 'us-east-1',
        };

        const AWS_SES = new AWS.SES(SES_CONFIG);

        let sendEmail = (recipientEmail, name) => {
            let params = {
            Source: 'sonali@prod.sonalisingh30.me',
            Destination: {
                ToAddresses: [
                    message
                ],
            },
            ReplyToAddresses: [],
            Message: {
                Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: 'This is the body of my email!',
                },
                },
                Subject: {
                Charset: 'UTF-8',
                Data: `Hello, ${message}!`,
                }
            },
            };
            return await AWS_SES.sendEmail(params).promise();
        };    
};
module.exports = {
    sendEmail
  };