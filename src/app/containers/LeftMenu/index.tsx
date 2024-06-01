import React from "react";
import styles from "../../page.module.css";

export interface ILeftMenuProps {}

export default function LeftMenu(props: ILeftMenuProps) {
  return (
    <div className={styles.sidebar}>
      <h2>Admin Menu</h2>
    </div>
  );
}
