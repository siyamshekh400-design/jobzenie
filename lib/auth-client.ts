import { customSessionClient } from "better-auth/client/plugins";
import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { auth } from "./auth";

// auth for client
export const authClient = createAuthClient({
  plugins: [customSessionClient<typeof auth>(), adminClient()],
});

export type Session = typeof authClient.$Infer.Session;
