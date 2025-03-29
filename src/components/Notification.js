import Notify from 'devextreme/ui/notify';
export const Notification = (message, type) => {
  Notify({
    message: message,
    type: type,
    height: 45,
    width: 300,
    minWidth: 150,
    displayTime: 3500,
    position: {
      at: 'top right',
      my: 'top right',
      offset: '-30 50',
    },
  });
};