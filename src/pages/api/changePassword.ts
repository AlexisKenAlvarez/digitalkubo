import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "./_base";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, withToken } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    if (withToken) {
      const deleteToken = await prisma.forgotToken.delete({
        where: {
          email,
        },
      });
    }

    const updateUser = await prisma.users.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
        resetToken: null,
      },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
