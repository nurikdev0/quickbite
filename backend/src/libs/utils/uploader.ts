import path from "path";
import multer from "multer";
import { v4 } from "uuid";
import sharp from "sharp";
import fs from "fs/promises";
import Errors, { Message } from "../Errors";

function getTargetImageStorage(address: string) {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${address}`);
    },
    filename: function (req, file, cb) {
      const extension = path.parse(file.originalname).ext;
      const random_name = v4() + extension;
      cb(null, random_name);
    },
  });
}

const makeUploader = (address: string) => {
  const storage = getTargetImageStorage(address);
  const upload = multer({ storage });

  // ===== SINGLE FILE middleware =====
  const compressSingle = async (req: any, res: any, next: any) => {
    if (!req.file) return next();

    const file = req.file;
    const filepath = file.path;
    const dir = path.dirname(filepath);
    const compressedName = "compressed-" + file.filename;
    const outputPath = path.join(dir, compressedName);

    try {
      await sharp(filepath).jpeg({ quality: 70 }).toFile(outputPath);

      await fs.unlink(filepath);

      req.file.filename = compressedName;
      req.file.path = outputPath;

      next();
    } catch (err) {
      console.error("Sharp (single) error:", err);
      const message =
        err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
      return res.send(
        `<script> alert("${message}"); window.location.replace('/admin/signup') </script>`
      );
    }
  };

  // ===== MULTIPLE FILES middleware =====
  const compressArray = async (req: any, res: any, next: any) => {
    if (!req.files || !Array.isArray(req.files)) return next();

    try {
      const compressedFiles = [];

      for (const file of req.files) {
        const filepath = file.path;
        const dir = path.dirname(filepath);
        const compressedName = "compressed-" + file.filename;
        const outputPath = path.join(dir, compressedName);

        await sharp(filepath).jpeg({ quality: 70 }).toFile(outputPath);

        await fs.unlink(filepath);

        compressedFiles.push({
          ...file,
          filename: compressedName,
          path: outputPath,
        });
      }

      req.files = compressedFiles;
      next();
    } catch (err) {
      console.error("Sharp (array) error:", err);
      const message =
        err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG;
      return res.send(
        `<script> alert("${message}"); window.location.replace('/admin/product/all') </script>`
      );
    }
  };

  return {
    single: (fieldName: string) => [upload.single(fieldName), compressSingle],
    array: (fieldName: string, maxCount: number) => [
      upload.array(fieldName, maxCount),
      compressArray,
    ],
  };
};

export default makeUploader;

///////////////////////////////////////////////
// import path from "path";
// import multer from "multer";
// import { v4 } from "uuid";

// //
// function getTargetImageStorage(address: any) {
//   return multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, `./uploads/${address}`);
//     },
//     filename: function (req, file, cb) {
//       const extension = path.parse(file.originalname).ext;
//       const random_name = v4() + extension;
//       cb(null, random_name);
//     },
//   });
// }

// const makeUploader = (address: string) => {
//   const storage = getTargetImageStorage(address);
//   return multer({ storage: storage });
// };

// export default makeUploader;

///////////////////////////////////////////////////////
// const product_storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/products');
//     },
//     filename: function (req, file, cb) {
//         console.log(file);
//         const extension = path.parse(file.originalname).ext;
//         const random_name = v4() + extension;
//         cb(null, random_name);
//     },
// });

// export const uploadProductImage = multer({ storage: product_storage });
