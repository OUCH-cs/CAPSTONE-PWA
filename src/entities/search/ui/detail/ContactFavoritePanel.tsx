import theme from "@/shared/styles/theme";
import styled from "@emotion/styled";
import CallIcon from "@/shared/assets/search/call.svg?react";
import FavoriteIcon from "@/shared/assets/search/favorite.svg?react";
import { useState } from "react";

export default function ContactFavoritePanel({ tel }: { tel: string }) {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleClickLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Link 이동 방지
    setIsLiked((prev) => !prev);
  };

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
        <LikeActionButton $isLiked={isLiked} onClick={handleClickLike}>
          <FavoriteIcon width={24} height={24} strokeWidth={2} />
        </LikeActionButton>
        Favorite
      </FavoriteWraper>
    </Container>
  );
}

const Container = styled.section`
  display: flex;

  width: 328px;
  height: 80px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: ${theme.colors.white};
`;

const WrapperBase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 14px;
  font-weight: 400;
  color: black;
`;

const CallWrapper = styled(WrapperBase)``;
const FavoriteWraper = styled(WrapperBase)`
  flex-direction: column;
  gap: 3px;
`;

const IconWrapper = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background-color: transparent;
`;

const LikeActionButton = styled.button<{ $isLiked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px
  height: 30px;
  fill: ${({ $isLiked }) => ($isLiked ? "#FF3332" : "none")};
  stroke: ${({ $isLiked }) => ($isLiked ? "#FF3332" : "black")};
  background-color: transparent;
  padding: 0;
  border: none;
  cursor: pointer;
`;
