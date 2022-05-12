import { sequence } from "@sveltejs/kit/hooks";

export const getSession: import("@sveltejs/kit").GetSession = async (event) => {
  return { };
};

const handleHeaders = async ({ event, resolve }) => {
  const response = await resolve(event);
  response.headers.set(
    "Set-Cookie",
    `weathery-marketing-website-visited=true; Domain=.weathery.io; Path=/; max-age=${
      365 * 24 * 60 * 60
    }`
  );

  response.headers.set(
    "Content-Security-Policy",
    "frame-ancestors *.weathery.io *.staging.weathery-dev.com;"
  );
  return response;
};

export const handle = sequence(
  handleHeaders
);