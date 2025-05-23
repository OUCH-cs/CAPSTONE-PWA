import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import GenderSelect from "@/features/mypage/ui/GenderSelect";
import CountryAccordionEdit from "@/features/mypage/ui/CountryAccordionEdit";
import Modal from "@/shared/components/modal/Modal";
import { useEffect, useState } from "react";
import { getInformation } from "@/features/mypage/service/MyPageApi";
import { editInformation } from "@/features/mypage/service/MyPageApi"; 
import { COUNTRY_LIST, LANGUAGE_LIST } from "@/features/mypage/MyPage.constants";

const EditForm = () => {
   const navigate = useNavigate();
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  const [nation, setNation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getInformation();
      if (response && response.data) {
        const data = response.data;
        setName(data.nickname || "");
        setGender(data.gender || "MALE");
        const matchedCountry = COUNTRY_LIST.find(
        (item) => item.code.toLowerCase() === (data.nation || "").toLowerCase()
        );
        setNation(matchedCountry?.code || "");
        setPhone(data.phoneNumber || "");
        setEmail(data.email || "");
        setLanguage(response.data.language || "");
      }
    };
    fetchData();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirmSave = async () => {
  try {
    // nationCode로 변환
    const matchedCountry = COUNTRY_LIST.find(item => item.code === nation);
    const nationCodeToSend = matchedCountry ? matchedCountry.nationCode : "";
    // LanguageCode로 변환
     const matchedLanguage = LANGUAGE_LIST.find(item => item.name === language.toLowerCase());
    const languageCodeToSend = matchedLanguage ? matchedLanguage.code : "";

    const payload = {
      nickname: name,
      gender, // "MALE" | "FEMALE"
      nationCode: nationCodeToSend, 
      phoneNumber: phone,
      email,
        languageCode: languageCodeToSend,
    };

    const response = await editInformation(payload);
    if (response) {
      navigate("/mypage");  
    }
  } catch (error) {
    alert("저장 중 오류가 발생했습니다.");
    console.error(error);
  } finally {
    setShowModal(false);
  }
};

  return (
    <>
      <FormWrapper onSubmit={handleSave}>
        <FormField
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <GenderSelect value={gender} onChange={(value) => setGender(value)} />
        <CountryAccordionEdit value={nation} onChange={(value) => setNation(value)} />
        <FormField
          type="text"
          placeholder="010-0000-0000"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <FormField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SaveButton type="submit">Save</SaveButton>
      </FormWrapper>

      <Modal isOpen={showModal} toggle={() => setShowModal(false)}>
        <ModalBox>
          <MessageText>
            Do you want to save your <br /> changes before exiting?
          </MessageText>
          <ButtonWrapper>
            <CancelButton onClick={() => setShowModal(false)}>Cancel</CancelButton>
            <ConfirmButton onClick={handleConfirmSave}>Save</ConfirmButton>
          </ButtonWrapper>
        </ModalBox>
      </Modal>
    </>
  );
};

export default EditForm;

const FormWrapper = styled.form`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;
`;

const FormField = styled.input`
  padding: 18px;
  border: 1px solid #ccc;
  border-radius: 12px;
  font-size: 16px;
`;

const SaveButton = styled.button`
  margin-top: 155px;
  padding: 13px;
  font-size: 18px;
  font-weight: 400;
  background-color: #0097a7;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
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
`;

const ConfirmButton = styled.button`
  flex: 1;
  background-color: #0097a7;
  color: white;
  border: none;
   border-radius: 0 0 10px 0;
  font-weight: 500;
  padding: 16px;
`;
