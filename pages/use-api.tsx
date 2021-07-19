import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import Image from "next/image";

export default function UseApi() {
  const [imageSrc, setImageSrc] = useState<string>("#");
  const [html, setHtml] = useState<string>(
    "<div class='box'>JavaScript ✅</div>"
  );
  const [css, setCss] = useState<string>(
    ".box { border: 4px solid #03B875; padding: 20px; font-family: 'Roboto'; }"
  );

  async function createImage() {
    const payload = {
      html: html,
      css: css,
      google_fonts: "Roboto",
    };

    const headers = {
      auth: {
        username: "dd2bfaa9-da50-4533-b4fd-a7a100adea2d",
        password: "7623bf7d-21c3-48de-9795-4f9688c3960d",
      },
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "https://hcti.io/v1/image",
        JSON.stringify(payload),
        headers
      );
      setImageSrc(response.data.url);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>HTML:</div>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          className={styles.html}
        />
        <div>CSS:</div>
        <textarea
          value={css}
          onChange={(e) => setCss(e.target.value)}
          className={styles.css}
        />
        <button
          onClick={() => {
            setImageSrc("#");
            createImage();
          }}
          className={styles.button}
        >
          generate image
        </button>
      </div>
      <div className={styles.right}>
        {imageSrc === "#" ? (
          <div>...loading</div>
        ) : (
          <Image
            src={imageSrc}
            width={300}
            height={300}
            alt="response"
            className={styles.img}
          />
        )}
      </div>
    </div>
  );
}
