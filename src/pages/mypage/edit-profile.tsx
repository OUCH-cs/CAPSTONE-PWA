import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import EditHeader from "@/features/mypage/ui/EditHeader";
import EditMain from "@/features/mypage/ui/EditMain";
import EditForm from "@/features/mypage/ui/EditForm";


export default function EditProfile() {

  return (
    <Container>
      <EditHeader/>
      <EditMain/>
      <EditForm/>
    </Container>
  );
}


const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.background};
   height: 90vh; 
  overflow: hidden; 
  
`;