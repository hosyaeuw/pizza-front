import { Link } from "react-router-dom";

import SVG from "../SVG";
import { Images } from "../../assets/images";

import styles from "./styles.module.scss";

const Logo = () => {
    return (
        <Link to="/" className={styles.logo}>
            <SVG className={styles["logo__ico"]} source={Images.icons.logo} />
            <span className={styles["logo__text"]}>Куда пицца</span>
        </Link>
    );
};

export default Logo;
