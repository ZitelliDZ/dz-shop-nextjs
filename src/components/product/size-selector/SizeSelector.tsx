import { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];

  onSizeSelected: (size: Size) => void;
}

export const SizeSelector = ({
  availableSizes,
  selectedSize,
  onSizeSelected,
}: Props) => {
  return (
    <div className=" my-5  ">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>
      <div className="flex">
        {availableSizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelected(size)}
            className={clsx("mx-2 hover:underline p-1 text-lg", {
              "underline bg-slate-300 rounded ": size === selectedSize,
            })}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
