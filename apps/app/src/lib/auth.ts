import { createClient } from "@openauthjs/openauth/client";

export const auth = createClient({
    clientID: "@local/api",
    issuer: import.meta.env.VITE_AUTH_URL
})