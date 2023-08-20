import "./BurgerMenu.css";

export default function BurgerMenu({ loggedIn, onClick }) {
  return (
    loggedIn && (
      <button type="button" className="header__burger-menu" onClick={onClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          fill="none"
        >
          <g fill="#fff" fillRule="evenodd" clipRule="evenodd">
            <path d="M36 14H8v-3h28v3ZM36 24H8v-3h28v3ZM36 34H8v-3h28v3Z" />
          </g>
        </svg>
      </button>
    )
  );
}
