import styles from './page.module.css'
import './globals.css'

export default function Home() {
  return (
    <div className={`${styles["home"]}`}>
      <h1 className={"hero"}>Hej!</h1>
      <p>
        I’m Elin, a user-centered designer and engineer currently a consultant at Virki. Before that I was a developer and later UX Lead at Extenda Retail.
      </p>
      <p>I work with digital products, design systems, and lately I’ve focused a lot on implementing better work processes for UX in an agile organisation. I used to work as a frontend developer.
      </p>
      <p>I’m based in Stockholm.</p>
    </div>
  )
}