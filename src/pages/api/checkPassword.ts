
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './_base';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { email, token } = await req.body

    try {

        const checkUser = await prisma.forgotToken.findUnique({
            where: {
                email,
                token: token
            },
        })

        if (checkUser) {
            res.status(200).json({ valid: true })

        } else {

            res.status(200).json({ valid: false })

        }


    } catch (error) {
        res.status(400).json({ error })


    }

}
