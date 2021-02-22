/*
*
*  Path to PWA based of Push notifications codelab
*  Copyright 2021 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

'use strict';

const applicationServerPublicKey = 'YOUR PUBLIC API KEY HERE https://web-push-codelab.glitch.me/';

let isSubscribed = false;
let swRegistration = null;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push are supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('👷 registered', swReg);
    subscribeUser(); 
  })
  .catch(function(error) {
    console.error('👷 Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

function subscribeUser() {
  navigator.serviceWorker.ready.then(function(swRegistration) {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    })
    .then(function(subscription) {
      console.log('User is subscribed.');

      updateSubscriptionOnServer(subscription);

      isSubscribed = true;
    })
    .catch(function(error) {
      console.error('Failed to subscribe the user: ', error);
    });
  });
}

function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  if (subscription) {
    console.log(JSON.stringify(subscription));
  }
}