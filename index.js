const AWS = require('aws-sdk');
exports.handler = function (event, context, callback) {
    
        var message = event.Records[0].Sns.Message;
        var token = event.Records[0].Sns.Subject;
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
            region: "us-east-1"
        });
        sendEmail(message, token, "This is the body of email","sonali@prod.sonalisingh30.me");
};
exports.sendEmail = async(to, subject, message, from) => {
    const params = {
        Destination: {
            ToAddresses: [to]
        },
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: message
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject
            }
        },
        ReturnPath: from ,
        Source: from 
    };
    const ses = new AWS.SES({ apiVersion: '2010-12-01', region: 'us-east-1' });
    ses.sendEmail(params);
};
