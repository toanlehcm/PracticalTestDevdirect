import React from "react";
import styles from "./style.module.scss";

export interface ILeftMenuProps {}

export default function LeftMenu(props: ILeftMenuProps) {
  return (
    <div className={styles.content_sidebar}>
      <div className={styles.content_paragraph}>
        <div className={styles.box}></div>
        <div>Paragraph</div>
      </div>

      <div className={styles.content_button}>
        <div className={styles.box}></div>
        <div>Button</div>
      </div>
    </div>
  );
}
