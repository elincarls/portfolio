import styles from './button.module.css';

export default function Button({ children, onClick, icon }) {
  return (
    <button className={styles["button"]} onClick={onClick}>
      {children}
      {icon && (
        <span
          className={styles["icon"]}
          style={{ WebkitMaskImage: `url(${icon})`, maskImage: `url(${icon})` }}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
