
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './_base';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { accountType } = req.body

        const data = await prisma.users.findMany({
            where: {
                accountType: 1
            },
            select: {
                email: true,
            }
        })

        res.status(200).json({ success: true, data })


    } catch (error) {
        console.log(error)
        res.status(400).json({ error })

    }


}