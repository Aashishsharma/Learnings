# Change Release automation

Purpose - To automate PCM

## Requirements

PCM requires  

1. PCM 1st and 2nd level approver - (coming from last PR approvers), 3rd level - manual PCM
2. PCM creater - PR creator
3. PCM deploy date - 24hrs from PCM approve (PCM automatically approved using this automation)
4. Change log - PR description

## Working

3 Lambda functions - (ccr-bitbucket-bamboo, ccr-github-circleci, ccr-automation)  
![alt text](PNG/PCM.PNG "Title") 
