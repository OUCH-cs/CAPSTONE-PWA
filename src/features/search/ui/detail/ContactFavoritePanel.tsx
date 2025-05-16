import theme from "@/shared/styles/theme";
import styled from "@emotion/styled";
import CallIcon from "@/shared/assets/search/call.svg?react";
import FavoriteIcon from "@/shared/assets/search/favorite.svg?react";

export default function ContactFavoritePanel({ tel }: { tel: string }) {
  return (
    <Container>
      <CallWrapper>
        <a href={`tel:${tel}`}>
          <IconWrapper>
            <CallIcon />
            Call
          </IconWrapper>
        </a>
      </CallWrapper>

      <FavoriteWraper>
        <IconWrapper>
          <FavoriteIcon />
          Favorite
        </IconWrapper>
      </FavoriteWraper>
    </Container>
  );
}

const Container = styled.section`
  display: flex;

  width: 328px;
  height: 80px;
  border-radius: 10px;
  background-color: ${theme.colors.white};
`;

const WrapperBase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const CallWrapper = styled(WrapperBase)``;
const FavoriteWraper = styled(WrapperBase)``;

const IconWrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background-color: transparent;
`;
