import React, { useRef, useEffect } from "react";
import Modal from "react-modal";
import dayjs from "dayjs";

Modal.setAppElement("#root"); // 모달 사용 시 필수

const years = Array.from({ length: 100 }, (_, i) => (2000 + i).toString().slice(2));
const months = Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, "0"));
const days = Array.from({ length: 31 }, (_, i) => `${i + 1}`.padStart(2, "0"));

interface DateSelectionProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (date: string) => void;
}

export default function DateSelection({ isOpen, onClose, onDateSelect }: DateSelectionProps) {
  const [selectedYear, setSelectedYear] = React.useState(dayjs().format("YYYY"));
  const [selectedMonth, setSelectedMonth] = React.useState(dayjs().format("MM"));
  const [selectedDay, setSelectedDay] = React.useState(dayjs().format("DD"));

  const scrollRefs = {
    year: useRef<HTMLDivElement>(null),
    month: useRef<HTMLDivElement>(null),
    day: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    if (isOpen) {
      scrollToSelected("year", selectedYear);
      scrollToSelected("month", selectedMonth);
      scrollToSelected("day", selectedDay);
    }
  }, [isOpen]);

  const scrollToSelected = (type: "year" | "month" | "day", value: string) => {
    const ref = scrollRefs[type].current;
    if (ref) {
      const index = (type === "year" ? years : type === "month" ? months : days).indexOf(value);
      ref.scrollTop = index * 40; // 각 항목 높이(40px)에 맞춰 조정
    }
  };

  const handleSelect = (type: "year" | "month" | "day", value: string) => {
    if (type === "year") setSelectedYear(value);
    if (type === "month") setSelectedMonth(value);
    if (type === "day") setSelectedDay(value);
  };

  const handleSave = () => {
    const fullYear = `20${selectedYear}`; // 두 자리 연도 앞에 '20' 붙이기
    const formattedDate = `${fullYear}.${selectedMonth}.${selectedDay}`;
    onDateSelect(formattedDate);
    onClose(); // 모달 닫기
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <div style={styles.modalContent}>
        <h2 style={styles.title}>Date of Visit</h2>
        <div style={styles.pickerContainer}>
          {/* 연도 선택 */}
          <div style={styles.picker} ref={scrollRefs.year}>
            <p style={styles.dateText}>YY</p>
            <br />
            {years.map((year) => (
              <div
                key={year}
                style={{
                  ...styles.item,
                  fontWeight: year === selectedYear ? "bold" : "normal",
                  color: "rgba(0,0,0,1)", // 항상 검은색 유지
                }}
                onClick={() => handleSelect("year", year)}
              >
                {year}
              </div>
            ))}
          </div>

          {/* 월 선택 */}
          <div style={styles.picker} ref={scrollRefs.month}>
            <p style={styles.dateText}>MM</p>
            <br />
            {months.map((month) => (
              <div
                key={month}
                style={{
                  ...styles.item,
                  fontWeight: month === selectedMonth ? "bold" : "normal",
                  color: "rgba(0,0,0,1)", // 항상 검은색 유지
                }}
                onClick={() => handleSelect("month", month)}
              >
                {month}
              </div>
            ))}
          </div>

          {/* 일 선택 */}
          <div style={styles.picker} ref={scrollRefs.day}>
            <p style={styles.dateText}>DD</p>
            <br />
            {days.map((day) => (
              <div
                key={day}
                style={{
                  ...styles.item,
                  fontWeight: day === selectedDay ? "bold" : "normal",
                  color: "rgba(0,0,0,1)", // 항상 검은색 유지
                }}
                onClick={() => handleSelect("day", day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleSave} style={styles.saveButton}>
          Save
        </button>
      </div>
    </Modal>
  );
}

// 스타일 정의
const styles: Record<string, React.CSSProperties> = {
  modalContent: {
    borderRadius: "10px",
    marginLeft: -20,
    width: "60%",
  },
  title: {
    marginTop: 18,
    fontSize: "18px",
    fontWeight: 400,
    marginBottom: "10px",
    marginLeft: 24,
  },
  pickerContainer: {
    marginTop: 22,
    display: "flex",
    justifyContent: "center",
    height: "150px",
    width: "202px",
    overflow: "hidden",
    marginLeft: 84,
  },
  picker: {
    width: "302px",
    height: "100%",
    overflowY: "scroll",
    borderRadius: "5px",
    textAlign: "center",
    scrollSnapType: "y mandatory",
  },
  item: {
    padding: "14px 0",
    fontSize: "16px",
    scrollSnapAlign: "center",
    cursor: "pointer",
    color: "rgba(0,0,0,1)", // 기본 검은색 유지
  },
  saveButton: {
    marginTop: 20,
    marginLeft: 44,
    padding: "10px",
    fontSize: "18px",
    fontWeight: 400,
    backgroundColor: "#0097A7",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "302px",
  },
  dateText: {
    fontSize: 12,
    color: "rgba(0,0,0,1)",
    position: "fixed",
    marginLeft: 25,
  },
};

const modalStyles: {
  overlay: React.CSSProperties;
  content: React.CSSProperties;
} = {
  overlay: {
    position: "fixed",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1000,
  },
  content: {
    backgroundColor: "#F5F9FC",
    width: "390px",
    height: 600,
    marginTop: 278,
    marginLeft: -40,
    borderRadius: "10px",
    padding: "20px",
  },
};
