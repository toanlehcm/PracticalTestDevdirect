import React from "react";
import styles from "./style.module.scss";

export interface IMainContentProps {}

export default function MainContent(props: IMainContentProps) {
  return (
    <>
      <div className={styles.mainContent}>
        <h1>Welcome to the Admin Dashboard</h1>
      </div>

      <div className={styles.footer}>Footer</div>
    </>
  );
}
