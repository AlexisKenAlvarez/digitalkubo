import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./_base";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { locked } = req.body;

    const count = await prisma.actionPlanAccess.aggregate({
      where: {
        locked,
      },
      _count: true,
    });

    const data = await prisma.actionPlanAccess.findMany({
      where: {
        locked,
      },
      include: {
        actionPlan: true,
      },
    });

    res.status(200).json({ success: true, data, count: count._count });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
