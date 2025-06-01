import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import GuideCategories from "@/features/main/ui/GuideCategories";
import { GuideQuestions } from "@/features/main/ui/GuideQuestions";
import { GuideHeader } from "@/features/main/ui/GuideHeader";
import { useSetAtom } from "jotai";
import { selectedCategoriesAtom } from "../../../features/main/service/guideAtoms";
import { useEffect } from "react";

function GuidePage () {
    const setSelectedCategory = useSetAtom(selectedCategoriesAtom);

    useEffect(() => {
      // 컴포넌트 언마운트 시 초기화
      return () => {
        setSelectedCategory(""); // ✅ 카테고리 초기화
      };
    }, []);

    return(
        <Container>
            <GuideHeader/>
            <GuideCategories/>
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
