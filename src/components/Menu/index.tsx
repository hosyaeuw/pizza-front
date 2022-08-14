import Logo from "../Logo";
import Categories from "./components/Categories";
import CartButton from "./components/CartButton";

import styles from "./styles.module.scss";

const Menu = () => {
    return (
        <div className={styles.menu}>
            <Logo />
            <div className={styles.menu__categories}>
                <Categories />
            </div>
            <CartButton />
        </div>
    );
};

export default Menu;
