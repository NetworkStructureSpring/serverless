const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    region: "us-east-1"
});
exports.handler = function (event, context, callback) {
    
        var message = event.Records[0].Sns.Message;
        var token = event.Records[0].Sns.Subject;
        verifyUser(message,token);
};
const verifyUser= async(message,token)=>
{
    var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10',region: "us-east-1"});
    var params = {
    TableName: 'UsernameTokenTable',
    Key: {
        'Username': {S: message}
    },
    ProjectionExpression: 'Username'
    };
    const data = await ddb.getItem(params).promise();
    if (data.Item == undefined)
    {
        await sendEmail(message,token);
    }
}

const sendEmail= async(message,token)=>
{
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
    var sendPromise = new AWS.SES({ apiVersion: '2010-12-01', region: "us-east-1" });
    await sendPromise.sendEmail(params).promise();
    await addUserToDynamo(message);
}
const addUserToDynamo= async(message)=>
{
    var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10',region: "us-east-1"});
    var params = {
        TableName: 'UsernameTokenTable',
        Item: {
            'Username': {S: message}
        }
    }
    await ddb.putItem(params).promise();
}