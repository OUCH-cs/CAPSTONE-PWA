import { useState } from "react";

type Props = {
  onClose: () => void;
  onSave: (data: string) => void;
};

export default function MedicineHistoryPart({ onClose, onSave }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [medicinehistory, setMedicineHistory] = useState<{ text: string }[]>([]);

  const handleAdd = () => {
    if (inputValue.trim() !== "") {
      setMedicineHistory((prev) => [...prev, { text: inputValue.trim() }]);
      setInputValue("");
    }
  };

  const handleDelete = (index: number) => {
    setMedicineHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (medicinehistory.length > 0) {
      const combinedText = medicinehistory.map(item => item.text).join(", ");
      onSave(combinedText);
      onClose();
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Medicine History</h2>
        </div>

        <div style={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Medication / Type of medication / Date taken"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleAdd} style={styles.addButton}>＋</button>
        </div>

        {medicinehistory.map((entry, index) => (
          <div key={index} style={styles.entry}>
            <span>{entry.text}</span>
            <button onClick={() => handleDelete(index)} style={styles.deleteButton}>－</button>
          </div>
        ))}

        <button style={styles.saveButton} onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    backgroundColor: "rgba(245, 249, 252, 1)",
    borderRadius: "20px",
    padding: "24px",
    width: 388,
    height: 700,
    marginTop: 140,
    overflowY: "auto",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "18px",
    fontWeight: 400,
    marginTop: 28,
  },
  inputWrapper: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    marginBottom: "16px",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px", 
    zoom: 1.0, // 일부 브라우저에서 scale 유사하게 보이게 함
    WebkitTextSizeAdjust: "100%",
    
  },

  addButton: {
    position: "absolute",
    right: 4,
    fontSize: "20px",
    backgroundColor: "#FFF",
    color: "rgba(0,0,0,1)",
    border: "none",
    borderRadius: "8px",
    padding: "7px",
    marginBottom: 2,
    cursor: "pointer",
  },
  entry: {
    backgroundColor: "white",
    padding: "12px 14px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    fontSize: "14px",
  },
  deleteButton: {
    position: "absolute",
    right: 33,
    backgroundColor: "transparent",
    border: "none",
    fontSize: "12px",
    color: "rgba(0,0,0,1)",
    cursor: "pointer",
  },
  saveButton: {
    position: "absolute",
    marginTop:200,
    padding: "13px 150px",
    backgroundColor: "#0097A7",
    color: "white",
    border: "none",
    borderRadius: 5,
    fontSize:16,
    cursor: "pointer",
  },
};
