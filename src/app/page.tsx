import styles from "./page.module.css";
import LeftMenu from "./containers/LeftMenu";
import MainContent from "./containers/MainContent";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <LeftMenu />
      </div>

      <div className={styles.rightContent}>
        <MainContent />
      </div>
    </div>
  );
}
