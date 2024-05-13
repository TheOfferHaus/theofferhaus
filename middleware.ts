import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/admin(.*)',                 // Protects anything in the admin dashboard route
  '/(.*)/offers',               // Protects offers under any username
  '/(.*)/offers/(.*)',          // Protects specific offer under any username
  '/quiz(.*)',                  // Protects quiz route
  '/address-validate',          // Protects address validation route
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
