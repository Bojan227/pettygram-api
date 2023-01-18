import cloudinary from 'cloudinary';
import { options } from './uploadImage';

export const deleteImage = async (imageId: string) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions

  try {
    // Delete the image
    const result = await cloudinary.v2.uploader.destroy(imageId, options);

    return { imgUrl: result.url, img_id: result.public_id };
  } catch (error) {
    throw new Error('unable to find the pictureid');
  }
};
