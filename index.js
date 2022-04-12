exports.handler = function(event, context, callback) {
    // console.log('Received event:', JSON.stringify(event, null, 4));
    
        var message = event.Records[0].Sns.Message;
        var token = event.Records[0].Sns.Subject;
        console.log('Message received from SNS:', message);
        console.log('Message received from SNS:', token);
        callback(null, "Success");
    };