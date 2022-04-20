import { Link } from 'react-router-dom';
import { maxWidth } from 'styles/mixin';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { SignInWithSocialMedia } from '../../service/auth';
import { Providers } from '../../service/firebase';

import colors from 'styles/colors';
import styled, { css } from 'styled-components';

interface Props {
  navType: string;
}

const Navbar = ({ navType }: Props) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    changeBackground();
    window.addEventListener('scroll', changeBackground);
    return () => window.removeEventListener('scroll', changeBackground);
  }, []);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const changeLogo = !isScrolled && navType === 'main' ? 'white' : 'primary';

  return (
    <Container
      className={`${navType}-navbar`}
      isScrolled={isScrolled}
      navType={navType}
    >
      <div className="inner">
        <Logo>
          <Link className={changeLogo} to="/">
            caffein
          </Link>
        </Logo>

        <Link
          to={`/auth`}
          // onClick={() => SignInWithSocialMedia(Providers.google)}
        >
          {/* home에서 스크롤을 하지 않을때만 navar 로고 흰색 */}
          {!isScrolled && navType === 'main' ? (
            <Button>
              <img
                className="ic-person"
                src={require('assets/images/icons/ic-person-white.png')}
                alt="프로필"
              />
            </Button>
          ) : (
            // 그 외
            <Button>
              <img
                className="ic-person"
                src={require('assets/images/icons/ic-person-primary.png')}
                alt="프로필"
              />
            </Button>
          )}
        </Link>
      </div>
    </Container>
  );
};

export default observer(Navbar);

const Container = styled.nav<{
  isScrolled: boolean;
  navType: string;
}>`
  ${props =>
    props.navType === 'sub'
      ? css`
          background-color: white;
        `
      : css`
          background-color: transparent;
        `}

  ${props =>
    props.isScrolled &&
    css`
      background-color: white;
      transition: 0.5s;
    `}

    .inner {
    ${maxWidth}
    display: flex;
    justify-content: space-between;
    padding: 20px;
    gap: 20px;
  }
`;

const Logo = styled.h1`
  font-size: 23px;
  font-weight: 600;

  .white {
    color: white;
  }

  .primary {
    color: ${colors.primary1};
  }
`;

const Button = styled.button`
  .ic-person {
    width: 24px;
    height: 24px;
  }
`;
