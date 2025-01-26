import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = [
  "/",
  "/api/webhook",
  "/question/*", // Match any dynamic route after /question/
  "/tags",
  "/tags/*", // Match any dynamic route after /tags/
  "/profile/*", // Match any dynamic route after /profile/
  "/community", // Fixed route
  "/jobs", // Fixed route
];

const privateRoutes = ["/ask-question"];
const publicRouteMatcher = createRouteMatcher(publicRoutes);

const isProtectedRoute = createRouteMatcher(privateRoutes);

export default clerkMiddleware(async (auth, req) => {
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return;
  }

  const { userId } = await auth();

  // Enforce authentication for protected routes
  if (publicRoutes.includes(req.nextUrl.pathname)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/",
    "/api/webhook",
    "/question/*", // Match any dynamic route after /question/
    "/tags",
    "/tags/*", // Match any dynamic route after /tags/
    "/profile/*", // Match any dynamic route after /profile/
    "/community", // Fixed route
    "/jobs",
    "/ask-question",
  ],
};
