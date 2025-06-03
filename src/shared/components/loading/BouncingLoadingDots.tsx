import styled from "@emotion/styled";

export default function BouncingLoadingDots({ size = 12 }: { size?: number }) {
  return (
    <LoadingDots>
      {Array.from({ length: 3 }).map((_, idx) => (
        <LoadingDot key={`loading-dot-${idx}`} $size={size} />
      ))}
    </LoadingDots>
  );
}

const LoadingDots = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;

const LoadingDot = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  animation: bounce 0.5s infinite alternate;

  &:nth-child(2) {
    animation-delay: 0.1s;
  }

  &:nth-child(3) {
    animation-delay: 0.2s;
  }

  @keyframes bounce {
    to {
      transform: translateY(-10px);
    }
  }
`;
