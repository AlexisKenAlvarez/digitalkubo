import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './_base';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { locked } = req.body
        const data = await prisma.actionPlanAccess.findMany({
            where: {
                locked
            },
            include: {
                actionPlan: true
            }
        })
        console.log(data)
        res.status(200).json({ success: true, data })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }


}