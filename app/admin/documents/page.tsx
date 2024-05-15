import UploadDropzoneArea from "@/components/UploadThing/UploadDropArea";
import { FileTableColumns } from "@/components/UploadThing/FileTable/FileTableColumns";
import { FileTable } from "@/components/UploadThing/FileTable/FileTable";
import { UploadthingApi } from "@/utils/uploadthingApi";

/** Displays file upload dropzone and documents table */
export default async function Documents() {
  const files = await UploadthingApi.listFiles();

  return (
    <div className="h-screen mx-32">
      <UploadDropzoneArea />
      <FileTable columns={FileTableColumns} data={files} />
    </div>
  );
}
