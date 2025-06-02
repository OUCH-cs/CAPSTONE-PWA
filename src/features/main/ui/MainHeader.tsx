import styled from "@emotion/styled";
import theme from "@/shared/styles/theme";
import HomeLocation from "@/shared/assets/home/HomeLocation.svg?react";
import { useLanguage } from "@/shared/services/useLanguage";
import { useState } from "react";
import ArrowIcon from "@/shared/assets/common/arrow.svg?react";

const languageLabelMap: Record<string, string> = {
  en: "ENG",
  ko: "한국어",
  zh: "中文",
};

const MainHeader = () => {
  const { languageCode, handleLangChange } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleSelect = (code: string) => {
    const fakeEvent = { target: { value: code } } as React.ChangeEvent<HTMLSelectElement>;
    handleLangChange(fakeEvent);
    setIsOpen(false);
  };

  return (
    <Header>
      <Location>
        <HomeLocation width="16px" height="21px" />
        <LocationText>Banseok-dong</LocationText>
      </Location>

      <LangWrapper>
        <SelectedBox onClick={toggleDropdown}>
          {languageLabelMap[languageCode]}
          <Arrow open={isOpen} />
        </SelectedBox>
        {isOpen && (
          <LangDropdown>
            {Object.entries(languageLabelMap).map(([code, label]) => (
              <LangItem
                key={code}
                onClick={() => handleSelect(code)}
                selected={languageCode === code}
              >
                {label}
              </LangItem>
            ))}
          </LangDropdown>
        )}
      </LangWrapper>
    </Header>
  );
};

export default MainHeader;

// 스타일 그대로 분리
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  margin-bottom: 1.2rem;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
`;

const LocationText = styled.p`
  font-size: 1.2rem;
  margin-left: 0.5rem;
`;

const LangWrapper = styled.div`
  position: relative;
  width: 100px;
  font-size: 1.3rem;
`;

const SelectedBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${theme.colors.background};
  padding: 0.6rem 1rem;
  border-radius: 6px;
  gap:3px;
  cursor: pointer;
`;

const Arrow = styled(ArrowIcon)<{ open: boolean }>`
  transition: transform 0.3s ease;
  transform: rotate(${props => (props.open ? "180deg" : "0deg")});
`;

const LangDropdown = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  border-radius: 6px;
  background-color: ${theme.colors.background};
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const LangItem = styled.li<{ selected: boolean }>`
  padding: 0.6rem 1rem;
  background-color: ${({ selected }) =>
    selected ? theme.colors.tertiary: "transparent"};
  cursor: pointer;
`;