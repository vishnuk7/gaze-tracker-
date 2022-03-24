const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    myPing() {
      ipcRenderer.send('ipc-example', 'ping');
    },
    datacsv() {
      ipcRenderer.send('data-csv', 'data-csv');
    },
    savecsv(objectList) {
      ipcRenderer.send('save-csv', objectList);
    },
    on(channel, func) {
      const validChannels = ['ipc-example', 'data-csv', 'save-file'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example', 'data-csv', 'save-file'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    }
  }
});
