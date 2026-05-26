import Image from 'next/image';
import styles from './button.module.css';

export default function Button({ children, onClick, icon }) {
  return (
    <button className={styles["button"]} onClick={onClick}>
      {children}
      {icon && <Image src={icon} alt="" width={16} height={16} aria-hidden="true" />}
    </button>
  );
}
