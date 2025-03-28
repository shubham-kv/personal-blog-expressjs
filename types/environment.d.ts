export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      PORT: string;
      CLERK_PUBLISHABLE_KEY: string;
      CLERK_SECRET_KEY: string;
      PERM_MANAGE_BLOGS: string;
    }
  }
}
