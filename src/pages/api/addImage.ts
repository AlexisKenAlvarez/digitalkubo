import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "../../lib/cloudinary";
import formidable from "formidable";
import { prisma } from "./_base";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = formidable({ multiples: true });

    form.parse(req, async (err: any, fields: any, files: any) => {
      const data = await cloudinary.uploader.unsigned_upload(
        files.file[0].filepath,
        fields.upload_preset[0],
        { folder: "digitalkubo" }
      );

      res.status(200).json({
        success: true,
        secure_url: data.secure_url,
        public_id: data.public_id,
        fileName: fields.fileName[0],
      });

      console.log("Add image success");
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
