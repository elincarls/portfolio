"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "../../components/Button";
import styles from "./contact.module.css";

export default function Contact({ contactHeader, contactSubheader }) {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("");
    const formData = new FormData(event.target);
    formData.append("access_key", "4e0233b1-999d-4a60-8751-0176fa217abf");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data.success ? "Message sent!" : "Something went wrong, please try again.");
  };

  return (
    <div className={styles["layout"]}>
      <div className={styles["page"]}>
        <h1 className={styles["heading"]}>
          {contactHeader ?? "What can I help you with?"}
        </h1>
        <p className={styles["subheading"]}>
          {contactSubheader ??
            "Get in touch via the form below and I'll get right back to you"}
        </p>

        <form className={styles["form"]} onSubmit={onSubmit}>
          <div className={styles["field"]}>
            <label className={styles["label"]} htmlFor="name">
              Name
            </label>
            <input
              className={styles["input"]}
              id="name"
              name="name"
              type="text"
              required
            />
          </div>

          <div className={styles["field"]}>
            <label className={styles["label"]} htmlFor="email">
              Email
            </label>
            <input
              className={styles["input"]}
              id="email"
              name="email"
              type="email"
              required
            />
          </div>

          <div className={styles["field"]}>
            <label className={styles["label"]} htmlFor="message">
              Message
            </label>
            <textarea
              className={styles["textarea"]}
              id="message"
              name="message"
              rows={6}
              required
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button icon="/send.svg">Send</Button>
          </div>
          {result && <p>{result}</p>}
        </form>
      </div>

      <div className={styles["image-wrapper"]}>
        <Image src="/temp_moka.svg" alt="" width={449} height={775} style={{ height: "75%", width: "auto", maxWidth: "100%" }} />
      </div>
    </div>
  );
}
