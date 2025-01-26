import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes
const isProtectedRoute = createRouteMatcher(["/ask-question"]);

// Define public routes
const publicRoutes = [
  "/",
  "/api/webhook",
  "question/:id",
  "/tags",
  "/tags/:id",
  "/profile/:id",
  "commiunity",
  "/jobs",
];

// const ignoredRoutes = ["/app/api/webhook", "/app/api/chatgpt"];

export default clerkMiddleware(async (auth, req) => {
  // Bypass authentication for public routes
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return;
  }

  // Protect all other routes matched by `isProtectedRoute`
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Match all API and specific routes
    "/((?!_next|[^?]\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).)",
    "/api/(.*)",
    "/ask-question",
  ],
};
