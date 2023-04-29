import { v2 as cloudinary } from "cloudinary";

const uploadImage = async (file, path) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "blogpost/" + path,
    });
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteImage = async (image) => {
  try {
    const result = await cloudinary.uploader.destroy(image);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const updateImage = async (path, existingPublicId, newImage) => {
  try {
    return await cloudinary.uploader.upload(newImage, {
      public_id: existingPublicId,
      overwrite: true,
      invalidate: true,
      folder: "blogpost/" + path,
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  uploadImage,
  deleteImage,
  updateImage,
};
