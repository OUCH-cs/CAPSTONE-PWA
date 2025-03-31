import styled from "@emotion/styled";
import ScrollContainer from "react-indiana-drag-scroll";
import theme from "@/shared/styles/theme";
import HomeCamera from "@/shared/assets/home/HomeCamera";
import HomeDiagnosis from "@/shared/assets/home/HomeDiagnosis";
import HomeGuide from "@/shared/assets/home/HomeGuide";
import HomeLocation from "@/shared/assets/home/HomeLocation";
import HospitalRate from "@/shared/assets/hospital/HospitalRate";
import { Link } from "react-router-dom";
import { hospitals } from "@/shared/mock";

function MainPage() {
  return (
    <Container>
      <Header>
        <Location>
          <HomeLocation />
          <p style={{ fontSize: 14, marginLeft: 8 }}>Banseok-dong</p>
        </Location>
        <p style={{ fontSize: 16, fontWeight: "bold" }}>ENG</p>
      </Header>
      
      <Link to="/self-diagnosis">
        <DiagnosisCard>
          <div>
            <HomeDiagnosis/>
          </div>
          <p style={{ fontSize: 18, textAlign: "center", color: theme.colors.black }}>
            Let’s fill out the <span style={{ color: theme.colors.primary }}>self-diagnosis form</span> to explain your disease!
          </p>
        </DiagnosisCard>
      </Link>

      <ButtonContainer>
        <ActionButton>
          <HomeCamera style={{ marginBottom: 6 }} />
          <p style={{ fontSize: 14 }}>Text translation</p>
        </ActionButton>
        <SelectedButton>
          <HomeGuide style={{ marginBottom: 6 }} />
          <p style={{ fontSize: 14, color: theme.colors.primary }}>OUCH guide</p>
        </SelectedButton>
      </ButtonContainer>

      <p style={{ fontSize: 18, marginBottom: 20 }}>recommended hospital</p>
      <ScrollContainer vertical={false} hideScrollbars={true}>
        <HospitalList>
          {hospitals.map((item) => (
            <HospitalCard key={item.id}>
              <p style={{ fontSize: 16 }}>{item.name}</p>
              <p style={{ fontSize: 12, color: theme.colors.gray_7, marginBottom:16}}>
                {item.openStatus}
              </p>
              <HospitalInfo>
                <HospitalRate />
                <p style={{ fontSize: 12, color: theme.colors.yellow }}>{item.rating}</p>
                <p style={{ fontSize: 12 }}> · </p>
                <p style={{ fontSize: 12 }}>{item.distance}</p>
              </HospitalInfo>
            </HospitalCard>
          ))}
        </HospitalList>
      </ScrollContainer>
    </Container>
  );
}

export { MainPage };

// 같은 파일 or 별도 styles.tsx
const Container = styled.div`
  background-color: ${theme.colors.background};
  padding: 0 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 0;
  margin-bottom: 36px;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
`;

const DiagnosisCard = styled.div`
  background-color: ${theme.colors.white};
  height: 202px;
  border-radius: 20px;
  padding: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 8px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 60px;
`;


const ActionButton = styled.button`
  flex: 1;
  height: 120px;
  background-color: ${theme.colors.white};
  border-radius: 20px;
  padding: 35px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

const SelectedButton = styled(ActionButton)`
  background-color: ${theme.colors.tertiary};
`;

const HospitalList = styled.div`
  display: flex;
  gap: 10px;
`;

const HospitalCard = styled.div`
  flex: 0 0 auto;
  width: 236px;
  height: 120px;
  background-color: ${theme.colors.white};
  padding: 26px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  cursor: pointer;
`;

const HospitalInfo = styled.div`
  display: flex;
  align-items: center;
`;