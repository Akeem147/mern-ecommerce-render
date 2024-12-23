import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function AdminDashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const dispatch = useDispatch();

  const handleUploadFeatureImage = () => {
    dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        toast.success("Image uploaded successfully!");
        setImageFile(null);
        setUploadedImageUrl("");
      }
    });
  };

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);


  return (
    <>
      <Toaster />
      <div>
        <ProductImageUpload
          imageFile={imageFile}
          setImageFile={setImageFile}
          uploadedImageUrl={uploadedImageUrl}
          setUploadedImageUrl={setUploadedImageUrl}
          setImageLoadingState={setImageLoadingState}
          imageLoadingState={imageLoadingState}
          isCustomStyling={true}
          // setCurrentEditedId={setCurrentEditedId}
          // isEditMode={currentEditedId !== null}
        />
        <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
          Upload
        </Button>
        <div className="flex flex-col gap-4 mt-5">
          {featureImageList && featureImageList.length > 0
            ? featureImageList.map((featureImgItem) => (
                <div className="relative">
                  <img
                    src={featureImgItem?.image}
                    alt={featureImgItem?.title}
                    className="w-full h-[300px] object-cover rounded-t-lg"
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
