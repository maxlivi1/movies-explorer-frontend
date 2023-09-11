import "./Logo.css";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../configs/appconfig";

export default function Logo() {
  return (
    <Link to={ROUTES.main} className="logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="38"
        height="38"
        fill="none"
      >
        <g fillRule="evenodd" clipRule="evenodd">
          <path
            fill="#3DDC84"
            d="M19 38c10.493 0 19-8.507 19-19S29.493 0 19 0 0 8.507 0 19s8.507 19 19 19Z"
          />
          <path
            fill="#fff"
            d="M24.866 22c-.36 0-.686.197-.893.491C22.897 24.02 21.137 25 19.185 25c-3.201 0-5.885-2.637-5.885-6s2.684-6 5.885-6c1.952 0 3.712.98 4.788 2.508.207.295.534.492.893.492h3.476c.662 0 1.141-.634.888-1.245C27.586 10.787 23.707 8 19.185 8 13.173 8 8.3 12.925 8.3 19s4.873 11 10.885 11c4.522 0 8.4-2.787 10.045-6.755.253-.611-.226-1.245-.888-1.245h-3.476Z"
          />
        </g>
      </svg>
    </Link>
  );
}
