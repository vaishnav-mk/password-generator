import {
  useLocation,
  Html,
  Body,
  Routes,
  FileRoutes,
  ErrorBoundary,
  Scripts,
} from "solid-start";
import { A } from "solid-start";
import { Suspense } from "solid-js";
import "./root.css";

export default function Root() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-gray-700"
      : "border-transparent hover:border-gray-700";
  return (
    <Html lang="en">
      <Body>
        <Suspense>
          <ErrorBoundary>
            <nav class="bg-green-500 text-black p-2">
              <ul class="container flex items-center gap-5">
                {[
                  {
                    href: "/",
                    text: "Generate!",
                  },
                  {
                    href: "/docs",
                    text: "API Documentation",
                  },
                ].map(({ href, text }) => (
                  <li class={`border-b-2 ${active(href)}`}>
                    <A href={href}>{text}</A>
                  </li>
                ))}
              </ul>
            </nav>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
