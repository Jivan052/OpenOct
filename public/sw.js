-sw.js
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
});

// Handle push notifications
self.addEventListener('push', (event) => {
  console.log('Push notification received', event);
  
  if (!event.data) return;
  
  try {
    const data = event.data.json();
    
    const title = data.title || 'New Event Notification';
    const options = {
      body: data.body || 'Check out our latest events',
      icon: data.icon || '/logo192.png',
      badge: data.badge || '/badge.png',
      data: data.data || {},
      requireInteraction: data.requireInteraction || false
    };
    
    event.waitUntil(self.registration.showNotification(title, options));
  } catch (e) {
    // Fallback for non-JSON data
    const message = event.data.text();
    event.waitUntil(
      self.registration.showNotification('Event Notification', {
        body: message,
        icon: '/logo192.png'
      })
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked', event);
  
  event.notification.close();
  
  // Handle click action - navigate to url if provided
  if (event.notification.data && event.notification.data.url) {
    clients.openWindow(event.notification.data.url);
  } else {
    // Default to events page
    clients.openWindow('/events');
  }
});