import Image from "next/image";

interface Props {
  src?: string;
  alt: string;
  className?: React.StyleHTMLAttributes<HTMLImageElement>["className"];
  style?: React.StyleHTMLAttributes<HTMLImageElement>["style"];
  width: number;
  height: number;
  onMouseEnter?: React.MouseEventHandler<HTMLImageElement> | undefined;
  onMouseLeave?: React.MouseEventHandler<HTMLImageElement> | undefined;
  layout?: string | undefined;
}

export const ProductImage = ({
  alt,
  height,
  width,
  className,
  src,
  onMouseEnter,
  onMouseLeave,
  layout,
  style,
}: Props) => {
  const localsrc = src
    ? src.startsWith("http")
      ? src
      : `/products/${src}`
    : "/imgs/placeholder.jpg";

  return (
    <Image
      src={localsrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      layout={layout}
      style={style}
    />
  );
};

export default ProductImage;
