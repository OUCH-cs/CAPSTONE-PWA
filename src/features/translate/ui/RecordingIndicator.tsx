import styled from "@emotion/styled";
import micIcon from "@/shared/assets/common/mic.svg";

interface IRecordingIndicatorProps {
  children: React.ReactNode;
}

export default function RecordingIndicator({
  children,
}: IRecordingIndicatorProps) {
  return (
    <OuterContainer>
      <MiddleContainer>
        <InnerContainer>
          <MicContainer>
            <img src={micIcon} alt="mic-icon" />
          </MicContainer>
          <Text>{children}</Text>
        </InnerContainer>
      </MiddleContainer>
    </OuterContainer>
  );
}

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 205px;
  height: 205px;
  border: 1px solid #e2f2f3;
  border-radius: 100px;
`;

const MiddleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 173px;
  height: 173px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 100px;
  box-shadow: 10px 10px 30px rgba(1, 156, 173, 0.4),
    -10px -10px 30px rgba(1, 156, 173, 0.3), 0px 8px 8px rgba(0, 0, 0, 0.12);
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 129px;
  height: 129px;
  border: 1px solid #44adb8;
  border-radius: 100px;
`;

const MicContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: normal;
  color: white;
`;
