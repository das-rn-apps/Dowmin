// middlewares/multer.ts
import multer from "multer";

const storage = multer.memoryStorage(); // file kept in buffer
const upload = multer({ storage });

export default upload;
