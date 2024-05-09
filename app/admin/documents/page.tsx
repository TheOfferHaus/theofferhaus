import UploadButtonArea from "@/components/UploadThing/UploadButtonArea";
import UploadthingApi from "@/utils/uploadthingApi";

export default async function Documents() {
  const files = await UploadthingApi.listFiles();
  console.log("****files", files);

  return (
    <>
      <UploadButtonArea />
      {files.map(f => {

      })}
    </>
  );
}
