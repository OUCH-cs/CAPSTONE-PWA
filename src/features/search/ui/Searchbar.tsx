import theme from "@/shared/styles/theme";
import styled from "@emotion/styled";
import SearchIcon from "@/shared/assets/search/search.svg?react";
import DepartmentFilterDropdown from "./dropdown/DepartmentFilterDropdown";

function Searchbar() {
  return (
    <>
      <Container>
        {/* <InputFormWrapper onSubmit={handleSubmit}> */}
        <InputFormWrapper>
          <Input
            type="text"
            // value={textQuery}
            placeholder="Search for hospital and pharmacies"
            // onChange={handleChange}
          />

          <IconWrapper type="submit">
            <SearchIcon />
          </IconWrapper>
        </InputFormWrapper>

        {/* 진료과 필터 드롭다운 */}
        <FilterWrapper>
          <DepartmentFilterDropdown />
        </FilterWrapper>
      </Container>
    </>
  );
}

export { Searchbar };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100px;
  margin-bottom: 16px;
  background-color: ${theme.colors.white};
`;

const InputFormWrapper = styled.form`
  position: relative;
`;

const Input = styled.input`
  width: 328px;
  height: 48px;
  padding-left: 14px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 500;
  color: ${theme.colors.gray_4};
  background-color: #f4f8fa;

  &::placeholder {
    font-size: 16px;
    font-weight: 400;
    color: ${theme.colors.gray_7};
  }
`;

const IconWrapper = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background-color: transparent;
`;

const FilterWrapper = styled.div`
  width: 328px;
`;
