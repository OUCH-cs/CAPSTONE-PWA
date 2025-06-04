import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import ReviewHeader from "@/features/mypage/ui/ReviewHeader";
import ReviewAccordion from "@/features/mypage/ui/ReviewAccordion";


export default function EditProfile() {

  return (
    <Container>
      <ReviewHeader/>
      <ReviewAccordion/>
    </Container>
  );
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.background};
  min-height: 90vh;  
`;