export async function handler(event, context,callback) {
    console.log("EVENT: \n" + JSON.stringify(event, null, 2))
    var message = event.Records[0].Sns.Message;
    console.log('Message received from SNS:', message);
    return context.logStreamName
  }