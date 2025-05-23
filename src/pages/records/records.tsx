// RecordsPage.tsx
import  { useEffect } from 'react';
import MainDetail from '@/features/records/ui/MainDetail'
import styled from '@emotion/styled';

function RecordsPage() {

  useEffect(() => {
    document.body.style.overflow = 'hidden';  // 페이지에서 스크롤 숨기기
    return () => {
      document.body.style.overflow = '';  
    };
  }, []);

  return (
    <Container>
      <Title>Medical Document</Title>
        <MainDetail />
    </Container>
  );
}

const Container = styled.div`
  background-color: #f5f9fc;
  margin: 28px 16px 0 16px;
`;
const Title = styled.p`
  font-size:24px;
  font-weight:500;
  text-align:center;
`;

export { RecordsPage };
