import styled from "@emotion/styled";
import { hospitals } from "@/shared/mock";
import HospitalRate from "@/shared/assets/hospital/HospitalRate.svg?react";
import theme from "@/shared/styles/theme";

function HospitalList() {
  return (
    <HospitalListWrapper>
      <HospitalItemList>
        {hospitals.map((item) => (
          <HospitalCard key={item.id}>
            <HospitalName>{item.name}</HospitalName>
            <HospitalStatus>{item.openStatus}</HospitalStatus>
            <HospitalInfo>
              <HospitalRate width={12} height={11} />
              <HospitalRating>{item.rating}</HospitalRating>
              <Dot> · </Dot>
              <HospitalDistance>{item.distance}</HospitalDistance>
            </HospitalInfo>
          </HospitalCard>
        ))}
      </HospitalItemList>
    </HospitalListWrapper>
  );
}

export { HospitalList };

const HospitalListWrapper = styled.div`
  overflow-x: auto;
  padding-bottom: 1rem;
  padding-bottom: 3rem; 
  margin-bottom: 3rem;  
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const HospitalItemList = styled.div`
  display: flex;
  gap: 0.7rem;
`;

const HospitalCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 auto;
  width: 20.3rem;
  height: 10rem;
  background-color: ${theme.colors.white};
  padding: 1.86rem;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

const HospitalInfo = styled.div`
  display: flex;
  align-items: center;
`;

const HospitalName = styled.p`
  font-size: 1.4rem;
`;

const HospitalStatus = styled.p`
  font-size: 1.05rem;
  color: ${theme.colors.gray_7};
  margin-bottom: 16px;
`;

const HospitalRating = styled.p`
  font-size: 1.05rem;
  color: ${theme.colors.yellow};
  margin-left: 0.4rem;
`;

const Dot = styled.p`
  font-size: 1.05rem;
  margin: 0 0.4rem;
`;

const HospitalDistance = styled.p`
  font-size: 1.05rem;
`;