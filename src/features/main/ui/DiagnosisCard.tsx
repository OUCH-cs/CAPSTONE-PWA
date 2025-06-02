
import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import { Link } from "react-router-dom";
import HomeDiagnosis from "@/shared/assets/home/HomeDiagnosis";
import { Trans} from "react-i18next";

const HomeDiagnosisCard = () => {

  return (
    <StyledLink to="/self-diagnosis">
      <Card>
        <HomeDiagnosis/>
        <ResponsiveText>
          <Trans i18nKey="selfDiagnosisMessage" >
            Let’s fill out the <span>self-diagnosis form</span><br />to explain your disease!
          </Trans>
        </ResponsiveText>
      </Card>
    </StyledLink>
  );
};

export default HomeDiagnosisCard;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Card = styled.div`
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

const ResponsiveText = styled.p`
  font-size: 1.5rem;
  text-align: center;

  span {
    color: ${theme.colors.primary};
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }

  @media (max-width: 375px) {
    font-size: 1.3rem;
  }
`;