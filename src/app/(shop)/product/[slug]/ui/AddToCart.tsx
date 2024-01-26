"use client";
import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      slug: product.slug,
      size: size,
      quantity: quantity,
    };
    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <div>
      {/**Selector de tallas */}
      <SizeSelector
        availableSizes={product.sizes}
        selectedSize={size}
        onSizeSelected={(size) => setSize(size)}
      />

      {/**Selecttor de cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={(quantity) => setQuantity(quantity)}
      />

      {/**Button */}
      <div className="flex flex-col my-5">
        <button onClick={() => addToCart()} className="btn-primary ">
          Agregar al carrito
        </button>
        {posted && !size && (
          <span className=" text-red-500 ">Debe de seleccionar una talla*</span>
        )}
      </div>
    </div>
  );
};

export default AddToCart;
