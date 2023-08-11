import { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '../../lib/cloudinary';
import formidable from 'formidable'

export const config = {
    api: {
        bodyParser: false
    }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    try {

        const addPdf = () => {

        }

        const form = formidable({ multiples: false });

        form.parse(req, async (err: any, fields: any, files: any) => {

            console.log(fields.upload_preset[0])
            console.log(files.file[0].filepath)

            const data = await cloudinary.uploader.unsigned_upload(files.file[0].filepath, fields.upload_preset[0], { folder: 'digitalkubo' });


            if (data) {

                const url = data.secure_url
                console.log(data)

                res.status(200).json({ success: true });
            } else {
                res.status(200).json({ success: false });
            }

        });


    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }
}