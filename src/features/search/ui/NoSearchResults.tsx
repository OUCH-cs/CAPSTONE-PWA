import styled from "@emotion/styled";
import SearchIcon from "@/shared/assets/search/search.svg?react";
import theme from "@/shared/styles/theme";

export default function NoSearchResults() {
  return (
    <Container>
      <IconWrapper>
        <SearchIcon width={30} height={30} fill="#767676" strokeWidth={3} />
      </IconWrapper>

      <p>
        No matching
        <br />
        healthcare facilities found.
      </p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding-top: 200px;

  & p {
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    color: black;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: ${theme.colors.white};
  border-radius: 16px;
`;
