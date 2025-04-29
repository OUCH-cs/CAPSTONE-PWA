const getFunnelGuideLabel = (label: string) => {
  const gudiesLabel: Record<string, string> = {
    name: "Enter Your Name",
    gender: "Select Your Gender",
    nationId: "Select Your Home Country",
    phoneNumber: "Enter Your Phone Number",
    email: "Enter Your Email",
    loginId: "Set your ID",
    password: "Set your Password",
    nickname: "Set your Nickname",
  };

  return gudiesLabel[label] || "";
};

export { getFunnelGuideLabel };
