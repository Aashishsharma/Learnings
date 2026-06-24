# Lambda
- virtual functions
- run and pay on-demand
- scaling is automated
- lambda pricing is very cheap, hence popular
- popular usecase - serverless cron jobs (schedule AWS Eventbridge every 24 hr, which will trigger lambda), why lambda? you pay only for 10 mins (assuming job duration is 10 mins only), if we use EC2 and schedule corn job manually, we have to pay for full 24hrs, even if the job is not running, but EC2 is still up (lambda is only not recommended when batch job duration is > 15 mins or so)