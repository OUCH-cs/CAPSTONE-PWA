import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import GuideCategories from "@/features/main/ui/GuideCategories";
import { GuideQuestions } from "@/features/main/ui/GuideQuestions";

function GuidePage () {
    return(
        <Container>
            <Title>OUCH guide</Title>
            <GuideCategories></GuideCategories>
            <GuideQuestions/>
        </Container>

    )
}

export {GuidePage}

const Container = styled.div`
  background-color: ${theme.colors.background};
  padding: 0 16px;
  overflow-y: auto;
`;

const Title = styled.p`
  font-size: 1.7rem;
  font-weight: 500;
  text-align: center;
  padding: 1.5rem;
  margin-bottom: 2.3rem;
`;
