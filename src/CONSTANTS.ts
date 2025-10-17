export const NUMBER_REGEX_STRING = '^[0-9]*$'
export const NAME_REGEX = /^[A-Za-z]+$/;
export const NAME_WITH_SPACE_REGEX = /^[A-Za-z]+( [A-Za-z]+)*$/;
export const API_URL = process.env.NEXT_PUBLIC_URL! + "/api";
export const CLOUDINARY_SIGNATURE_ENDPOINT = "/api/sign-cloudinary-params" as const;

export const SITE_TITLE = "Site Builder";

export const HOME_SLUG = "home" as const;
export const BLOGS_SLUG = "blogs" as const;
export const EVENTS_SLUG = "events" as const;