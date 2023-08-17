import "./AccountButton.css";
import { Link } from "react-router-dom";

export default function AccountButton({ loggedIn }) {
  const style = loggedIn ? "account-button account-button_visible" : "account-button";
  return (
    <button type="button" className={style}>
      <span className="account-button__name">Аккаунт</span>
      <div className="account-button__image">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="none"
        >
          <path
            fill="#fff"
            fill-rule="evenodd"
            d="M7.43 7.967a3.751 3.751 0 1 0-2.86 0A8.614 8.614 0 0 0 .809 9.58L2.19 11.42A6.317 6.317 0 0 1 6 10.149c1.431 0 2.749.473 3.81 1.27l1.382-1.839A8.614 8.614 0 0 0 7.43 7.967Z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </button>
  );
}
