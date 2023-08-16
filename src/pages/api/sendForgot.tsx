
import { prisma } from './_base';
import crypto from 'crypto';
import { render } from '@react-email/render';
import sendgrid from '@sendgrid/mail';
import { ResetEmailTemplate } from '@/emails/ResetEmail';


import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

    try {

        const { email } = req.body;

        const exist = await prisma.users.findUnique({
            where: {
                email
            }
        })

        if (exist) {
            var token = crypto.randomBytes(28).toString('hex');


            const emailHtml = render(<ResetEmailTemplate userFirstname={email} resetPasswordLink={`${process.env.NEXTAUTH_URL}/changepassword?token=${token}&email=${email}`} />);

            if (exist.resetToken) {
                const updateForgot = await prisma.forgotToken.update({
                    where: {
                        email
                    },
                    data: {
                        token
                    }
                })

            } else {
                const createForgot = await prisma.forgotToken.create({
                    data: {
                        email,
                        token,
                    }
                })
            }

            const createUser = await prisma.users.update({
                where: {
                    email
                },
                data: {
                    resetToken: token
                }
            })

            const options = {
                from: 'alexisken1432@gmail.com',
                to: email,
                subject: 'DigitalKubo - Password Reset',
                html: emailHtml,
            };

            await sendgrid.send(options);

            res.status(200).json({ success: true })

        } else {
            res.status(200).json({ success: false })

        }


    } catch (error) {
        console.log(error)
        res.status(400).json({ error })


    }


}