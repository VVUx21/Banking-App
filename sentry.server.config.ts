import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://332f4ca6af46e5e8276823f5caff40a8@o4508134098141184.ingest.us.sentry.io/4508134099976192",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
