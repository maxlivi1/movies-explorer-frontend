import "./Main.css";
import AboutProject from "./about-project/AboutProject";
import Promo from "./promo/Promo";

export default function Main() {
  return (
    <div className="main">
      <Promo />
      <AboutProject />
    </div>
  );
}
