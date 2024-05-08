import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/admin", // Protects the admin dashboard route
  "/(.*)/offers", // Protects offers under any username
  "/(.*)/offers/(.*)", // Protects specific offer under any username
  "/quiz(.*)" // Protects starting the quiz to logged in users
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
