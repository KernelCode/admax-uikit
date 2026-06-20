import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./app.css";
import { I18nProvider } from "./i18n";
import { Layout } from "./routes/layout";
import { Dashboard } from "./routes/dashboard";
import { Campaign } from "./routes/campaign";
import { Social } from "./routes/social";
import { Pricing } from "./routes/pricing";
import { Showcase } from "./routes/showcase";

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        // Dashboard is the first page.
        { path: "/", element: <Dashboard /> },
        { path: "/campaign", element: <Campaign /> },
        { path: "/social", element: <Social /> },
        { path: "/pricing", element: <Pricing /> },
        { path: "/components", element: <Showcase /> },
      ],
    },
  ],
  // Works at "/" in dev and under any subpath (e.g. /demos/tayang/) when built
  // with `vite build --base=/demos/tayang/`.
  { basename: import.meta.env.BASE_URL },
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nProvider>
      <RouterProvider router={router} />
    </I18nProvider>
  </React.StrictMode>,
);
