export const handler  =async(event, context, callback) =>{
    console.log('Sonali I am here!!');
        var message = event.Records[0].Sns.Message;
        console.log('Message received from SNS:', message);
        callback(null, "Success");
    }