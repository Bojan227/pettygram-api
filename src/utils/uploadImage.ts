import cloudinary from 'cloudinary';

export const options = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: 'boki2435',
  invalidate: true,
};

export const uploadImage = async (img: string) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions

  try {
    // Upload the image
    const result = await cloudinary.v2.uploader.upload(img, options);
    return { imageUrl: result.url, imageId: result.public_id };
  } catch (error) {
    console.error(error);
  }
};
