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
Keys - 

## Step 2 - Send push message
