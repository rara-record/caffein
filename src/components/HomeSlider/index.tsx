import styled, { css, keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { ISlider } from 'types/Slider';

import SwiperCore, { Navigation, Scrollbar } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { useRef } from 'react';

interface Props {
  slider: ISlider[];
  isMobile: boolean;
}

const VisualSlider = ({ slider, isMobile }: Props) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  SwiperCore.use([Navigation, Scrollbar]);

  // Swiper Custom
  const settings = {
    navigation: { prevEl: prevRef.current, nextEl: nextRef.current },
    scrollbar: { draggable: true, el: '.swiper-scrollbar' },
    spaceBetween: 0,
    slidesPerView: 1,
    onBeforeInit: (swiper: SwiperCore) => {
      if (typeof swiper.params.navigation !== 'boolean') {
        if (swiper.params.navigation) {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }
      }
      swiper.navigation.update();
    },
  };

  return (
    <Container isMobile={isMobile}>
      <Swiper {...settings}>
        {slider.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-title">{slide.title}</div>
            <figure className="swiper-img">
              <img src={slide.thumbnail} alt={`슬라이드 이미지${index}+1`} />
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>

      <StyledSwiperScroll isMobile={isMobile}>
        <div className="swiper-scrollbar"></div>
        <ButtonWrapper isMobile={isMobile}>
          <button ref={prevRef}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button ref={nextRef}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </ButtonWrapper>
      </StyledSwiperScroll>
    </Container>
  );
};

export default VisualSlider;

const textAnime = keyframes`
  0% {
    opacity: 0;
    transform: translate(200px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
  `;

const Container = styled.div<{ isMobile: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;

  .swiper {
    &-slide {
      ${props =>
        !props.isMobile &&
        css`
          display: flex;
          align-items: flex-end;
          justify-content: center;
        `}
    }

    &-slide-active {
      .swiper-title {
        animation: ${textAnime} 1s cubic-bezier(0, 0.55, 0.45, 1),
          opacity 0.8s linear;
      }
    }

    &-title {
      flex: 1;
      margin-bottom: 50px;
      white-space: pre-line;
      color: #ffffff;
      font-weight: bold;
      font-size: 46px;
      line-height: 56px;
    }

    &-img {
      width: 100%;
      height: 100%;

      ${props =>
        !props.isMobile &&
        css`
          flex: 1.8;
          border-radius: 10px;
          background-position: center;
          background-size: cover;
          height: 400px;
        `}

      ${props =>
        props.isMobile &&
        css`
          padding-bottom: 30px;
        `}

      img {
        border-radius: 16px;
        height: 100%;
      }
    }
  }
`;

const StyledSwiperScroll = styled.div<{ isMobile: boolean }>`
  margin-top: -20px;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  ${props =>
    props.isMobile &&
    css`
      display: flex;
      justify-content: center;
      align-items: center;
    `}

  .swiper-scrollbar {
    position: static;
    width: 225px;
    height: 3px;
    background-color: hsla(0, 0%, 100%, 0.1);

    ${props =>
      props.isMobile &&
      css`
        width: 100%;
      `}
  }

  .swiper-scrollbar-drag {
    background-color: #fff;
  }
`;

const ButtonWrapper = styled.div<{ isMobile: boolean }>`
  display: flex;
  margin-left: 33px;
  grid-gap: 25px;
  z-index: 1;
  cursor: pointer;

  ${props =>
    props.isMobile &&
    css`
      display: none;
    `}

  button {
    color: #fff;
    font-size: 25px;
  }

  .swiper-button-disabled {
    color: rgba(255, 255, 255, 0.3);
  }
`;
