import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./_base";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { email } = req.body;

    console.log(email)

    const data = await prisma.adminList.findMany({
      where: {
        email,
      },
    });

    if (data) {
      res.status(200).json({ success: true });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
