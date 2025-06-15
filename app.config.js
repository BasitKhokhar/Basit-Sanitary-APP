import 'dotenv/config';
export default () => ({
  expo: {
    name: "Basit Sanitary App",
    slug: "basit-sanitary-app",
    owner: "basitkhokhar4949",
    version: "1.0.0",
    extra: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      API_BASE_URL: process.env.API_BASE_URL,
    },
    android: {
      "package": "com.basitkhokhar.sanitaryapp"
    },
    plugins: [
      "expo-secure-store",
    ],
  },
});