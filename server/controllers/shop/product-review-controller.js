const Product = require("../../models/Product");
const Order = require("../../models/Order");
const ProductReview = require("../../models/Review");

const addProductReview = async (req, res) => {
  try {
    const { productId, userId, userName, reviewMessage, reviewValue } =
      req.body;
    const order = await Order.findOne({
      userId,
      "cartItems.productId": productId,
      orderStatus: "confirmed",
    });

    if (!order) {
      return res.status(403).json({
        success: false,
        message: `You need to purchase product to review it.`,
      });
    }

    const checkExistingReview = await Product.findOne({
      productId,
      userId,
    });

    if (checkExistingReview) {
      return res
        .status(400)
        .json({ success: false, message: `You already reviewd this product` });
    }

    const newReview = new ProductReview({
      productId,
      userId,
      userName,
      reviewMessage,
      reviewValue,
    });

    await newReview.save();

    const review = await ProductReview.find({ productId });
    const totalReviewsLength = reviewMessage.length;
    const averageReview =
      review.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
      totalReviewsLength;

    await Product.findByIdAndUpdate(productId, { averageReview });

    res.status(201).json({ success: true, data: newReview });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: `Some error occurred` });
  }
};

const getProductReview = async (req, res) => {
  const { productId } = req.params;
  const reviews = await ProductReview.find({ productId });

  res.status(200).json({ success: false, data: reviews });

  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: `Some error occurred` });
  }
};

module.exports = { addProductReview, getProductReview };
