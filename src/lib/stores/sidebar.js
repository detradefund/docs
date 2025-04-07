import { writable } from 'svelte/store';

export const sidebarOpen = writable(true);

export const sidebarItems = [
  {
    title: 'Framework',
    path: '/framework',
    icon: 'settings',
    children: [
      {
        title: 'Features',
        path: '/framework#features'
      },
      {
        title: 'Architecture',
        path: '/framework#architecture'
      },
      {
        title: 'Terminology',
        path: '/framework#terminology'
      }
    ]
  },
  // ... autres sections de la sidebar ...
]; 