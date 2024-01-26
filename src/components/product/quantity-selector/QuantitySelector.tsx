"use client";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {
  const onQuantity = (value: number) => {
    if (quantity + value < 1) return;
    onQuantityChange(quantity + value);
  };

  return (
    <div className=" flex  ">
      <button onClick={() => onQuantity(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-100 text-center ">
        {quantity}
      </span>
      <button onClick={() => onQuantity(1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};

export default QuantitySelector;
