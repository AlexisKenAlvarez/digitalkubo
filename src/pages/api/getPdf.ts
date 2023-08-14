import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './_base';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const data = await prisma.actionPlans.findMany()
        res.status(200).json({ success: true, data })

    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }


}