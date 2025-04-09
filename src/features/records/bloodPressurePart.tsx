import { useState } from "react";

type Props = {
  onClose: () => void;
  onSave: (data: { contraction: string; relaxation: string }) => void;
};

export default function BloodPressurePart({ onClose, onSave }: Props) {
  const [contraction, setContraction] = useState("");
  const [relaxation, setRelaxation] = useState("");

  const handleSave = () => {
    if (contraction && relaxation) {
      onSave({ contraction, relaxation });
      onClose();
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.sectionTitle}>Blood Pressure</div>

        <div style={styles.card}>
          {/* Contraction */}
          <div style={styles.box}>
            <div style={styles.inputContainer}>
              <input
                type="number"
                value={contraction}
                onChange={(e) => setContraction(e.target.value)}
                style={styles.input}
              />
              <label style={styles.labelLeft}>Contraction</label>
            </div>
          </div>

          {/* Relaxation */}
          <div style={styles.box}>
            <div style={styles.inputContainer}>
              <input
                type="number"
                value={relaxation}
                onChange={(e) => setRelaxation(e.target.value)}
                style={styles.input}
              />
              <label style={styles.labelRight}>Relaxation</label>
            </div>
          </div>
        </div>

        <div style={styles.unitText}>mmHg</div>

        <button style={styles.saveButton} onClick={handleSave}>
          Save
        </button>
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
    borderRadius: 20,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    height: 710,
    top:75,
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  sectionTitle: {
    fontSize: 18,
    marginTop:48,
    fontWeight: 500,
    marginBottom: 12,
  },
  card: {
    display: "flex",
    gap: 16,
  },
  box: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputContainer: {
    marginTop:21,
    position: "relative",
    width: "100%",
  },
  input: {
    width: 160,
    height: 160,
    fontSize: 32,
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: 10,
    boxSizing: "border-box",
  },
  labelLeft: {
    position: "absolute",
    top: 10,
    left: "49%",
    transform: "translateX(-50%)",
    fontSize: 14,
    color: "#555",
  },
  labelRight: {
    position: "absolute",
    top: 10,
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: 14,
    color: "#555",
  },
  unitText: {
    textAlign: "right",
    fontSize: 16,
    fontWeight: 400,
    color: "rgba(0,0,0,1)",
    marginTop: 5,
  },
  saveButton: {
    alignSelf: "center",
    padding: "13px 80px",
    backgroundColor: "#0097A7",
    color: "white",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    cursor: "pointer",
    marginTop:40,
  },
};
