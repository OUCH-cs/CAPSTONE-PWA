import { useState } from "react";

type Props = {
  onClose: () => void;
  onSave: (data: { fasting: string; postprandial: string }) => void;
};

export default function BloodSugarPart({ onClose, onSave }: Props) {
  const [fasting, setFasting] = useState("");
  const [postprandial, setPostPrandial] = useState("");

  const handleSave = () => {
    if (fasting && postprandial) {
      onSave({ fasting, postprandial });
      onClose();
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.sectionTitle}>Blood Sugar</div>

        <div style={styles.card}>
          {/* Fasting Input */}
          <div style={styles.box}>
            <div style={styles.inputContainer}>
              <input
                type="number"
                value={fasting}
                onChange={(e) => setFasting(e.target.value)}
                style={styles.input}
              />
              <label style={styles.labelLeft}>Fasting</label>
            </div>
          </div>

          {/* Postprandial Input */}
          <div style={styles.box}>
            <div style={styles.inputContainer}>
              <input
                type="number"
                value={postprandial}
                onChange={(e) => setPostPrandial(e.target.value)}
                style={styles.input}
              />
              <label style={styles.labelRight}>Postprandial</label>
            </div>
          </div>
        </div>

        <div style={styles.unitText}>mg/dL</div>

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
