import micIcon from "@/shared/assets/common/mic.svg";

interface IRecordingIndicatorProps {
  children: React.ReactNode;
}

export default function RecordingIndicator({
  children,
}: IRecordingIndicatorProps) {
  return (
    <div className="flex justify-center items-center w-[205px] h-[205px] rounded-[100px] border border-solid border-[#E2F2F3] ">
      <div className="flex justify-center items-center w-[173px] h-[173px] rounded-[100px] bg-primary shadow-[10px_10px_30px_rgba(1,156,173,0.4),-10px_-10px_30px_rgba(1,156,173,0.3),0px_8px_8px_rgba(0,0,0,0.12)]">
        <div className="flex flex-col justify-center items-center w-[129px] h-[129px] border border-solid border-[#44ADB8] rounded-[100px]">
          <div className="flex justify-center items-center">
            <img src={micIcon} alt="mic-icon" />
          </div>
          <span className="text-[14px] font-normal text-[white]">
            {children}
          </span>
        </div>
      </div>
    </div>
  );
}
