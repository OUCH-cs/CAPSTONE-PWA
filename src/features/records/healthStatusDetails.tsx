const HealthStatusDetail = [
  { title: "Diease", value: "asdfasdfasd" },
  { title: "Allergy", value: "asdfasdfasd" },
  { title: "Blood Pressure", value: "asdfasdfasd" },
];

export default function HealthStatusDetails() {
  return (
    <div style={styles.container}>
      {HealthStatusDetail.map((item, index) => (
        <div
          key={index}
          style={{
            ...styles.recordItemBottom,
            ...(index === HealthStatusDetail.length - 1 ? styles.cornerRadiusBottom : {}),
          }}
        >
          <p style={styles.labelBottom}>{item.title}</p>
          <p style={styles.valueBottom}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    backgroundColor: "#F5F9FC",
  },
  recordItemBottom: {
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  cornerRadiusBottom: {
    borderBottom: "1px solid #E5E7EB",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom:18,
  },
  labelBottom: {
    fontSize: 16,
    fontWeight: 400,
    color: "#000",
    marginLeft: 16,
    marginTop:18,
  },
  valueBottom: {
    fontSize: 14,
    color: "#656565",
    fontWeight: 400,
    marginRight: 16,
    marginTop: 18,
  },
};
