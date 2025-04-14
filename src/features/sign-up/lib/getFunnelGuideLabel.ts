const getFunnelGuideLabel = (label: string) => {
  const gudiesLabel: Record<string, string> = {
    name: "Enter Your Name",
    gender: "Select Your Gender",
    country: "Select Your Home Country",
    phone: "Enter Your Phone Number",
    email: "Enter Your Email",
    id: "Set your ID",
    pw: "Set your Password",
    nickname: "Set your Nickname",
  };

  return gudiesLabel[label] || "";
};

export { getFunnelGuideLabel };
