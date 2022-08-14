import * as React from "react";
import { useNavigate } from "react-router-dom";
import useCatalog from "../../../../pages/Home/hooks/useCatalog";

import styles from "./styles.module.scss";

type Props = {};

const Categories:React.FC<Props> = () => {
    const navigate = useNavigate();
    const { categories } = useCatalog();

    const changeRoute = () => {
        navigate("/");
    };

    return (
        <div className={styles.categories}>
            {categories.map((category) => (
                <a
                    className={styles.categories__item}
                    key={category.id}
                    href={`#${category.name}`}
                    onClick={changeRoute}
                >
                    {category.name}
                </a>
            ))}
        </div>
    );
};

export default Categories;
