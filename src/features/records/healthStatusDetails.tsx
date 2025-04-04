// import React from 'react';

// 기존의 HealthStatusDetail 배열은 그대로 사용
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
            ...(index === HealthStatusDetail.length - 1 && styles.cornerRadiusBottom),
          }}
        >
          <p style={styles.labelBottom}>{item.title}</p>
          <p style={styles.valueBottom}>{item.value}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#F5F9FC",
    marginTop: 14,
  },
  recordItemBottom: {
    backgroundColor: "#FFFFFF",
    display:"flex",
    justifyContent: "space-between",
    paddingVertical: 6,
    width:"100%",
    height:43,
  },
  cornerRadiusBottom: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
    borderBottomColor: "#E5E7EB",
    borderBottomWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  labelBottom: {
    fontSize: 16,
    fontWeight: 400,
    color: "#000",
    marginLeft: 16,
    marginTop:12,
  },
  valueBottom: {
    fontSize: 14,
    color: "#656565",
    fontWeight: 400,
    marginRight: 16,
    marginTop:12,
  },
};
