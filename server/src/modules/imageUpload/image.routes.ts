import { uploadtoS3 } from '@app/helper/s3-upload';
import express from 'express';
const imageRoute = express.Router();

imageRoute.post('/upload', async (req, res) => {
    const {imageFile} = req.body;
    const result = await uploadtoS3(imageFile, 'plot-wisp', '12345', 'png', 'image/png');
    res.json(result);
})

export default imageRoute