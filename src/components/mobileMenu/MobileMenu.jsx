import Navigation from "../navigation/Navigation";
import "./MobileMenu.css";

export default function MobileMenu({ loggedIn, isOpenMobileMenu, onClose }) {
  const menuStyle = isOpenMobileMenu
    ? "mobile-menu mobile-menu_visible"
    : "mobile-menu";
  const containerStyle = isOpenMobileMenu
    ? "mobile-menu__container mobile-menu__container_visible"
    : "mobile-menu__container";

  return (
    <div className={menuStyle}>
      <div className="mobile-menu__overlay"></div>
      <div className={containerStyle}>
        <Navigation
          loggedIn={loggedIn}
          isOpenMenu={isOpenMobileMenu}
          onClose={onClose}
        />
        <button
          type="button"
          className="mobile-menu__close-btn"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
          >
            <g fill="#fff">
              <path d="M7.16 9.282 9.283 7.16l15.556 15.556-2.121 2.121z" />
              <path d="m22.717 7.16 2.122 2.122L9.282 24.838l-2.121-2.12z" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}
