import { uploadImage } from './uploadImage';
export const convertImages = async (
  images: string[]
): Promise<{ imageUrls: string[]; imageIds: string[] }> => {
  const imageUrls: string[] = [];
  const imageIds: string[] = [];

  try {
    await Promise.all(
      images.map(async (image) => {
        const { imageUrl, imageId } = await uploadImage(image);
        imageUrls.push(imageUrl);
        imageIds.push(imageId);
      })
    );
  } catch (error) {
    throw new Error('Unable to convert the images');
  }

  return { imageUrls, imageIds };
};
