import styled from "@emotion/styled";
import GenderSelect from "@/features/mypage/ui/GenderSelect";
import CountryAccordionEdit from "@/features/mypage/ui/CountryAccordionEdit";
import CheckBox from "@/features/records/ui/CheckBox";
import { useState } from "react";

const EditForm = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE">("MALE");
  const [nation, setNation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirmSave = () => {
    setShowModal(false);
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

      {showModal && (
        <CheckBox
          onCancel={() => setShowModal(false)}
          onConfirm={handleConfirmSave}
          confirmText="Save"
          message={
            <>
              Do you want to save your <br /> changes before exiting?
            </>
          }
        />
      )}
    </>
  );
};

export default EditForm;

const FormWrapper = styled.form`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100vh;
  overflow: hidden;
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
