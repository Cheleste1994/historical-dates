import { memo } from "react";
import { Keyboard, Scrollbar, Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import styles from "./CustomSwiper.module.scss";
import { DataPeriod } from "../../constants/interface";

export default memo(function CustomSwiper({
  data: { data },
}: {
  data: DataPeriod;
}) {
  // const [controlledSwiper, setControlledSwiper] = useState(null);

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={80}
      centeredSlides={false}
      slidesPerGroupSkip={1}
      grabCursor={true}
      keyboard={{
        enabled: true,
      }}
      breakpoints={{
        320: {
          slidesPerView: 2,
          slidesPerGroup: 2,
        },
        769: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
      }}
      scrollbar={false}
      navigation={false}
      modules={[Keyboard, Scrollbar, Navigation, Pagination]}
      className={styles.customSwiper}
    >
      {data.map(({ id, year, description }) => (
        <SwiperSlide key={id} className={styles.swiperSlide}>
          <span>{year}</span>
          <span>{description}</span>
        </SwiperSlide>
      ))}
    </Swiper>
  );
});
