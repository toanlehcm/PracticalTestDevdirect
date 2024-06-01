import React from "react";
import styles from "../../page.module.css";

export interface IMainContentProps {}

export default function MainContent(props: IMainContentProps) {
  return (
    <div className={styles.rightContent}>
      <div className={styles.mainContent}>
        <h1>Welcome to the Admin Dashboard</h1>
      </div>

      <div className={styles.footer}>Footer</div>
    </div>
  );
}
