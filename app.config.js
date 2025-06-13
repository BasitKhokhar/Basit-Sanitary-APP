import 'dotenv/config';
export default () => ({
  expo: {
    name: "Basit Sanitary App",
    slug: "your-app-slug",
    version: "1.0.0",
    extra: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      API_BASE_URL: process.env.API_BASE_URL,
    },
    plugins: [
      "expo-secure-store",
    ],
  },
});