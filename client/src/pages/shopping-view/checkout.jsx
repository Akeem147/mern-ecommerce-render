import React from "react";
import image from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shopOrder);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const dispatch = useDispatch();

  console.log(`current address here`, currentSelectedAddress);
  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currItem) =>
            sum +
            (currItem?.salePrice > 0 ? currItem?.salePrice : currItem?.price) *
              currItem?.quantity,
          0
        )
      : 0;

  const handleInitiatePaypalPayment = () => {
    if (cartItems.length === 0) {
      toast.error(`Your cart is empty. Please add an item to proceed.`);
      return;
    }

    if (currentSelectedAddress === null) {
      toast.error(`Please select one address to proceed`);
      return;
    }
    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "paypal",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

   
    dispatch(createNewOrder(orderData)).then((data) => {
    
      if (data?.payload?.success) {
        setIsPaymemntStart(true);
      } else {
        setIsPaymemntStart(false);
      }
    });
  };

  if (approvalURL) {
    window.location.href = approvalURL;
  }

  return (
    <>
      <Toaster />
      <div className="flex flex-col">
        <div className="relative h-[300px] overflow-hidden">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
          <Address setCurrentSelectedAddress={setCurrentSelectedAddress} selectedId={currentSelectedAddress}/>
          <div className="flex flex-col gap-4">
            {cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items.map((item) => (
                  <UserCartItemsContent cartItem={item} />
                ))
              : null}
            <div className="mt-8 space-y-4">
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">${totalCartAmount}</span>
              </div>
            </div>
            <div className="mt-4 w-full">
              <Button
                onClick={() => handleInitiatePaypalPayment()}
                className="w-full"
              >
                {
                  isPaymentStart ? "Processing paypal payment.." : "Check out with paypal"
                }
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingCheckout;
