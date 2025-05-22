import styled from "@emotion/styled";
import Option from "@/shared/assets/mypage/option.svg?react";

const TopHeader = () => {
  return (
    <Header>
      <Location>
        <PageText>My page</PageText>
      </Location>
      <LangText>ENG</LangText>
      <OptionWrapper>
        <Option width="20px" height="20px" />
      </OptionWrapper>
    </Header>
  );
};

export default TopHeader;

// 스타일 그대로 분리
const Header = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px;
  margin-bottom: 40px;
  position: relative; /* 부모 요소에 relative position 추가 */
`;

const Location = styled.div`
  display: flex;
`;

const PageText = styled.p`
  font-size: 20px;
  font-weight: 500;
  white-space: nowrap; 
`;

const LangText = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin-right: 30px; 
  white-space: nowrap; 
`;

const OptionWrapper = styled.div`
  position: absolute;
  right: 16px; 
  top: 30px;
  transform: translateY(-50%); 
`;
