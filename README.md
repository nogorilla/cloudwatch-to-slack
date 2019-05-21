# Send CloudWatch Alarms to Slack with AWS Lambda

## Slack setup

1. Start by setting up an incoming webhook integration in your Slack workspace: https://my.slack.com/services/new/incoming-webhook/
2. Select a channel or create a new one
3. Click on *Add Incoming WebHooks integration*
4. You are redirected to a new page where you can see your *Webhook URL*. Copy the value; you will need it soon.

## AWS setup

1. Install serverless `npm i -g serverless`
2. Add configuration value with WEBHOOK_URL, security groups, and subnets
3. Deploy `sls deploy`