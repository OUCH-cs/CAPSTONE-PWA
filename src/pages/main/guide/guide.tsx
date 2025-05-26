import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import GuideCategories from "@/features/main/ui/GuideCategories";
import { GuideQuestions } from "@/features/main/ui/GuideQuestions";
import { GuideHeader } from "@/features/main/ui/GuideHeader";

function GuidePage () {
    return(
        <Container>
            <GuideHeader/>
            <GuideCategories></GuideCategories>
            <GuideQuestions/>
        </Container>
    )
}

export {GuidePage}

const Container = styled.div`
  background-color: ${theme.colors.background};
  padding: 0 16px;
  overflow: hidden;
`;
