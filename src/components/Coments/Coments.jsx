import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import Grant1 from "../../assets/videos/gr1.mp4";
import Grant2 from "../../assets/videos/gr2.mp4";
import Grant3 from "../../assets/videos/gr3.mp4";
import Grant4 from "../../assets/videos/gr4.mp4";
import Grant5 from "../../assets/videos/gr5.mp4";
import Grant6 from "../../assets/videos/gr6.mp4";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const videos = [
  { video: Grant1 },
  { video: Grant2 },
  { video: Grant3 },
  { video: Grant4 },
  { video: Grant5 },
  { video: Grant6 },
];

export default function Coments() {
  const { t } = useTranslation();
  const swiperRef = useRef(null);
  const videoRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const toggleAtIndex = (index) => {
    const v = videoRefs.current[index];
    if (!v) return;
    if (v.paused) {
      const p = v.play();
      if (p && typeof p.then === "function") p.catch(() => {});

      if (
        swiperRef.current &&
        swiperRef.current.autoplay &&
        typeof swiperRef.current.autoplay.stop === "function"
      ) {
        try {
          swiperRef.current.autoplay.stop();
        } catch (err) {
          void err;
        }
      }
    } else {
      v.pause();

      if (
        swiperRef.current &&
        swiperRef.current.autoplay &&
        typeof swiperRef.current.autoplay.start === "function"
      ) {
        try {
          swiperRef.current.autoplay.start();
        } catch (err) {
          void err;
        }
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!videoRefs.current) return;
    videoRefs.current.forEach((v) => {
      try {
        v && v.pause();
      } catch (err) {
        void err;
      }
    });
  }, [activeIndex]);

  // Pause swiper autoplay when any video starts playing,
  // and resume autoplay when no videos are playing.
  useEffect(() => {
    const handlePlay = () => {
      if (
        swiperRef.current &&
        swiperRef.current.autoplay &&
        typeof swiperRef.current.autoplay.stop === "function"
      ) {
        try {
          swiperRef.current.autoplay.stop();
        } catch (err) {
          void err;
        }
      }
    };

    const handlePauseOrEnd = () => {
      try {
        const anyPlaying =
          videoRefs.current && videoRefs.current.some((vv) => vv && !vv.paused);
        if (!anyPlaying) {
          if (
            swiperRef.current &&
            swiperRef.current.autoplay &&
            typeof swiperRef.current.autoplay.start === "function"
          ) {
            try {
              swiperRef.current.autoplay.start();
            } catch (err) {
              void err;
            }
          }
        }
      } catch (err) {
        void err;
      }
    };

    // Attach listeners
    const refs = videoRefs.current || [];
    refs.forEach((v) => {
      if (!v) return;
      try {
        v.addEventListener("play", handlePlay);
        v.addEventListener("pause", handlePauseOrEnd);
        v.addEventListener("ended", handlePauseOrEnd);
      } catch (err) {
        void err;
      }
    });

    return () => {
      // Cleanup listeners
      refs.forEach((v) => {
        if (!v) return;
        try {
          v.removeEventListener("play", handlePlay);
          v.removeEventListener("pause", handlePauseOrEnd);
          v.removeEventListener("ended", handlePauseOrEnd);
        } catch (err) {
          void err;
        }
      });
    };
  }, [videoRefs, swiperRef]);

  return (
    <div className="relative w-full mx-auto p-5 my-7 bg-neutral-50">
      <h2 className="lg:text-4xl md:3xl mb-14 font-one text-center">
        {t("coments.title")}
      </h2>

      {loading ? (
        <div className="flex gap-4 justify-center flex-wrap max-w-7xl mx-auto">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-[230px] max-[550px]:w-full">
              <Skeleton height={360} borderRadius="1rem" />
            </div>
          ))}
        </div>
      ) : (
        <Swiper
          modules={[Autoplay, Navigation]}
          loop={true}
          slidesPerView={4}
          spaceBetween={30}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          breakpoints={{
            1050: { slidesPerView: 5 },
            990: { slidesPerView: 4 },
            770: { slidesPerView: 3 },
            550: { slidesPerView: 2 },
            100: { slidesPerView: 1 },
          }}
          className="max-w-7xl"
        >
          {videos.map((item, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <div className="w-[230px] max-[550px]:w-full aspect-[9/16] relative group shadow-md rounded-xl overflow-hidden">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  controls
                  loop
                  muted
                  onClick={() => toggleAtIndex(index)}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-105 cursor-pointer"
                >
                  <source src={item.video} type="video/mp4" />
                  Sizning brauzeringiz video formatini qo‘llab-quvvatlamaydi.
                </video>
                <div className="absolute top-0 left-0 w-full h-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center text-white text-lg font-semibold pointer-events-none">
                  {item.title}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
