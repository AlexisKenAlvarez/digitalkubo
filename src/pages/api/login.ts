import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './_base';
import bcrypt from 'bcrypt'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const { email, password } = await req.body

    async function checkUser(password: string, hashed: string) {

        const match = await bcrypt.compare(password, hashed);

        console.log(match)

        if (match) {
            return true

        } else {
            return false
        }
    }

    try {
        const data = await prisma.users.findFirst({
            where: {
                email,
            }
        })

        if (data) {
            const hashedPassword = data.password as string
            const result = await checkUser(password, hashedPassword)

            if (result) {
                res.status(200).json({ success: true })
            }

        } else {
            res.status(200).json({ success: false })
        }

        res.status(200).json({ success: false })



    } catch (error) {
        res.status(400).json({ error })

    }


}