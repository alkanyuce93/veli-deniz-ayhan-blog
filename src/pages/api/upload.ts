import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_KEY || ""
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const form = formidable({});
    const [, files] = await form.parse(req);
    const file = files.file?.[0];

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileContent = await fs.promises.readFile(file.filepath);
    const fileName = file.originalFilename || "unnamed-file";

    const { data, error } = await supabase.storage
      .from("files")
      .upload(`public/${fileName}`, fileContent, {
        contentType: file.mimetype || "application/octet-stream",
        upsert: true,
      });

    if (error) {
      throw error;
    }

    return res
      .status(200)
      .json({ message: "File uploaded successfully", data });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Error uploading file" });
  }
}
