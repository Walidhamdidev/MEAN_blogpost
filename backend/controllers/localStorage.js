import fs from "fs";

const removeImage = (path, author) => {
  fs.unlink(`./uploads/${path}/${author.image}`, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`${author.image} has been deleted`);
  });
};

const updateImage = (path, author, newImage) => {
  // Remove the old image
  if (author.image) {
    fs.unlinkSync(`./uploads/${path}/${author.image}`);
  }

  // Save the new image
  const extension = newImage.name.split(".").pop();
  const fileName = `${author._id}.${extension}`;
  newImage.mv(`./uploads/${path}/${fileName}`);

  // Return the updated image filename
  return fileName;
};

export default {
  removeImage,
  updateImage,
};
