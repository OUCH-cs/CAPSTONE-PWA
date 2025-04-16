import styled from "@emotion/styled";
import HomeLocation from "@/shared/assets/home/HomeLocation.svg?react";

const MainHeader = () => {
  return (
    <Header>
      <Location>
        <HomeLocation width={"16px"} height={"21px"} />
        <LocationText>Banseok-dong</LocationText>
      </Location>
      <LangText>ENG</LangText>
    </Header>
  );
};

export default MainHeader;

// 스타일 그대로 분리
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2.5rem;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
`;

const LocationText = styled.p`
  font-size: 1.2rem;
  margin-left: 0.5rem;
`;

const LangText = styled.p`
  font-size: 1.4rem;
`;