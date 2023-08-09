import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dnfsr6bms',
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary