import styled from "@emotion/styled";
import ProfileIcon from "@/shared/assets/translate/doctor.svg?react";

export default function Profile() {
  return (
    <Container>
      <ProfileIcon />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
