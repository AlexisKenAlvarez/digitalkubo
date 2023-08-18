import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./_base";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, title, locked, pricing, link, fileName, publicId, withImage } =
      req.body;

    if (!withImage) {
      console.log(publicId);
      const data = await prisma.actionPlans.update({
        where: {
          id,
        },
        data: {
          title,
          locked: {
            update: {
              locked,
            },
          },
          pricing: {
            update: {
              pricing,
            },
          },
        },
      });
      console.log(data);
      res.status(200).json({ success: true, data });
    } else {
      console.log(publicId);
      const data = await prisma.actionPlans.update({
        where: {
          id,
        },
        data: {
          title,
          link,
          fileName,
          publicId,
          locked: {
            update: {
              locked,
            },
          },
          pricing: {
            update: {
              pricing,
            },
          },
        },
      });
      console.log(data);
      res.status(200).json({ success: true, data });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
