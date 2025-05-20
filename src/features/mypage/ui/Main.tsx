import styled from "@emotion/styled";
import Profile from "@/shared/assets/mypage/profile.svg?react";
import EditIcon from "@/shared/assets/common/edit-icon.svg?react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Main = () => {
  const navigate = useNavigate();
  const [nickname] = useState(""); 
  const [email] = useState("");       

  

  const handleEditIconPress = () => {
    navigate("/mypage/editprofile");
  };

  return (
    <Container>
      <Header>
        <Profile width="60px" height="60px" />
        <EditIconWrapper onClick={handleEditIconPress}>
          <EditIcon width={12} height={12} />
        </EditIconWrapper>
      </Header>
      <Information>
        <NameText>{nickname || "닉네임"}</NameText>
        <MailText>{email || "이메일"}</MailText>
      </Information>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const EditIconWrapper = styled.div`
  position: absolute;
  display: flex;
  width: 20px;
  height: 20px;
  bottom: 0;
  right: 0;
  padding: 3px;
  border-radius: 100px;
  background: #fff;
  cursor: pointer;
`;

const NameText = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #000000;
`;

const MailText = styled.p`
  margin-top: 2px;
  font-size: 14px;
  font-weight: 400;
  color: #505050;
`;
