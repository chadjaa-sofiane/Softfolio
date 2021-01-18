import { UserInputError } from "apollo-server-express";
import { createWriteStream, mkdir, unlinkSync } from "fs";
import { join } from "path";
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};
const storeUpload = async (
  { stream, filename, mimetype },
  foldername,
  username
) => {
  const originalname = filename.split(" ").join("_").split(".")[0];
  const extension = MIME_TYPES[mimetype];
  username = username.split(" ").join("_")
  if (!extension)
    throw new UserInputError("file Type not allowed", {
      errors: "fileType not allowed",
    });
  const pathname = `${foldername}/${username}_${originalname}_${Date.now()}.${extension}`;
  const path = join(__dirname, `../public/images/${pathname}`);
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () =>
        resolve({
          path: `images/${pathname}`,
          filename,
          mimetype,
        })
      )
      .on("error", reject)
  );
};

export const processUpload = async (upload, foldername, username) => {
  const { createReadStream, filename, mimetype } = await upload;
  // Creates an images folder in the root directory
  makeFolder(foldername);
  const stream = createReadStream();
  const file = await storeUpload(
    { stream, filename, mimetype },
    foldername,
    username
  );
  return file;
};
export const makeFolder = (foldername) => {
  mkdir(`public/images/${foldername}`, { recursive: true }, (err) => {
    if (err) throw err;
  });
};

export const deleteFile = (image_path) => {
  const path = join(__dirname, `../public/${image_path}`);
  try {
    unlinkSync(path);
  } catch (err) {
    throw new Error(err);
  }
};
