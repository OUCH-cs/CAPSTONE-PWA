import styled from "@emotion/styled";
import LogoIcon from "@/shared/assets/common/logo.svg?react";

export default function Logo({
  width = 95,
  height = 95,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <Container>
      <LogoIconWrapper>
        <LogoIcon width={width} height={height} />
      </LogoIconWrapper>
      <BackDrop $width={width} $height={height} />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const LogoIconWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const BackDrop = styled.div<{ $width: number; $height: number }>`
  position: absolute;
  top: 20%;
  left: 7%;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  border-radius: 20px;
  background-color: rgba(0, 97, 108, 0.6);
  filter: blur(20px);
`;
