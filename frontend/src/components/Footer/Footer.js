import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container-fluid">
        <div className="row justify-content-around">
          <div className="col-8 col-md-5">
            <h5 className={styles.title}>ShopifyChallenge2021</h5>
            <p className={styles.description}>
              Image Repository challenge
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;