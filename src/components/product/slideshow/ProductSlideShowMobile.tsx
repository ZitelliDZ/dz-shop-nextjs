"use client";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "./slideshow.css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import { ProductImage } from "@/components";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideShowMobile = ({ images, title, className }: Props) => {
  return (
    <div className={`${className}`}>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        loop={true}
        pagination={true}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
        autoplay={{ delay: 2000 }}
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <ProductImage
              src={image}
              alt={title}
              width={600}
              height={500}
              className=" rounded-lg object-fill "
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlideShowMobile;
