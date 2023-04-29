import fs from "fs";

const removeImage = (path, model) => {
  fs.unlink(`./uploads/${path}/${model.image}`, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`${model.image} has been deleted`);
  });
};

const updateImage = (path, model, newImage) => {
  // Remove the old image
  if (model.image) {
    fs.unlinkSync(`./uploads/${path}/${model.image}`);
  }

  // Save the new image
  const extension = newImage.name.split(".").pop();
  const fileName = `${model._id}.${extension}`;
  newImage.mv(`./uploads/${path}/${fileName}`);

  // Return the updated image filename
  return fileName;
};

export default {
  removeImage,
  updateImage,
};
