import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import ArrowIcon from "@/shared/assets/common/backarrow.svg?react";
import DeleteIcon from "@/shared/assets/common/delete-icon.svg?react";
import { getDiagnosis, deleteDiagnosis } from "@/features/records/service/diagnosisApi";
import Modal from "@/shared/components/modal/Modal";
import AddIcon from "@/shared/assets/records/diagnosis-add.svg?react";
import NoneDiagnosis from "@/features/records/ui/NoneDiagnosis";
import { useTranslation } from "react-i18next";
import { FloatingButton } from "@/shared/components/button/FloatingButton";
import { useSetAtom } from "jotai";
import { isAuthAtom } from "@/features/sign-in/services/atoms";


export type DiagnosisRecord = {
  diagnosisId: number;
  visitType: "HOSPITAL" | "PHARMACY" ; 
  symptoms: string;
  duration:
  | "LESS_THAN_A_DAY"
  | "ONE_TO_3_DAYS"
  | "MORE_THAN_3_DAYS"
  | "MORE_THAN_A_WEEK"
  | "MORE_THAN_A_MONTH";
  painSeverity: number;
  additionalNote: string;
  createdAt: string;
};

export default function DiagnosisList() {
  const {t} =  useTranslation()
  const navigate = useNavigate();
  const [diagnosisList, setDiagnosisList] = useState<DiagnosisRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);
  const setIsAuth = useSetAtom(isAuthAtom);
  useEffect(() => {
    fetchDiagnosisData();
  }, []);

  const fetchDiagnosisData = async () => {
  try {
    setLoading(true);
    const res = await getDiagnosis();
    if (res.data) {
      setDiagnosisList(res.data);
      setError(null);
    } else {
      throw new Error("응답 데이터가 없습니다.");
    }
  } catch (error: any) {
    // 어떤 에러든 로그인 페이지로 이동
    localStorage.removeItem("accessToken");
    setIsAuth(false);
    alert("로그인이 만료되었거나 오류가 발생했습니다. 다시 로그인해주세요.");
    navigate("/sign-in");
    return;
  } finally {
    setLoading(false);
  }
};

  const handleConfirmDelete = async () => {
    if (selectedDeleteId !== null) {
      try {
        await deleteDiagnosis(selectedDeleteId);
        setDiagnosisList((prevList) =>
           prevList.filter((diagnosis) => diagnosis.diagnosisId !== selectedDeleteId)
        );
        setSelectedDeleteId(null);
      } catch (error: any) {
        setError('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/records")}>
          <ArrowIcon width="25px" height="25px" stroke="black" style={{ marginLeft: -20 }} />
        </BackButton>
        <HeaderTitle>{t("Self-Diagnosis")}</HeaderTitle>
      </Header>

      {loading ? (
        <p>불러오는 중...</p>
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : diagnosisList.length === 0 ? (
        <NoneDiagnosis />  // 데이터 없을 때 NoneDiagnosis 컴포넌트 렌더링
      ):(
        diagnosisList.map((diagnosis) => (
           <div key={diagnosis.diagnosisId}>
            <DateWrapper>
              <DateText>{diagnosis.createdAt.slice(0, 10)}</DateText>
              {/* 자가진단 생성된 날짜 */}
            </DateWrapper>

            <ListItem onClick={() => navigate(`/records/self-diagnosis/${diagnosis.diagnosisId}`)}>
              <ListText>{diagnosis.symptoms}</ListText>
              <DeleteIcon
                width="16px"
                height="18px"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                   setSelectedDeleteId(diagnosis.diagnosisId);
                }}
              />
            </ListItem>
          </div>
        ))
      )}
      {/* 자가진단 데이터 없을때 New버튼 안나오게 */}
      {diagnosisList.length > 0 && (
        
     <FloatingButton
  text={t("New")}
  icon={<AddIcon width = "20px" height ="20px" />}
  to="/self-diagnosis"
/>
      )}


      {selectedDeleteId !== null && (
        <Modal isOpen={true} toggle={() => setSelectedDeleteId(null)}>
          <ModalBox>
            <MessageText>
              {t("Do you want to delete a Self-Diagnosis").split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>
              {line}
              {i !== arr.length - 1 && <br />}
              </React.Fragment>
        ))}
            </MessageText>
            <ButtonWrapper>
              <CancelButton onClick={() => setSelectedDeleteId(null)}>{t("Cancel")}</CancelButton>
              <ConfirmButton onClick={handleConfirmDelete}>{t("Delete")}</ConfirmButton>
            </ButtonWrapper>
          </ModalBox>
        </Modal>
      )}
    </Container>
  );
}


const Container = styled.div`
  flex: 1;
  background-color: #f5f9fc;
  padding-bottom: 40px;
  position: relative;
  padding-top: 28px;
  margin-left: 16px;
  margin-right: 16px;
  min-height: 90vh; /* 고정 height 삭제하고 최소 높이로 변경 */
  overflow-y: auto; /* ✅ 세로 스크롤 추가 */
`;

const Header = styled.div`
  margin-top: -13px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  align-items: center;
`;

const BackButton = styled.button`
  position: absolute;
  left: 7px;
  background: none;
  border: none;
  cursor: pointer;
`;

const HeaderTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #000;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: Pretendard;
`;

const DateWrapper = styled.div`
  margin-top: 24px;
  margin-bottom: 8px;
`;

const DateText = styled.p`
  color: #767676;
  font-size: 14px;
  font-weight: 400;
  font-family: Pretendard;
`;

const ListItem = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 16px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
  font-family: Pretendard;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
`;

const ListText = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: #000;
`;



const ErrorText = styled.p`
  color: red;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  margin-top: 20px;
`;

const ModalBox = styled.div`
  background-color: #FFFFFF;
  border-radius: 10px;
  text-align: center;
  width: 316px;
  font-family: Pretendard;
  box-shadow: 0px 20px 40px 0px rgba(0, 0, 0, 0.10);
  padding: 66px 0 0 0;
`;

const MessageText = styled.p`
  font-size: 18px;
  color: #000;
  font-weight: 400;
  text-align: center;
  line-height: normal;
  margin-bottom: 46px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  flex: 1;
  background-color: #F1F1F5;
  border: none;
  border-radius: 0 0 0 10px;
  font-weight: 500;
  padding: 16px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  flex: 1;
  background-color: #0097a7;
  color: white;
  border: none;
  border-radius: 0 0 10px 0;
  font-weight: 500;
  padding: 16px;
  cursor: pointer;
`;
