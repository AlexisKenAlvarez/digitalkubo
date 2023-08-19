import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "../../lib/cloudinary";
import * as dotenv from "dotenv";
dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { publicId } = req.body;

    const data = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    });

    console.log("Delete success")
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
}
