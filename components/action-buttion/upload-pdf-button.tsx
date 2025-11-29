"use client";

import { Camera } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";

import { candidateResumeUplaod } from "@/lib/actions/candidate.action";

import { Button } from "../ui/button";

interface IUploadButtonProps {
  loggedInUserId: string | undefined;
  accountType: "candidate" | "employee" | undefined;
}

const UploadPDFButton = ({ accountType, loggedInUserId }: IUploadButtonProps) => {
  // const [resource, setResource] = useState();
  // console.log("🚀 ~ UploadImagButton ~ resource:", resource);
  return (
    <CldUploadWidget
      uploadPreset="jobfiesta_rakibtweets"
      signatureEndpoint={`/api/signed-image`}
      options={{
        folder: "resume",
        sources: ["local", "url"],
        resourceType: "auto",
        maxFileSize: 2 * 1024 * 1024,
        clientAllowedFormats: ["pdf"],
        multiple: false,
      }}
      onSuccess={async (result) => {
        if (result.event !== "success") return;

        // setResource(result); // { public_id, secure_url, etc }
        try {
          // result.info may be a string or CloudinaryUploadWidgetInfo; coerce to any to access properties
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const info = result.info as any;
          const publicId = info?.public_id as string | undefined;
          const secureUrl = info?.secure_url as string | undefined;

          if (!publicId || !secureUrl) {
            console.log("Upload succeeded but missing info:", info);
            return;
          }
          if (accountType === "candidate" && loggedInUserId) {
            //todo: update pdf to candidate
            const { success, error } = await candidateResumeUplaod(loggedInUserId, {
              id: publicId,
              url: secureUrl,
            });

            if (success) toast.success("Upload resume successfully");
            else toast.error(error?.message || "Fail to upload resume");
          }
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          // setResource(undefined);
          open();
        }
        return (
          <Button onClick={() => handleOnClick()} className="md:flex md:w-full lg:w-auto">
            Upload Resume
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};
export default UploadPDFButton;
