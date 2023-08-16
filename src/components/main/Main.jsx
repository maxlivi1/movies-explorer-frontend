import "./Main.css";
import AboutProject from "./about-project/AboutProject";
import Promo from "./promo/Promo";
import Techs from "./techs/Techs";
import AboutMe from "./about-me/AboutMe";
import Portfolio from "./portfolio/Portfolio";

export default function Main() {
  return (
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
  );
}
