import GuideRoutingButton from "@/entities/translate/ui/GuideRoutingButton";
import MuteToggleButton from "@/entities/translate/ui/MuteToggleButton";
import TranslateMicIndicator from "@/entities/translate/ui/TranslateMicIndicator";
import { Button } from "@/shared/components/button/Button";
import useToggle from "@/shared/lib/useToggle";
import styled from "@emotion/styled";
import GuideFunnelModal from "./guide/GuideFunnelModal";
import { useTranslation } from "react-i18next";

interface TranslateSessionViewProps {
  isMuted: boolean;
  toggleMuted: () => void;
  toggle: () => void;
}

export default function TranslateSessionView({
  isMuted,
  toggleMuted,
  toggle,
}: TranslateSessionViewProps) {
  const {t} = useTranslation();
  const { isOpen: isFunnelModalOpen, toggle: isFunnelModalToggle } =
    useToggle(); // 통역 가이드 퍼털 모달 토글 훅

  return (
    <>
      <Container>
        {/* 가이드 라우팅 버튼 */}
        <GuideRoutingButton toggle={isFunnelModalToggle} />

        {/* 통역 마이크 아이콘 */}
        <TranslateMicIndicator />

        {/* 음소거 버튼 */}
        <MuteToggleButton
          isModalMode={false}
          isMuted={isMuted}
          toggleMuted={toggleMuted}
        />

        {/* 종료 버튼 */}
        <Button width={112} height={52} onClick={toggle}>
          {t("Finish")}
        </Button>
      </Container>

      {/* 통역 가이드 퍼널 모달 */}
      <GuideFunnelModal
        isOpen={isFunnelModalOpen}
        toggle={isFunnelModalToggle}
        isMuted={isMuted}
        toggleMuted={toggleMuted}
      />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
