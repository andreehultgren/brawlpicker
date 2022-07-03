import Navbar from "./Navbar";
import styles from "../styles/Layout.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Layout({ children }) {
  return (
    <main className={styles.main}>
      <Navbar />
      <DndProvider backend={HTML5Backend}>
        <div className="container">{children}</div>
      </DndProvider>
    </main>
  );
}
