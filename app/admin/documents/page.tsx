import UploadButtonArea from "@/components/UploadThing/UploadButtonArea";
import UploadthingApi from "@/utils/uploadthingApi";
import { FileTableColumns } from "@/components/UploadThing/FileTable/FileTableColumns";
import { FileTable } from "@/components/UploadThing/FileTable/FileTable";

export default async function Documents() {
  const files = await UploadthingApi.listFiles();

  return (
    <div className="h-screen mx-32">
      <UploadButtonArea />
      <FileTable columns={FileTableColumns} data={files} />
    </div>
  );
}
