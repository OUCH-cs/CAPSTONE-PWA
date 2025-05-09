import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import ArrowIcon from "@/shared/assets/common/backarrow.svg?react";
import DeleteIcon from "@/shared/assets/common/delete-icon.svg?react";
import { getHospitals } from "@/features/records/service/medicalDataApi";
import MedicalRecordDelete from "@/features/records/ui/MedicalRecordDelete"; // 모달 import

type HospitalRecord = {
  id: number;
  date: string;
  hospital: string;
};

export default function MedicalRecordList() {
  const navigate = useNavigate();
  const [hospitalList, setHospitalList] = useState<HospitalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<number | null>(null);

  const handleDeleteIconPress = () => {
    setIsDeleteMode((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    fetchHospitalData();
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const fetchHospitalData = async () => {
    try {
      const res = await getHospitals();
      if (res.data) {
        setHospitalList(res.data);
        setError(null);
      } else {
        throw new Error("응답 데이터가 없습니다.");
      }
    } catch (error: any) {
      console.error("의료기록 불러오기 실패:", error);
      if (error.response) {
        setError(`서버 오류: ${error.response.status} - ${error.response.data.message || "의료기록을 불러오는 데 실패했습니다."}`);
      } else {
        setError("네트워크 오류 또는 서버와 연결할 수 없습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedDeleteId !== null) {
      setHospitalList((prev) => prev.filter(item => item.id !== selectedDeleteId));
      setSelectedDeleteId(null);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate("/records")}>         <ArrowIcon width="25px" height="25px" stroke="black" style={{ marginLeft: -20 }} />
        </BackButton>
        <HeaderTitle>Medical Record</HeaderTitle>
        <DeleteIconWrapper onClick={handleDeleteIconPress}>
          <DeleteIcon
            width="30px"
            height="30px"
            stroke="black"
            style={{
              bottom: 7,
              right: 0,
              position: "absolute",
            }}
          />
        </DeleteIconWrapper>
      </Header>

      {loading ? (
        <p>불러오는 중...</p>
      ) : error ? (
        <ErrorText>{error}</ErrorText>
      ) : (
        hospitalList.map((hospital) => (
          <div key={hospital.id}>
            <DateWrapper>
              <DateText>{hospital.date.slice(0, 10)}</DateText>
            </DateWrapper>

            <ListItem onClick={() => navigate(`/records/medicalrecord/${hospital.id}`)}>
              <ListText>{hospital.hospital}</ListText>
              {isDeleteMode ? (
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDeleteId(hospital.id);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <path d="M5 5L20 20M20 5L5 20" stroke="black" strokeWidth="2" />
                </svg>
              ) : (
                <ArrowIcon width="25px" height="25px" stroke="black" style={{ transform: "rotate(180deg)" }} />
              )}
            </ListItem>
          </div>
        ))
      )}

      <FabButton onClick={() => navigate("/records/medicalrecord-add")}>+ New</FabButton>

      {selectedDeleteId !== null && (
        <MedicalRecordDelete
        message={
          <>
            Do you want to delete <br /> a medical record?
          </>
        }
          onCancel={() => setSelectedDeleteId(null)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  background-color: #f5f9fc;
  min-height: 100vh;
  padding-bottom: 40px;
  position: relative;
  margin-top: 28px;
  margin-left: 16px;
  margin-right: 16px;
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

const FabButton = styled.button`
  position: absolute;
  bottom: 90px;
  right: 24px;
  background-color: #0097a7;
  border-radius: 24px;
  padding: 12px 16px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  font-family: Pretendard;
  border: none;
  cursor: pointer;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.15);
`;

const ErrorText = styled.p`
  color: red;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  margin-top: 20px;
`;

const DeleteIconWrapper = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  right: 0;
`;