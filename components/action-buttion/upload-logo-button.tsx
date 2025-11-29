"use client";

import { Camera } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { employeeLogoUpload } from "@/lib/actions/employee.action";

interface IUploadButtonProps {
  loggedInUserId: string | undefined;
  accountType: string | undefined;
}

const UploadLogoButton = ({ accountType, loggedInUserId }: IUploadButtonProps) => {
  // const [resource, setResource] = useState();
  // console.log("🚀 ~ UploadImagButton ~ resource:", resource);

  return (
    <CldUploadWidget
      uploadPreset="jobfiesta_rakibtweets"
      signatureEndpoint={`/api/signed-image`}
      options={{
        folder: "employee",
        sources: ["local", "url"],
        maxFileSize: 2 * 1024 * 1024,
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

          console.log({ accountType, loggedInUserId });
          if (loggedInUserId) {
            //todo: update image to
            console.log({
              id: publicId,
              url: secureUrl,
            });
            const { success, error } = await employeeLogoUpload(loggedInUserId, {
              id: publicId,
              url: secureUrl,
            });

            if (success) toast.success("Logo upload successfully");
            else toast.error(error?.message || "Fail to upload Logo");
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
          <Button onClick={() => handleOnClick()} variant="outline" size="sm" className="w-full md:w-auto">
            <Camera size={24} />
            Upload Photo
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};
export default UploadLogoButton;
