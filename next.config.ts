// import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: "./messages/en.json",
    // appDir: true,
  },
});
const config = {
  images: {
    domains: ["res.cloudinary.com"],
  },
};

// const config: NextConfig = {};

export default withNextIntl(config);
