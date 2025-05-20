import styled from "@emotion/styled";
import ArrowIcon from "@/shared/assets/common/backarrow.svg?react";
import { useNavigate} from "react-router-dom";

const EditHeader = () => {
     const navigate = useNavigate();

  return (
    <Header>
      <BackButton onClick={() => navigate("/mypage")}>
          <ArrowIcon width="25px" height="25px" stroke="black" />
        </BackButton>
        <TitleText>Edit Profile</TitleText>
    </Header>
  );
};

export default EditHeader;


const Header = styled.div`
  margin-top: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 16px;
  margin-bottom: 40px;
  position: relative; 

`;

const TitleText = styled.p`
  font-size: 20px;
  font-weight: 500;
  white-space: nowrap; 
  position: absolute;  /* TitleText를 중앙에 위치시킴 */
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
   position: absolute;  /* ArrowIcon을 왼쪽으로 고정 */
  left: 16px;  /* 왼쪽에서 16px 떨어지게 배치 */
`;

