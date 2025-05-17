import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import HomeCamera from "@/shared/assets/home/HomeCamera.svg?react";
import HomeGuide from "@/shared/assets/home/HomeGuide.svg?react";
import HomeActionButton from "@/features/main/ui/HomeActionButton";
import {HospitalList} from "@/features/main/ui/HospitalList";
import HomeDiagnosisCard from "@/features/main/ui/DiagnosisCard";
import MainHeader from "@/features/main/ui/MainHeader";
import { useNavigate } from "react-router-dom";


function MainPage() {
  const navigate = useNavigate()

  return (
    <Container>
      <MainHeader/>
      <HomeDiagnosisCard/>
      <ButtonContainer>
        <HomeActionButton icon={<HomeCamera width={29} height={29}/>} label="Text translation" />
        <HomeActionButton 
          onClick = {()=>{navigate("/guide")}} 
          icon={<HomeGuide width={29} height={28} />} 
          label="OUCH guide" 
          selected />
      </ButtonContainer>  
      <HospitalList/>
    </Container>
  );
}

export { MainPage };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${theme.colors.background};
  padding: 0 1rem;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
  margin-bottom: 4.3rem;
`;



