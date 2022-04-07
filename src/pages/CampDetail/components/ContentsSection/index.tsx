/* eslint-disable no-loop-func */

import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ICampDetail } from 'types/CampDetail';
import { DetailSidebar, DetailReviews } from '../../components';
import { Padding } from 'components';

interface IProps {
  targetCamp: ICampDetail;
}

const ContentsSection = ({ targetCamp }: IProps) => {
  const containerRef = useRef<any>(null); // TODO: type 뭘로?
  const imgRef = useRef<any>(null);
  const [height, setHeight] = useState<number>(0);

  const getHeight = () => {
    const newHeight = containerRef.current.clientHeight;
    setHeight(newHeight);
  };

  // TODO: 리팩토링 필요
  const onloadImages = useCallback(() => {
    const imgs = imgRef.current.querySelectorAll('img');
    const len: number = imgs.length;
    let count: number = 0;

    for (let img of imgs) {
      img.onload = () => {
        count++;
        if (count === len) getHeight();
      };
    }
  }, []);

  useEffect(() => {
    targetCamp && onloadImages();
  }, [onloadImages, targetCamp]);

  return (
    <Container ref={containerRef}>
      <DetailSidebar targetCamp={targetCamp} sidebarheight={height} />
      <div className="inner">
        <div className="wrap">
          <h1>
            대답없는 VOD 강의에 <strong>라이브</strong>로 답하다.
          </h1>
          <p>
            React만큼은 실무에 제대로 활용할 수 있도록, <br></br>
            오프라인 강의와 온라인 VOD의 장점만 모았습니다.
          </p>

          <InfoBox>
            <article>
              <h2>LIVE CLASS</h2>
              <p>라이브로 묻고 해답을 얻으세요.</p>
            </article>

            <hr className="line" />

            <article>
              <h2>KEEP DOING</h2>
              <p>미루지 말고 실시간으로 만나요.</p>
            </article>

            <hr className="line" />

            <article>
              <h2>CAN DO</h2>
              <p>실무 과제를 풀며 제대로 활용해요.</p>
            </article>
          </InfoBox>

          <ImageBox ref={imgRef}>
            {targetCamp.images &&
              targetCamp.images.map((img, index) => (
                <article key={index}>
                  <img src={img} alt="camp-detail-img" />
                  <Padding height={'60px'} />
                </article>
              ))}
          </ImageBox>
        </div>
      </div>
      <DetailReviews reviews={targetCamp.reviews} />
    </Container>
  );
};

export default ContentsSection;

const Container = styled.div`
  letter-spacing: 0.1px;

  h1 {
    font-size: 24px;
    font-weight: 600;
    line-height: 28px;
    margin: 20px 0;
    color: #040505;

    strong {
      color: #971818;
    }
  }

  p {
    font-size: 17px;
    font-weight: 400;
    line-height: 25px;
    color: #3c4144;
  }
`;

const InfoBox = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 18px 24px;
  margin-top: 20px;
  background-color: #fcfcfc;

  article {
    position: relative;

    h2 {
      display: flex;
      align-items: center;
      font-size: 17px;
      font-weight: 600;
      line-height: 30px;
      color: #202325;
    }

    p {
      font-size: 15px;
      line-height: 20px;
      font-weight: 400;
      color: #595f63;
      letter-spacing: 0.2px;
    }
  }

  .line {
    border-left: 1px;
    border-color: #eaecee;
    height: inherit;
  }
`;

const ImageBox = styled.section``;
