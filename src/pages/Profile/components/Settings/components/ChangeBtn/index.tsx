import * as React from "react";
import { Images } from "../../../../../../assets/images";
import { Button, SVG } from "../../../../../../components";

import styles from "./styles.module.scss";

type Props = {
    onClick: () => void;
};

const ChangeBtn: React.FC<Props> = ({ onClick }) => {
    return (
        <Button.Text onClick={onClick} className={styles.btn} type="button">
            <SVG
                height={20}
                width={20}
                source={Images.icons.edit}
                className={styles.btn__ico}
            />
            Изменить
        </Button.Text>
    );
};

export default ChangeBtn;
