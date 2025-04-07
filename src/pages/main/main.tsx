import styled from "@emotion/styled";
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
          <p style={{ fontSize: "1.2rem", marginLeft: "0.5rem" }}>Banseok-dong</p>
        </Location>
        <p style={{ fontSize: "1.4rem" }}>ENG</p>
      </Header>

      <Link to="/self-diagnosisFAQ">
        <DiagnosisCard>
          <HomeDiagnosis />
          <p style={{ fontSize: "1.5rem", textAlign: "center" }}>
            Let’s fill out the <span style={{ color: theme.colors.primary }}>self-diagnosis form</span> to explain your disease!
          </p>
        </DiagnosisCard>
      </Link>

      <ButtonContainer>
        <ActionButton>
          <HomeCamera />
          <p style={{ fontSize: "1.2rem" }}>Text translation</p>
        </ActionButton>
        <SelectedButton>
          <HomeGuide />
          <p style={{ fontSize: "1.2rem", color: theme.colors.primary }}>OUCH guide</p>
        </SelectedButton>
      </ButtonContainer>

      <p style={{ fontSize: "1.57rem", marginBottom: "1.5rem" }}>recommended hospital</p>

      <HospitalListWrapper>
        <HospitalList>
          {hospitals.map((item) => (
            <HospitalCard key={item.id}>
              <p style={{ fontSize: "1.4rem" }}>{item.name}</p>
              <p style={{ fontSize: "1.05rem", color: theme.colors.gray_7, marginBottom: 16 }}>
                {item.openStatus}
              </p>
              <HospitalInfo>
                <HospitalRate />
                <p style={{ fontSize: "1.05rem", color: theme.colors.yellow }}>{item.rating}</p>
                <p style={{ fontSize: "1.05rem" }}> · </p>
                <p style={{ fontSize: "1.05rem" }}>{item.distance}</p>
              </HospitalInfo>
            </HospitalCard>
          ))}
        </HospitalList>
      </HospitalListWrapper>
    </Container>
  );
}

export { MainPage };

const Container = styled.div`
  background-color: ${theme.colors.background};
  padding: 0 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 2.5rem;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
`;

const DiagnosisCard = styled.div`
  background-color: ${theme.colors.white};
  height: 18rem;
  border-radius: 20px;
  gap: 0.8rem;
  padding: 2.6rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.04);
  margin-bottom: 0.6rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.6rem;
  margin-bottom: 4.3rem;
`;

const ActionButton = styled.button`
  flex: 1;
  height: 10rem;
  background-color: ${theme.colors.white};
  border-radius: 20px;
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
`;

const SelectedButton = styled(ActionButton)`
  background-color: ${theme.colors.tertiary};
`;

const HospitalListWrapper = styled.div`
  overflow-x: auto;
  padding-bottom: 1rem;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

const HospitalList = styled.div`
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