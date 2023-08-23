import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./_base";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    req.statusCode = 200;
    const { id } = req.body;

    const data = await prisma.actionPlans.findMany({
      where: {
        id: parseInt(id),
      },
    });

    if (data) {
      res.status(200).json({ data: data[0].link, success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
