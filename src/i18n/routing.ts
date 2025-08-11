import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "de", "vi"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/pathnames": {
      de: "/pfadnamen",
      vi: "/duong-dan",
    },
  },
});
