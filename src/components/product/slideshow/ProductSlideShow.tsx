"use client";
import { useState } from "react";
import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./slideshow.css";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import { ProductImage } from "@/components";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideShow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={`${className}`}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
        autoplay={{ delay: 2000 }}
      >
        {images.length == 0 && (
          <SwiperSlide>
            <ProductImage
              src={""}
              alt={title}
              width={1024}
              height={800}
              className=" rounded-lg object-fill "
            />
          </SwiperSlide>
        )}
        {images.length > 0 &&
          images.map((image) => (
            <SwiperSlide key={image}>
              <ProductImage
                src={image}
                alt={title}
                width={1024}
                height={800}
                className=" rounded-lg object-fill "
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <Swiper
        onSwiper={(swiper) => setThumbsSwiper(swiper)}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-5"
      >
        {images.length == 0 && (
          <SwiperSlide>
            <ProductImage
              src={""}
              alt={title}
              width={300}
              height={300}
              className=" rounded-lg object-fill"
            />
          </SwiperSlide>
        )}
        {images.length > 0 &&
          images.map((image) => (
            <SwiperSlide key={image}>
              <ProductImage
                src={image}
                alt={title}
                width={300}
                height={300}
                className=" rounded-lg object-fill"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default ProductSlideShow;
