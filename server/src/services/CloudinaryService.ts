import { v2 as cloudinary } from 'cloudinary'
import ENV from '../utils/env.ts'

cloudinary.config({
    cloud_name: ENV.cloudinaryName,
    api_key: ENV.cloudinaryApiKey,
    api_secret: ENV.cloudinaryApiSecret
})

export default class Cloudinary {
    static addWorkspaceAvatar = async (image: any) => {
        return await cloudinary.uploader.upload(image)
    }
}