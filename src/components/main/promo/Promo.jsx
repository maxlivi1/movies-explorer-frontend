import "./Promo.css";

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__content">
        <h1 className="promo__title">
          Учебный проект студента факультета{" "}
          <span className="promo__title-span">Веб-разработки.</span>
        </h1>
        <p className="promo__description">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button className="promo__btn-more">Узнать больше</button>
      </div>
      <div className="promo__image"></div>
    </section>
  );
}
