import { Padding } from 'components';
import {
  HeaderSection,
  CampSection,
  HomeBanner,
  CommunitySection,
} from './components';
import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import CampStroe from 'stores/CampsStore';

import { maxWidth } from 'styles/mixin';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import CommunityStore from 'stores/CommunityStore';
import CardSectionSkeleton from 'components/UI/Skeleton/CardSectionSkeleton';

const Home = () => {
  const isDesktop = useMediaQuery({
    query: '(min-width: 768px)',
  });

  const campStore = useContext(CampStroe);

  const communityStore = useContext(CommunityStore);

  useEffect(() => {
    campStore.fetchCampsPopular();
    campStore.fetchCampsSale();
    communityStore.fetchCommunites();
  }, [campStore, communityStore]);

  return (
    <Container>
      <HeaderSection />
      <main className="contents">
        {campStore.campPopular ? (
          <CampSection
            title="지금 가장 인기있는 캠프에요"
            camps={campStore.campPopular}
          />
        ) : (
          <CardSectionSkeleton />
        )}

        <Padding height="40px" />

        {campStore.campSales ? (
          <CampSection
            title="곧! 캠프 할인이 마감돼요"
            camps={campStore.campSales}
            isHeadField
          />
        ) : (
          <CardSectionSkeleton />
        )}

        <Padding height="40px" />

        <HomeBanner
          text={`현직자와 소통하며 배우는\n실무 스킬, 퍼스널 트레이닝`}
        />
        {isDesktop && <Padding height="55px" />}

        {communityStore.communities ? (
          <CommunitySection
            title="커뮤니티에서 지금 만나요"
            communities={communityStore.communities}
          />
        ) : (
          <CardSectionSkeleton />
        )}

        {isDesktop && <Padding height="240px" />}
      </main>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;

  main {
    ${maxWidth}
  }
`;

export default observer(Home);
