import styled from "@emotion/styled";
import SearchIcon from "@/shared/assets/map/search.svg?react";
import theme from "@/shared/styles/theme";
import { useState } from "react";
import CategoryTag from "@/entities/search/ui/CategoryTag";
import { useSetAtom } from "jotai";
import { departmentAtom } from "../services/atom";

export default function SearchBar() {
  const setDepartment = useSetAtom(departmentAtom);

  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInputValue("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Search for Address"
          value={inputValue}
          onChange={handleChange}
        />
        <Button>
          <SearchIcon />
        </Button>
      </FormContainer>

      <DepartmentsTagList>
        {["hospital", "pharmacy"].map((department) => (
          <CategoryTagWrapper
            key={department}
            onClick={() => setDepartment(department as "hospital" | "pharmacy")}
          >
            <CategoryTag>{department}</CategoryTag>
          </CategoryTagWrapper>
        ))}
      </DepartmentsTagList>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  width: 276px;
  height: 44px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.12);
  padding-left: 12px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background-color: ${theme.colors.primary};
`;

const DepartmentsTagList = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const CategoryTagWrapper = styled.li`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
`;
