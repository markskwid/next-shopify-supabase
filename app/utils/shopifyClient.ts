import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const shopifyClient = createStorefrontApiClient({
  storeDomain: "https://aoc-training.myshopify.com/",
  apiVersion: "2025-10",
  publicAccessToken: process.env.PUBLIC_ACCESS_TOKEN,
});

export default shopifyClient;
