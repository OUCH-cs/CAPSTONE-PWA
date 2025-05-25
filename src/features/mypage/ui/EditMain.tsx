import styled from "@emotion/styled";
import Profile from "@/shared/assets/mypage/profile.svg?react";
import Camera from "@/shared/assets/mypage/camera.svg?react"; 
import { useEffect, useState } from "react";
import { getInformation } from "@/features/mypage/service/MyPageApi";

const EditMain = () => {
  const [nickname, setNickname] = useState(""); 
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getInformation();
      if (response && response.data) {
        setNickname(response.data.nickname || "");
        setEmail(response.data.email || "");
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Header>
        <Profile width="60px" height="60px" />
        <CameraWrapper> 
          <Camera width={12} height={12} />
        </CameraWrapper>
      </Header>
      <Information>
        <NameText>{nickname || "닉네임"}</NameText>
        <MailText>{email || "이메일"}</MailText>
      </Information>
    </Container>
  );
};

export default EditMain;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  align-items: center;
  text-align: center;
`;

const CameraWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 20px;
  bottom: 0;
  right: 0;
  height: 20px;
  padding: 3px;
  border-radius: 100px;
  background: #FFF;
`;

const NameText = styled.p`
  font-size: 18px;
  font-weight: 500;
`;

const MailText = styled.p`
  margin-top: 2px;
  font-size: 14px;
  font-weight: 400;
  color: #505050;
`;
