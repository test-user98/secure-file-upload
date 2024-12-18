import Download from "@/components/download/download";
import axios from "axios";

export default async function DownloadFile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Fetch the decrypted file from the server
  return <Download slug={slug} />
}
