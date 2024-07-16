import axios, { AxiosError } from 'axios';

const CLOUDINARY_CLOUD_NAME = 'dtl8gpxzt';
const CLOUDINARY_UPLOAD_PRESET = 'gglv2gqz';

export const uploadSingleImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Error uploading image:', error);
      throw error;
    } else {
      console.error('Unexpected error occurred:', error);
      throw error;
    }
  }
};

export const uploadGalleryImages = async (files: File[]): Promise<string[]> => {
  const promises = files.map(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('Error uploading image:', error);
        throw error;
      } else {
        console.error('Unexpected error occurred:', error);
        throw error;
      }
    }
  });

  const imageUrls = await Promise.all(promises);
  return imageUrls;
};