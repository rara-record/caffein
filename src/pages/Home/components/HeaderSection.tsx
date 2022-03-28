import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import { maxWidth } from 'styles/mixin';
import { Slider } from 'components';
import { ISlider } from 'types/type';
import { useEffect, useState } from 'react';

const SliderMock: ISlider = {
  id: 0,
  title: '개발은 \n카페인과 함께',
  thumbnail: 'https://cdn.comento.kr/images/pt/tmp/prefix_44UsYDVNuM.jpg',
};

const HeaderSection = () => {
  const [slider, setSlider] = useState<ISlider[]>([]);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    setSlider([
      SliderMock,
      SliderMock,
      SliderMock,
      SliderMock,
      SliderMock,
      SliderMock,
    ]);
  }, []);

  return (
    <Container
      className="visual"
      bgImg={require('assets/images/home_header_bg.jpg')}
    >
      <div className="visual-content">
        <Slider slider={slider} isMobile={isMobile} />
      </div>
    </Container>
  );
};

export default HeaderSection;

const Container = styled.div<{ bgImg: string }>`
  background-image: url(${props => props.bgImg});
  background-size: cover;
  padding: 104px 16px 56px;
  box-sizing: border-box;
  margin-bottom: 56px;

  .visual-content {
    ${maxWidth}
  }
`;
