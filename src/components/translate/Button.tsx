import clsx from "clsx";

interface ITranslateTriggerBtnProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

export default function TranslateTriggerBtn({
  children,
  disabled,
  ...props
}: ITranslateTriggerBtnProps) {
  return (
    <button
      {...props}
      className={clsx(
        "w-[120px] h-[52px] rounded-[20px] text-[16px] font-medium",
        disabled ? "bg-[#E5E5EC] text-[#767676]" : "bg-primary text-white"
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
