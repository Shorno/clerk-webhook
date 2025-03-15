import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "images.clerk.dev"
            },
            {
                hostname : "www.gravatar.com"
            }
        ]
    }
};

export default nextConfig;
