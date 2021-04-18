
const notifyMe = (message: string) => {
  const notificationOptions = { body:message, icon: `https://robohash.org/${message}.png` };
  const notificationTitle = "Message Received";

  if (!("Notification" in window)) {
    alert("Your browser do not support notifications!");
  }
  else if (Notification.permission === "granted") {
    const notification = new Notification(notificationTitle, notificationOptions);
    setTimeout(() => notification.close(),10000);
  }
  else if (Notification.permission !== "denied") {
    Notification.requestPermission((permission) => {
      if (permission === "granted") {
        const notification = new Notification(notificationTitle, notificationOptions);
        setTimeout(() => notification.close(),10000);
      }
    });
  }
}

export default notifyMe;