import React, { useState } from "react";

export default function BloodSugarPart({ onClose, onSave }) {
  const [fasting, setFasting] = useState("");
  const [postprandial, setPostPrandial] = useState("");
  const [focusedIndex, setFocusedIndex] = useState<null | number>(null);

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
        {/* fasting */}
        <div style={styles.box}>
          <div style={styles.inputContainer}>
            <input
              type="number"
              value={fasting}
              onFocus={() => setFocusedIndex(0)}
              onBlur={() => setFocusedIndex(null)}
              onChange={(e) => setFasting(e.target.value)}
              style={styles.input}
            />
            <label
              style={{
                ...styles.floatingLabelLeft
              }}
            >
              Fasting
            </label>
          </div>
        </div>

        {/* postprandial */}
        <div style={styles.box}>
          <div style={styles.inputContainer}>
            <input
              type="number"
              value={postprandial}
              onFocus={() => setFocusedIndex(1)}
              onBlur={() => setFocusedIndex(null)}
              onChange={(e) => setPostPrandial(e.target.value)}
              style={styles.input}
            />
            <label
              style={{
                ...styles.floatingLabelRight
              }}
            >
              Postprandial
            </label>
          </div>
        </div>
      </div>
      <h2 style = {styles.bottomText}>mg/dL</h2>
      <button style={styles.saveButton} onClick={handleSave}>Save</button>
    </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top:0,
    left:0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // 최상위 레벨
  },
  container: {
    backgroundColor: "rgba(245, 249, 252, 1)",
    borderRadius: "20px",
    paddingLeft: "24px",
    width: "100%",
    height:700,
    marginTop:140,
    overflowY: "auto",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 400,
    marginTop: 48,
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    // backgroundColor: "#F5F9FC",
    padding: 10,
    borderRadius: 10,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
  },
  box: {
    display: "flex",
    marginTop: 21,
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  inputContainer: {
    position: "relative",
    width: "100%",
    marginBottom: 20,
    marginLeft:8,
  },
  input: {
    width: 140,
    padding: "18px 10px 6px 10px",
    fontSize: 32,
    textAlign: "center",
    borderRadius: 10,
    border: "1px solid #ccc",
    outline: "none",
    boxSizing: "border-box",
    height:140,
  },
  floatingLabelLeft: {
    position: "absolute",
    left:45,
    top:16,
  },
  floatingLabelRight: {
    position: "absolute",
    left:35,
    top:16,
  },
  saveButton: {
    position:"absolute",
    marginTop: 300,
    // marginLeft:24,
    padding: "13px 156px",
    backgroundColor: "#0097A7",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
  },
  bottomText:{
    position:"absolute",
    top:254,
    right: 30,
    fontSize:16,
    fontWeight:400,
    color:"rgba(0,0,0,1)",
  }
};
