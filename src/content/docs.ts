export type DocImageData = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
};

export type DocSection = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
  orderedList?: string[];
  code?: string;
  image?: DocImageData;
};

export type DocArticle = {
  slug: string;
  title: string;
  description: string;
  readTime: string;
  coverImage?: DocImageData;
  sections: DocSection[];
};

export const docArticles: DocArticle[] = [
  {
    slug: 'complete-fcm-testing-guide',
    title: 'Complete Guide to Testing FCM Push Notifications',
    description:
      'Learn how to test Firebase Cloud Messaging (FCM) HTTP v1 push notifications end-to-end using TestFCM.in — from project setup to delivery on real devices.',
    readTime: '12 min read',
    coverImage: {
      src: '/images/docs/testfcm-home.jpg',
      alt: 'Hand holding a smartphone with push notifications visible on the screen',
      caption: 'Push notifications arrive on Android and iOS through Firebase Cloud Messaging',
      width: 1200,
      height: 800,
    },
    sections: [
      {
        paragraphs: [
          'Firebase Cloud Messaging (FCM) is Google\'s cross-platform messaging service for sending push notifications to Android, iOS, and web clients. Since Google deprecated the Legacy HTTP API, all new integrations must use the FCM HTTP v1 API, which uses OAuth 2.0 access tokens instead of server keys.',
          'TestFCM.in is a free online tool that lets mobile developers send test notifications without building a backend. This guide walks through the entire workflow so you can verify that your app receives pushes correctly before shipping to production.',
        ],
      },
      {
        heading: 'What you need before you start',
        list: [
          'A Firebase project with Cloud Messaging enabled',
          'Google Cloud SDK (gcloud) installed for OAuth tokens, or another way to obtain a short-lived access token',
          'A physical device or emulator with your app installed and FCM configured',
          'The FCM registration token (device token) from your app logs',
        ],
      },
      {
        heading: 'Step 1: Confirm your Firebase project',
        paragraphs: [
          'Open the Firebase Console and select your project. Under Project settings → General, copy the Project ID — not the project number. The Project ID is used in the HTTP v1 endpoint URL: https://fcm.googleapis.com/v1/projects/{project-id}/messages:send.',
          'Ensure Cloud Messaging is enabled. For Android, your app needs google-services.json. For iOS, upload your APNs key or certificate. For web, configure the Firebase web app and service worker if you use background messages.',
        ],
        image: {
          src: '/images/docs/firebase-cloud.jpg',
          alt: 'Cloud server infrastructure powering Firebase and Google Cloud services',
          caption: 'FCM runs on Google Cloud — enable the Firebase Cloud Messaging API in your project',
        },
      },
      {
        heading: 'Step 2: Generate an OAuth access token',
        paragraphs: [
          'HTTP v1 requires a Bearer token from Google OAuth — typically from the gcloud CLI. Run gcloud auth login, then gcloud auth application-default login, then gcloud auth print-access-token. The token usually starts with ya29. and expires after about an hour.',
          'Important: never paste your FCM device token (often starting with APA91) into the Access Token field. The device token identifies the recipient; the OAuth token authorizes your server (or TestFCM proxy) to call Google\'s API.',
        ],
        code: 'gcloud auth login\ngcloud auth application-default login\ngcloud auth print-access-token',
        image: {
          src: '/images/docs/gcloud-token.jpg',
          alt: 'Terminal window with source code representing gcloud CLI authentication',
          caption: 'Use gcloud auth print-access-token to generate a short-lived OAuth Bearer token',
        },
      },
      {
        heading: 'Step 3: Get the device registration token',
        paragraphs: [
          'In your app, call FirebaseMessaging.getToken() (Android/Kotlin), Messaging.messaging().token (iOS/Swift), or getToken() from the Firebase JS SDK. Log the token during development and paste it into TestFCM\'s Device Token field.',
          'Tokens can change when the app is reinstalled, app data is cleared, or FCM rotates keys. If a send succeeds but nothing appears on the device, generate a fresh token and try again.',
        ],
        image: {
          src: '/images/docs/push-notification.jpg',
          alt: 'Mobile phone user checking app notifications and alerts',
          caption: 'Each device and app install receives a unique FCM registration token',
        },
      },
      {
        heading: 'Step 4: Send a test notification on TestFCM.in',
        paragraphs: [
          'Fill in Project ID, Access Token, Device Token, Title, and Message on the home page. Click Send Notification. TestFCM forwards the request through a server-side proxy to avoid browser CORS restrictions.',
          'Optional fields include click action URL, image URL, and a JSON data payload. All values in the data object must be strings for HTTP v1 — TestFCM converts them automatically.',
        ],
        image: {
          src: '/images/docs/testfcm-form.jpg',
          alt: 'Developer writing code on a laptop to integrate FCM HTTP v1 API',
          caption: 'Configure Project ID, OAuth token, and device token in the TestFCM send form',
          width: 1200,
          height: 800,
        },
      },
      {
        heading: 'Step 5: Verify delivery',
        list: [
          'Foreground: your app may show an in-app handler instead of a system notification',
          'Background: check the notification tray (Android) or Notification Center (iOS)',
          'Data-only messages: handled in onMessageReceived / application:didReceiveRemoteNotification',
          'Check Logcat or Xcode console for FCM callbacks and errors',
        ],
      },
      {
        heading: 'Saving and re-testing requests',
        paragraphs: [
          'Use Save Locally to store a named request in your browser. Sign in with Google to sync saved requests across devices via Firebase. Legacy saves that used Server Keys cannot be resent — re-save with HTTP v1 credentials if you see a "Re-save required" badge.',
        ],
      },
    ],
  },
  {
    slug: 'http-v1-setup',
    title: 'FCM HTTP v1 Setup for Firebase Projects',
    description:
      'How to configure Firebase Cloud Messaging HTTP v1, enable required APIs, and prepare credentials for sending push notifications.',
    readTime: '8 min read',
    coverImage: {
      src: '/images/docs/firebase-cloud.jpg',
      alt: 'Cloud server racks in a data center running Google Cloud and Firebase services',
      caption: 'Enable the Firebase Cloud Messaging API in Google Cloud Console',
      width: 1200,
      height: 800,
    },
    sections: [
      {
        paragraphs: [
          'Google retired the FCM Legacy HTTP API (server key + fcm.googleapis.com/fcm/send). New and existing projects should migrate to HTTP v1, which offers better security, error reporting, and platform-specific message options.',
        ],
      },
      {
        heading: 'Enable Firebase Cloud Messaging API',
        paragraphs: [
          'In Google Cloud Console, open APIs & Services → Library and enable "Firebase Cloud Messaging API". In Firebase Console → Project settings → Cloud Messaging, confirm your sender ID and app configurations are present.',
        ],
        image: {
          src: '/images/docs/firebase-cloud.jpg',
          alt: 'Cloud infrastructure and global connectivity for Firebase services',
          caption: 'Enable the FCM API in the same Google Cloud project as your Firebase app',
        },
      },
      {
        heading: 'Service account vs user OAuth token',
        paragraphs: [
          'Production backends typically use a service account JSON key and generate tokens with google-auth-library. For manual testing, a user OAuth token from gcloud auth print-access-token is sufficient. TestFCM accepts the short-lived user token for quick tests.',
          'Grant the account the Firebase Cloud Messaging Admin role or a custom role with cloudmessaging.messages.create permission.',
        ],
      },
      {
        heading: 'Message structure overview',
        paragraphs: [
          'HTTP v1 POST body wraps the payload in a message object: token (single device), topic, or condition. notification carries title and body for display notifications. data carries custom key-value pairs (all strings).',
        ],
        code: '{\n  "message": {\n    "token": "DEVICE_TOKEN",\n    "notification": {\n      "title": "Hello",\n      "body": "Test from HTTP v1"\n    },\n    "data": {\n      "screen": "home"\n    }\n  }\n}',
      },
      {
        heading: 'Why TestFCM uses a server proxy',
        paragraphs: [
          'Browsers block direct calls to fcm.googleapis.com due to CORS. TestFCM\'s /api/send-fcm endpoint forwards your payload server-side so you can test from the web UI without running your own backend locally.',
        ],
      },
    ],
  },
  {
    slug: 'oauth-access-token',
    title: 'How to Get an OAuth Access Token for FCM',
    description:
      'Step-by-step instructions to generate a valid ya29 OAuth token using Google Cloud SDK for FCM HTTP v1 API calls.',
    readTime: '6 min read',
    coverImage: {
      src: '/images/docs/gcloud-token.jpg',
      alt: 'Terminal with programming code used to run gcloud auth print-access-token',
      caption: 'OAuth tokens from gcloud authorize your HTTP v1 requests to FCM',
      width: 1200,
      height: 800,
    },
    sections: [
      {
        heading: 'Install Google Cloud SDK',
        paragraphs: [
          'Download and install the Google Cloud SDK for your OS from cloud.google.com/sdk. After installation, run gcloud init and select the Firebase-linked Google Cloud project.',
        ],
      },
      {
        heading: 'Authenticate',
        orderedList: [
          'Run gcloud auth login and sign in with a Google account that has access to the Firebase project',
          'Run gcloud auth application-default login for application default credentials',
          'Run gcloud auth print-access-token and copy the entire output',
          'Paste into TestFCM Access Token field within the token lifetime (typically 1 hour)',
        ],
        code: 'gcloud auth print-access-token',
        image: {
          src: '/images/docs/gcloud-token.jpg',
          alt: 'Command-line terminal showing code for Google Cloud SDK authentication',
          caption: 'Run gcloud auth print-access-token after signing in to the correct project',
        },
      },
      {
        heading: 'Common mistakes',
        list: [
          'Using the FCM device token (APA91…) instead of OAuth token',
          'Using an expired token — generate a fresh one if you see 401 UNAUTHENTICATED',
          'Wrong Google Cloud project selected in gcloud config',
          'Account lacks permission to send FCM messages',
        ],
      },
    ],
  },
  {
    slug: 'device-registration-token',
    title: 'How to Get the FCM Device Registration Token',
    description:
      'Platform-specific guide to retrieving the FCM registration token from Android, iOS, and web apps for push notification testing.',
    readTime: '9 min read',
    coverImage: {
      src: '/images/docs/device-token.jpg',
      alt: 'Person using a smartphone — each device has a unique FCM registration token',
      caption: 'Copy the token from your app logs and paste it into TestFCM',
      width: 1200,
      height: 800,
    },
    sections: [
      {
        heading: 'Android (Kotlin)',
        paragraphs: [
          'Ensure Firebase is initialized and google-services.json is in your app module. Request notification permission on Android 13+. Call FirebaseMessaging.getInstance().token.addOnCompleteListener and log the result.',
        ],
        code: 'FirebaseMessaging.getInstance().token.addOnCompleteListener { task ->\n  if (task.isSuccessful) {\n    Log.d("FCM", "Token: ${task.result}")\n  }\n}',
        image: {
          src: '/images/docs/android-fcm.jpg',
          alt: 'Android smartphone on a desk for FCM push notification testing',
          caption: 'Log the FCM token from Logcat and paste it into TestFCM',
        },
      },
      {
        heading: 'iOS (Swift)',
        paragraphs: [
          'Enable Push Notifications and Background Modes → Remote notifications in Xcode. Upload your APNs authentication key in Firebase Console. Call Messaging.messaging().token and print the token after permission is granted.',
        ],
        image: {
          src: '/images/docs/ios-fcm.jpg',
          alt: 'iPhone on a workspace used to test Apple Push Notification delivery via FCM',
          caption: 'Physical iOS devices are recommended for reliable push testing',
        },
      },
      {
        heading: 'Web (JavaScript)',
        paragraphs: [
          'Initialize Firebase, request notification permission with Notification.requestPermission(), then use getToken(messaging, { vapidKey: "..." }) from firebase/messaging. The VAPID key is in Firebase Console → Cloud Messaging → Web configuration.',
        ],
      },
      {
        heading: 'Token lifecycle',
        paragraphs: [
          'Tokens refresh when the app is restored on a new device, when the user clears app data, or when FCM invalidates a token. Subscribe to onNewToken (Android) or messaging(_:didReceiveRegistrationToken:) (iOS) to keep your backend updated.',
        ],
      },
    ],
  },
  {
    slug: 'common-fcm-errors',
    title: 'Common FCM HTTP v1 Errors and Fixes',
    description:
      'Troubleshoot 401, 403, 404, and invalid-argument errors when sending Firebase Cloud Messaging notifications.',
    readTime: '10 min read',
    coverImage: {
      src: '/images/docs/fcm-errors.jpg',
      alt: 'Developer reviewing source code to fix FCM HTTP v1 API errors',
      caption: 'Check token expiry, Project ID, and string-only data payload values',
      width: 1200,
      height: 800,
    },
    sections: [
      {
        heading: '401 UNAUTHENTICATED',
        paragraphs: [
          'The OAuth access token is missing, expired, or invalid. Generate a new token with gcloud auth print-access-token. Confirm you are not using the device token in the Authorization header.',
        ],
        image: {
          src: '/images/docs/fcm-errors.jpg',
          alt: 'Code editor on screen while debugging a failed FCM API response',
          caption: '401 errors almost always mean an expired or wrong OAuth access token',
        },
      },
      {
        heading: '403 PERMISSION_DENIED',
        paragraphs: [
          'The authenticated identity lacks cloudmessaging.messages.create on the project. Add Firebase Cloud Messaging Admin role in IAM, or use an account with Owner/Editor on the Firebase project.',
        ],
      },
      {
        heading: '404 NOT_FOUND (invalid token or project)',
        paragraphs: [
          'The device token may be unregistered or belong to a different Firebase project. The Project ID in the URL must match the project that issued the token. Uninstall and reinstall the app to get a new token.',
        ],
      },
      {
        heading: '400 INVALID_ARGUMENT',
        list: [
          'Data payload values must be strings, not numbers or objects',
          'Malformed JSON in custom data fields',
          'Empty or truncated device token',
          'Invalid image URL in notification payload',
        ],
      },
      {
        heading: 'Notification not visible on device',
        paragraphs: [
          'If the app is in foreground, notification messages may not show a system banner unless you handle them in code. Data-only messages never show a tray notification by default. Check battery optimization and notification channel settings on Android.',
        ],
      },
    ],
  },
  {
    slug: 'android-push-testing',
    title: 'Testing Push Notifications on Android',
    description:
      'Android-specific checklist for FCM integration, notification channels, and debugging with Logcat.',
    readTime: '7 min read',
    coverImage: {
      src: '/images/docs/android-fcm.jpg',
      alt: 'Modern Android smartphone for testing FCM notification delivery',
      caption: 'Verify notification channels, icons, and tray behavior on Android',
      width: 1200,
      height: 800,
    },
    sections: [
      {
        heading: 'Prerequisites',
        list: [
          'google-services.json from Firebase Console',
          'Firebase BoM dependency in build.gradle',
          'POST_NOTIFICATIONS permission on Android 13+',
          'Notification channel created for Android 8+',
        ],
      },
      {
        heading: 'Debugging with Logcat',
        paragraphs: [
          'Filter Logcat by FirebaseMessaging or FCM. Look for token retrieval, onMessageReceived, and any Google Play services errors. Emulator push works but physical device testing is recommended before release.',
        ],
      },
      {
        heading: 'Testing with TestFCM',
        paragraphs: [
          'Copy the token from Logcat, paste into TestFCM with your Project ID and OAuth token, send a notification with a distinctive title, and verify the tray icon and channel behavior.',
        ],
        image: {
          src: '/images/docs/android-fcm.jpg',
          alt: 'Android phone used to verify notification tray and channel behavior',
          caption: 'Send a test push from TestFCM.in and confirm it appears in the notification shade',
        },
      },
    ],
  },
  {
    slug: 'ios-push-testing',
    title: 'Testing Push Notifications on iOS',
    description:
      'iOS-specific guide for APNs configuration, entitlements, and verifying FCM delivery on iPhone and iPad.',
    readTime: '7 min read',
    coverImage: {
      src: '/images/docs/ios-fcm.jpg',
      alt: 'iPhone displaying mobile apps — configure APNs before FCM iOS testing',
      caption: 'Configure APNs in Firebase Console before testing on iPhone or iPad',
      width: 1200,
      height: 800,
    },
    sections: [
      {
        heading: 'APNs setup in Firebase',
        paragraphs: [
          'Upload an APNs Authentication Key (.p8) or production/development certificate in Firebase Console → Project settings → Cloud Messaging → Apple app configuration. The key works for both sandbox and production.',
        ],
        image: {
          src: '/images/docs/ios-fcm.jpg',
          alt: 'iPhone on a desk for testing push notifications from Firebase Cloud Messaging',
          caption: 'Simulators cannot receive remote push — use a physical iOS device',
        },
      },
      {
        heading: 'Xcode capabilities',
        list: [
          'Push Notifications capability enabled',
          'Background Modes → Remote notifications',
          'Correct Bundle ID registered in Firebase',
          'Physical device required for reliable push testing',
        ],
      },
      {
        heading: 'Sandbox vs production',
        paragraphs: [
          'Development builds use APNs sandbox; App Store builds use production. FCM abstracts much of this, but mismatched certificates can cause silent failures. Check Xcode device logs when notifications do not arrive.',
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): DocArticle | undefined {
  return docArticles.find((a) => a.slug === slug);
}
