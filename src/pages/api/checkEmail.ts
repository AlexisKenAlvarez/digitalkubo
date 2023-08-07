
import { prisma } from './_base';

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {

    try {
        const { email } = await req.body;

        const data = await prisma.users.findFirst({
            where: {
                email,
            }
        })
        if (data) {
            res.status(200).json({ found: true })
        }

        res.status(200).json({ found: false })


    } catch (error) {
        console.log(error)
        res.status(400).json({ error })

    }


}