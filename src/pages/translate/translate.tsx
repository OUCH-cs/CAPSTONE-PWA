import RecordingIndicator from "../../components/translate/RecordingIndicator";
import Button from "../../components/translate/Button";
import { useState } from "react";

export default function TranslatePage() {
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center gap-[100px] h-screen pt-[50%]">
      <RecordingIndicator>Recording...</RecordingIndicator>
      <div className="flex gap-[10px]">
        <Button disabled={isTranslating}>Start</Button>
        <Button disabled={!isTranslating}>Finish</Button>
      </div>
    </div>
  );
}
