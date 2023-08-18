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
    const addPdf = async (
      id: number,
      title: string,
      locked: string,
      fileName: string,
      public_id: string,
      pricing: string,
      url?: string
    ) => {
      const data = await prisma.actionPlans.update({
        where: {
          id,
        },
        data: {
          title,
          pricing: {
            update: {
              pricing: pricing,
            },
          },
          locked: {
            update: {
              locked: locked === "locked" ? true : false,
            },
          },
        },
      });

      return data;
    };

    const form = formidable({ multiples: true });

    form.parse(req, async (err: any, fields: any, files: any) => {
      const data = await cloudinary.uploader.unsigned_upload(
        files.file[0].filepath,
        fields.upload_preset[0],
        { folder: "digitalkubo" }
      );

      if (data) {
        const add = await addPdf(
          data.secure_url,
          fields.title[0],
          fields.access[0],
          fields.fileName[0],
          data.public_id,
          fields.pricing[0]
        );

        res.status(200).json({ success: true });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
