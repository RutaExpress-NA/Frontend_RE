import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export function ErrorPage({ code, title, message, linkTo, linkLabel }) {
    return (
        <div className="rex-error-page">
            <div className="rex-error-page__card">
                <img src={logo} alt="Rutas Express" className="rex-error-page__logo" />
                {code && <p className="rex-error-page__code">{code}</p>}
                <h1 className="rex-error-page__title">{title}</h1>
                <p className="rex-error-page__message">{message}</p>
                <Link to={linkTo} className="rex-error-page__link">
                    {linkLabel}
                </Link>
            </div>
        </div>
    );
}