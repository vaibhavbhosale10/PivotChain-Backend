const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Uploads/Received-products");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

const {
  createProduct,
  updateProduct,
  deleteProduct,
  fetchAllProduct,
  fetchOneProduct,
} = require("../controller/product-controller");
router.post("/", upload.single("proof"), createProduct);
router.put("/:id", upload.single("proof"), updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", fetchOneProduct);
router.get("/", fetchAllProduct);

module.exports = router;
