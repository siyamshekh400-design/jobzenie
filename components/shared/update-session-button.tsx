"use client";

import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";

const UpdatUserSessionButton = () => {
  const { data, error, isPending } = authClient.useSession();

  if (error) {
    return <div>error.message</div>;
  }

  if (isPending) return <div>Loading....</div>;

  const handleAddRole = (role: string) => {};

  return (
    <>
      <div className="gap4 flex flex-col items-center justify-center">
        <div>
          <h4>Session Data</h4>
          <pre className="mt-2 w-auto rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data?.session, null, 2)}</code>
          </pre>
        </div>
        <div>
          <h4>User Data</h4>
          <pre className="mt-2 w-auto rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data?.user, null, 2)}</code>
          </pre>
        </div>
      </div>

      <Button>UpdatUserSessionButton</Button>
    </>
  );
};
export default UpdatUserSessionButton;
