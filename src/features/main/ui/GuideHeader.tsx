
import styled from "@emotion/styled";
import BackArrowIcon from "@/shared/assets/common/arrow.svg?react";
import { useNavigate } from "react-router-dom";

function GuideHeader() {
  const navigate = useNavigate();

  return (
    <Container>
      <HeaderWrapper>
        <BackwardIconWrapper onClick={() => navigate("/")}>
          <BackArrowIcon width={28} height={28} />
        </BackwardIconWrapper>
        <Title>OUCH guide</Title>
      </HeaderWrapper>
    </Container>
    
  );
}

export { GuideHeader };

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 360px;
  max-width: 450px;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
 

`

const Title = styled.p`
  font-size: 1.7rem;
  font-weight: 500;
  text-align: center;
`;


const BackwardIconWrapper = styled.div`
  position: absolute;
  left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(90deg);
`;


