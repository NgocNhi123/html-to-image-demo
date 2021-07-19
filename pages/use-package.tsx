import styles from "../styles/Home.module.css";
import React, { useState, useRef } from "react";
import Image from "next/image";
import * as htmlToImage from "html-to-image";
import { Markup } from "interweave";

export default function UsePackage() {
  const my_ref = useRef(null);
  const [img, setImg] = useState<string>("#");
  const [html, setHtml] = useState<string>(
    '<div style="border:4px solid #03B875;padding:20px;fontFamily:Roboto;">JavaScript ✅</div>'
  );

  function createImage() {
    var node = my_ref.current;
    if (node) {
      htmlToImage
        .toPng(node)
        .then(function (dataUrl) {
          setImg(dataUrl);
        })
        .catch(function (error) {
          console.error("oops, something went wrong!", error);
        });
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
        <button
          onClick={() => {
            setImg("#");
            createImage();
          }}
          className={styles.button}
        >
          generate image
        </button>
      </div>
      <div className={styles.right}>
        <div>Preview: </div>
        <div ref={my_ref}>
          <Markup content={html} allowAttributes />
        </div>
        <div>Image: </div>
        {img === "#" ? (
          <div>...loading</div>
        ) : (
          <Image
            src={img}
            width={100}
            height={100}
            alt="response"
            className={styles.img}
          />
        )}
      </div>
    </div>
  );
}
