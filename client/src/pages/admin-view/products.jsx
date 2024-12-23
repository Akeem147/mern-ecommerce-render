import ProductImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "@/store/admin/product-slice";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import AdminProductTile from "@/components/admin-view/product-tile";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

function AdminProducts() {
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(false);
  const { productlist } = useSelector((state) => state.adminProduct);

  const dispatch = useDispatch();
  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(
          editProduct({
            id: currentEditedId,
            formData,
          })
        ).then((data) => {
          console.log(`Edit data`, data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts);
            setOpenCreateProduct(false);
            setFormData(initialFormData);
            setCurrentEditedId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts);
            setOpenCreateProduct(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast.success("Product added successfully!", {
              icon: "✅",
            });
          }
        });
  }

  const handleDelete = (getCurrentProductId) => {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  };


  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  console.log(productlist, uploadedImageUrl, `product list`);

  return (
    <>
      <Toaster />
      <div className="mb-5 flex justify-end w-full">
        <Button onClick={() => setOpenCreateProduct(true)}>
          Add new product
        </Button>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
        {productlist && productlist.length > 0
          ? productlist.map((productItem) => (
              <AdminProductTile
                product={productItem}
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProduct={setOpenCreateProduct}
                setFormData={setFormData}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProduct}
        onOpenChange={() => {
          setOpenCreateProduct(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? `Edit Product` : `Add New Product`}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            setCurrentEditedId={setCurrentEditedId}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              isBtnDisabled={!isFormValid()}
              buttonText={currentEditedId !== null ? `Edit` : `Add`}
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AdminProducts;
