import styled from "@emotion/styled";
import ArrowIcon from "@/shared/assets/common/backarrow.svg?react";


const Bottom = ({ setIsAuth }: { setIsAuth: (value: boolean) => void }) => {
  return (
    <Header>
      <Section>
        <TitleText>Notice</TitleText>
        <StyledArrowIcon width="20px" height="20px" />
      </Section>
      <Section>
        <TitleText>Feedback</TitleText>
        <StyledArrowIcon width="20px" height="20px" />
      </Section>
      <Section>
        <TitleText>Customer Service</TitleText>
        <StyledArrowIcon width="20px" height="20px" />
      </Section>
      <Section>
        <LogoutButton onClick={() => setIsAuth(false)}>Log out</LogoutButton>
      </Section>
    </Header>
  );
};

export default Bottom;

const Header = styled.div`
  margin-top: 20px;
  border-radius: 20px 20px 0px 0px;
  background-color: #fff;
  box-shadow: 2px 0px 4px 0px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  height:100vh;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
`;

const TitleText = styled.p`
  color: #000;
  font-size: 16px;
  font-weight: 400;
  margin-top: 24px;
  margin-bottom: 12px;
  margin-left: 16px;
  white-space: nowrap;
`;

const StyledArrowIcon = styled(ArrowIcon)`
  stroke: #767676;
  margin-top: 24px;
  margin-bottom: 12px;
  transform: rotate(180deg);
  margin-right: 16px;
`;

const LogoutButton = styled.button`
  margin-top: 25px;
  margin-left:16px;
  cursor: pointer;
  font-size: 16px;
  color: #DC0000;
  padding:0;
  background-color: transparent;
  
`;
