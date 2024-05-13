'use server'

import { revalidatePath } from "next/cache"
import { UploadthingApi } from "@/utils/uploadthingApi";
import type { File } from "@/utils/uploadthingApi";

export async function revalidateDocuments() {
  revalidatePath("/admin/documents");
}

export async function deleteDocument(file: File) {
  await UploadthingApi.deleteFile(file.key)
}

export async function getDocumentUrl(file: File) {
  const url = await UploadthingApi.getUrl(file.key);
  return url;
}