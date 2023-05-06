export default function haldler(req: any, res: any) {
  const myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    'key=<ENTER_YOUR_LEGECY_KEY - OR - SERVER_KEY>'
  );
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    to: 'erXgEmOlDfc:APA91bHzljhMMcrqOtmd0pkDUxnErPZvS2WbgnzlmHQA9Pgw49QvP6FtXhfihi-KWXYMcB-R8sPPOQz8tPhtrXvQ1hXnkdSFfaRkOxavJ8sfpBAclf74IrCN-kCALVET92-CVdf0ZfW3',
    collapse_key: 'type_a',
    data: {
      body: 'First Notification',
      title: 'ALT App Testing',
      key_1: 'Data for key one',
      key_2: 'Hellowww',
    },
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('https://fcm.googleapis.com/fcm/send', requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => error);
}
