import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../lib/cloudinary';
import * as dotenv from "dotenv";
dotenv.config();
import axios from 'axios';

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    try {
        const { public_id } = req.body;

        const data = cloudinary.uploader.destroy(`${public_id}`, { invalidate: true })

        console.log(data)
        res.status(200).json({ success: true });


    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal server error' });
    }


}