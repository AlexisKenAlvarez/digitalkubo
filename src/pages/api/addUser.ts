import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from './_base';
import bcrypt from 'bcrypt'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { email, password, accountType } = req.body;

        console.log("Account Type from API", accountType)


        const exist = await prisma.users.findFirst({
            where: {
                email
            }
        })

        if (exist) {
            throw new Error("This email already exist!")
        }

        if (accountType === 1) {
            const hashedPassword = await bcrypt.hash(password, 10)

            const data = await prisma.users.create({
                data: {
                    email,
                    password: hashedPassword,
                    accountType
                }
            })
        } else {
            const data = await prisma.users.create({
                data: {
                    email,
                    accountType
                }
            })
        }

        res.status(200).json({ success: true })


    } catch (error) {
        console.log(error)
        res.status(400).json({ error })

    }

}
