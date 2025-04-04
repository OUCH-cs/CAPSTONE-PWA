import React from "react";
import Wifi from "@/shared/assets/common/wifi.svg?react";
import Signal from "@/shared/assets/common/signal.svg?react";
import Battery from "@/shared/assets/common/battery.svg?react";

export default function StatusBar() {
  return (
    <div style={styles.statusBar}>
      {/* 왼쪽 시간 */}
      <div style={styles.time}>9:29</div>

      {/* 오른쪽 아이콘들 */}
      <div style={styles.icons}>
        <Signal height = {14} width ={20} />
        <Wifi height = {14} width ={20} />
        <Battery height = {16} width ={20} stroke="black"/>
      </div>
    </div>
  );
}

const styles = {
  statusBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F8F9FB", // iOS 스타일 배경색
    height: 20,
    padding: "0 12px",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif", // iOS 폰트 스타일
  },
  time: {
    fontSize: "14px",
  },
  icons: {
    display: "flex",
    gap: "1px",
  },
};
