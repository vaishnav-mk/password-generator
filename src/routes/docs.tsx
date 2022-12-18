import { createEffect, createSignal } from "solid-js";
import { useLocation } from "solid-start";
import { A } from "solid-start";

const Docs = () => {
  const [url, setUrl] = createSignal("");
  createEffect(() => {
    setUrl(window.location.href);
  });
  const routes = {
    create: {
      description: "creates password hash",
      url: "/create",
      method: "POST",
      body: {
        length: "number",
        options: {
          hasNumbers: "boolean",
          hasSymbols: "boolean",
          hasUppercase: "boolean",
          hasLowercase: "boolean",
        },
      },
      response: {
        password: "string",
        strength: "number",
      },
    },
    strength: {
      description: "checks password strength",
      url: "/strength",
      method: "POST",
      body: {
        password: "string",
      },
      response: {
        strength: "number",
      },
    },
  };
  return (
    <main class="text-center mx-auto text-gray-700 p-4 flex flex-col max-w-5xl place-items-center">
      <div
        class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5 w-full"
        role="alert"
      >
        <strong class="font-bold">Base URL: </strong>
        <span class="block sm:inline">{url().replace("/docs", "")}api</span>
      </div>
      <div class="bg-orange-100 border border-orange-400 text-orange-700 px-4 py-3 rounded relative gap-5 mt-5 w-full">
        <ul class="flex flex-col gap-5 w-full">
          {Object.keys(routes).map((route, index) => (
            <div>
              <a href={`#${route}`}>
                <li class="flex flex-row gap-5 w-full">
                  <div class="flex flex-row gap-2">
                    <div class="flex flex-row gap-2">
                      <span class="font-bold">{index + 1}. URL: </span>
                      <span>{routes[route].url}</span>
                    </div>
                    <div class="flex flex-row gap-2">
                      <span class="font-bold">Method: </span>
                      <span>{routes[route].method}</span>
                    </div>
                  </div>
                </li>
              </a>
            </div>
          ))}
        </ul>
      </div>
      {Object.keys(routes).map((route) => (
        <div
          id={route}
          class="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative gap-5 mt-5 w-full"
          role="alert"
        >
          <strong class="font-bold">{route} - </strong>
          <span class="block sm:inline">
            This endpoint {routes[route].description}
          </span>
          <div class="flex flex-col gap-2">
            <div class="flex flex-row gap-2">
              <span class="font-bold">URL: </span>
              <span>{routes[route].url}</span>
            </div>
            <div class="flex flex-row gap-2">
              <span class="font-bold">Method: </span>
              <span>{routes[route].method}</span>
            </div>
            <div class="flex flex-row gap-2">
              <span class="font-bold">Body: </span>
              <div class="flex flex-col gap-2">
                {Object.keys(routes[route].body).map((key) => (
                  <div class="flex flex-row gap-2">
                    <span class="font-bold">{key}: </span>
                    <span>{routes[route].body[key] || null}</span>
                  </div>
                ))}
              </div>
              <div class="flex flex-col gap-2">
                {Object.keys(routes[route].body.options || []).map((key) => (
                  <div class="flex flex-row gap-2">
                    <span class="font-bold">{key}: </span>
                    <span>{routes[route].body.options[key] || ""}</span>
                  </div>
                ))}
              </div>
            </div>
            <div class="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded relative gap-5 w-full">
              <strong class="font-bold">Body: </strong>
              <span class="block sm:inline">
                <pre class="text-left">
                  {JSON.stringify(routes[route].body, null, 2)}
                </pre>
              </span>
            </div>
            <div class="flex flex-row gap-2">
              <span class="font-bold">Response: </span>
              <div class="flex flex-col gap-2">
                {Object.keys(routes[route].response).map((key) => (
                  <div class="flex flex-row gap-2">
                    <span class="font-bold">{key}: </span>
                    <span>{routes[route].response[key] || "{"}</span>
                  </div>
                ))}
              </div>
            </div>
            <div class="bg-gray-100 border border-gray-400 text-gray-700 px-4 py-3 rounded relative gap-5 w-full">
              <strong class="font-bold">Response: </strong>
              <span class="block sm:inline">
                <pre class="text-left">
                  {JSON.stringify(routes[route].response, null, 2)}
                </pre>
              </span>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};

export default Docs;
