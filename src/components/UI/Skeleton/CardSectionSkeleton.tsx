import styled from 'styled-components';

import Skeleton from 'components/UI/Skeleton';
import fonts from 'styles/fonts';

const CardSectionSkeleton = () => {
  return (
    <Container>
      <div className="section-title">
        <Skeleton
          style={{ width: 200, height: 38, borderRadius: '4px' }}
          animated
        />
      </div>
      <div className="camp-cards">
        <Skeleton
          style={{ width: '100%', height: 280, borderRadius: '10px' }}
          animated
        />
        <Skeleton
          style={{ width: '100%', height: 280, borderRadius: '10px' }}
          animated
        />
        <Skeleton
          style={{ width: '100%', height: 280, borderRadius: '10px' }}
          animated
        />
        <Skeleton
          style={{ width: '100%', height: 280, borderRadius: '10px' }}
          animated
        />
      </div>
    </Container>
  );
};

export default CardSectionSkeleton;

const Container = styled.section`
  padding: 0px 16px;
  .section-title {
    ${fonts.H1};
    padding-bottom: 8px;
  }
  .camp-cards {
    @media (min-width: 680px) {
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }
  }
`;
