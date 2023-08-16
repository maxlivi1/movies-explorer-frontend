import "./Main.css";
import AboutProject from "./about-project/AboutProject";
import Promo from "./promo/Promo";
import Techs from "./techs/Techs";

export default function Main() {
  return (
    <div className="main">
      <Promo />
      <AboutProject />
      <Techs />
    </div>
  );
}
