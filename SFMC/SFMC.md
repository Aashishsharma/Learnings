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

You can create DE from scratch / form other DE (aka filtered DE)

## Automation Studio  
Entry source can be file drop (any file put to SFMC ftp) or scheduled  
Below automation gets file from FTP location (based on file-name-patter) and add that data into DE  
It maps csv headers into DE fields, we can set failuer/success email alerts to devs
![alt text](PNG/AS1.PNG "Title")    
In AS we can run SQL queries on DE  


## Journey Builder
Entry sources - DE, API (external sources can inject contacts into this JB), Salesforce (SF)  
WHen SF is entry source - use case - (when a case in SF is closed, send email from SFMC)  
1. Entry source - SF
2. Select obj - case
3. add filters - select attribute = case, status = closed
4. Entry source configured, send email  

![alt text](PNG/JB1.PNG "Title") 

While selecting DE, we can add a filter criteria for DE rows

## Email Studio  
Subscriber in ES  
1. Status - Active/In-active
2. key = email addr
3. profile attributes - frstNm/ lastNM  

Customers can change profile attributes when they click on settings in email send vai SFMC
![alt text](PNG/ES1.PNG "Title") 
![alt text](PNG/ES2.PNG "Title") 

## Marketing cloud connect
Connect with Salesforce CRM  
Steps  
1. Install the managed package
2. in Salesforce configure user page layout to add SFMC user details
3. in SFMC under user setting -> saleforce integration -> connect account -> login to salesforce -> connection successful
4. Create API user in SFMC (while creating user in SFMC, we have option to select API user)
5. Assign admin and SFMC admin roles to the api user
6. 

## My project
Webinar email campaign  
1. Send Webinar details
2. Send reminder emails after X days
3. Send thank you email after registration complete
4. Thank you email for attending