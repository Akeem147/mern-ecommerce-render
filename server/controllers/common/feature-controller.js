const Features = require("../../models/Features");
const Order = require("../../models/Features");

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    console.log(image, `here is d imaege`);
    

    const featureImages = new Features({ image });

    await featureImages.save();

    res.status(201).json({ success: true, data: featureImages });
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getFeatureImage = async (req, res) => {
  try {
    const images = await Features.find({});

    res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = { addFeatureImage, getFeatureImage };
