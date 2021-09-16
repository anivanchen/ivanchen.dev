import styles from "../styles/Home.module.css"
import useMousePosition from "../hooks/useMousePosition.js";

const Cursor = () => {
    const { x, y } = useMousePosition();
  return (
    <>
      <div
        style={{ left: `${x}px`, top: `${y}px` }}
        className={styles.ring}
      ></div>
      <div
        style={{ left: `${x}px`, top: `${y}px` }}
        className={styles.dot}      
      ></div>
    </>
  );
}

export default Cursor;