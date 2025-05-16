import styled from "@emotion/styled";

/**
 * Skeleton 컴포넌트는 로딩 상태를 시각적으로 나타내기 위해 사용됩니다.
 *
 * @param {number} width - Skeleton 컴포넌트의 너비
 * @param {number} height - Skeleton 컴포넌트의 높이
 *
 * @example
 * <Skeleton width={300} height={100} />
 *
 * @example
 * {Array.from({ length: 3 }).map((_, index) => (
 *   <Skeleton key={index} width={300} height={100} />
 * ))}
 */

export default function Skeleton({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return <Container $width={width} $height={height} />;
}

const Container = styled.div<{ $width: number; $height: number }>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  border-radius: 10px;

  @keyframes skeletonLoading {
    0% {
      background-color: #f0f0f0;
    }
    100% {
      background-color: #e6edf5;
    }
  }

  animation: skeletonLoading 0.7s linear infinite alternate;
`;
