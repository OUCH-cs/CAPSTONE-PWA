// RecordsPage.tsx
import MainDetail from '@/features/records/ui/MainDetail'
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

function RecordsPage() {
  const {t} = useTranslation();



  return (
    <Container>
      <Title>{t("Medical Document")}</Title>
        <MainDetail />
    </Container>
  );
}

const Container = styled.div`
  background-color: #f5f9fc;
  margin: 0 16px 0 16px;
  padding-top:28px;
`;
const Title = styled.p`
  font-size:24px;
  font-weight:500;
  text-align:center;
`;

export { RecordsPage };
