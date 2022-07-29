# WebPush notifications

Demo link -  
<https://webpushnotifications.herokuapp.com/>  
<https://notificationconsole.herokuapp.com/>

## Purpose -

Send notifications to user without getting any details of the user (phone/email/install a app), just one consent and you can send the notifcations.  
Re-engage with first time visitors (leeds) of the site  

### Working of Web Push

1. Adding the client side logic to subscribe a user to push. (Client side)
2. Send a push message from backend server to push servers (Google/Firefox)
3. The service worker JavaScript file that will receive a "push event" when the push arrives on the device.

## Step 1 - Client side

1. Get permission to push message
2. Get subscription details
3. Send subscription details to backend server

```javascript
//show popup
Notification.permission !== "granted" && Notification.permission !== "denied"
//ask permission
Notification.requestPermission(function(result) {resolve(result)});
// register service worker
navigator.serviceWorker.register('service-worker.js').then((pushSubscription) => {
//set applicationserverkey then send the subscription data to backend
sendSubscriptionToBackEnd(pushSubscription, selectedCategories);
})
```

The application server keys, also known as VAPID keys, are unique to your server. They allow a push service to know which application server subscribed a user and ensure that it's the same server triggering the push messages to that user.  

#### Push subscription format  

```json
{
  "endpoint": "https://random-push-service.com/some-kind-of-unique-id-1234/v2/",
  "keys": {
    "p256dh": "BNcRdreALRFXTkOOUHK1EtK2wtaz5Ry4YfYCA_0QTpQtUbVlUls0VJXg7A8u-Ts1XbjhazAkj7I99e8QcYP7DkM=",
    "auth": "tBHItJI5svbpez7KI4CCXg=="
  }
}
```

Endpoint - unique to each user  
Keys - the message which we send to the push servers needs to be encrypted, only browser should be able to see the message, so the browser generates the public-private key, we get this public key, using which we can encrypt the message, and only browser has the private key.

## Step 2 - Send push message

1. Using web-push nodejs library  

```javascript
webpush.sendNotification(subscription, dataToSend).then()
```

A push service receives a network request, validates it and delivers a push message to the appropriate browser. If the browser is offline, the message is queued until the the browser comes online.  

## Step 3 - Display push message

This code is present in the service worker which has certain events that gets triggered when the push servers send notification to the browser

```javascript
self.addEventListener('push', function(event) {
 // event.data has data sent from our server
 self.registration.showNotification(title,options)
 // option includes
 const options = {
      body: data.message,
      badge: '/principal-logo.png',
      icon: '/principal-logo.png'
 }
}

//another event
self.addEventListener('notificationclick', function(event) {}
```

Service worker -  
A service worker is a script that runs independently in the browser background. On the user side, it can intercept its network requests and decide what to load  
Stored as js file in backend server and on ui relative path is given of that file while regestring SW

### In our app -

1. Used GTM to add the pop-up and permissions (client-side step) js file on p.com  
2. We also had a backend cron job to ensure that the notification is delieverd for failed user -
When we call **webpush.sendNotification()** func, in promise it returns failed/delieverd status to push servers, so we track the failed messages and re-send them at a later stage in cron job  
3. Used Auth0 for auth
