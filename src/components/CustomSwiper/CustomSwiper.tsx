import { useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y, Controller  } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function CustomSwiper() {
  const [controlledSwiper, setControlledSwiper] = useState(null);

  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Controller]}
        effect="fade"
        spaceBetween={50}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={setControlledSwiper}
        controller={{ control: controlledSwiper }}
        onSlideChange={() => console.log("slide change")}
      >
        {[1, 2, 3].map((i, el) => {
          return <SwiperSlide key={el}>Slide {el}</SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
}
