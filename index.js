const AWS = require('aws-sdk');
exports.handler = function (event, context, callback) {
    
        var message = event.Records[0].Sns.Message;
        var token = event.Records[0].Sns.Subject;
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
            region: "us-east-1"
        });
    
        var params = {
            Destination: {
              ToAddresses: [
                message
              ]
            },
            Message: {
              Body: { 
                Html: {
                 Charset: "UTF-8",
                 Data: "Let's verify your email so you can start using other services "+token
                }
               },
               Subject: {
                Charset: 'UTF-8',
                Data: 'Verify Cloud Assignment-9'
               }
              },
            Source: "sonali@prod.sonalisingh30.me"
    };
    var sendPromise = new AWS.SES({apiVersion: '2010-12-01', region: "us-east-1"}).sendEmail(params).promise();
    sendPromise.then(
      function(data) {
        console.log(data.MessageId);
      }).catch(
        function(err) {
        console.error(err, err.stack);
      });
};
