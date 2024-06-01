import styles from "./page.module.css";
import LeftMenu from "./containers/LeftMenu";
import MainContent from "./containers/MainContent";

export default function Home() {
  return (
    <div className={styles.container}>
      <LeftMenu />
      <MainContent />
    </div>
  );
}
