# SFMC
(Marketing automation tool)

Lead vs opportunity vs customer  

If there is a decision split, we use journey builder (JB) else automation studio (AS)  

![alt text](PNG/Dev-process.PNG "Title")   

## Data extensions
(Tables)  
Created under email studio / content builder  

To send emails from JB/AS with any DE as a sorce, it needs to be sendable  
Thus we need to add 1 mandatory field in DE with datatype as emailaddress (see below)  
emailaddr type should only be 1, if we need to store multiple emails, store others in text as a datatype

![alt text](PNG/DE1.PNG "Title")  

use %%dataextensionfieldname%% when sending email in bulk like  
Hey %%firstName%%  

## Automation Studio  
Entry source can be file drop (any file put to SFMC ftp) or scheduled  
Below automation gets file from FTP location (based on file-name-patter) and add that data into DE  
It maps csv headers into DE fields, we can set failuer/success email alerts to devs
![alt text](PNG/AS1.PNG "Title")  

## Journey Builder
Entry sources - DE, API (external sources can inject contacts into this JB)  
While selectind DE, we can add a filter criteria for DE rows

## Email Studio  
Subscriber in ES  
1. Status - Active/In-active
2. key = email addr
3. profile attributes - frstNm/ lastNM  

Customers can change profile attributes when they click on settings in email send vai SFMC
![alt text](PNG/ES1.PNG "Title") 
![alt text](PNG/ES2.PNG "Title") 

## My project
Webinar email campaign  
1. Send Webinar details
2. Send reminder emails after X days
3. Send thank you email after registration complete
4. Thank you email for attending