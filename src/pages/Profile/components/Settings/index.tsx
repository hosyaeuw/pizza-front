import * as React from "react";
import { PasswordForm, ProfileForm, Subscribers } from "./components";

import styles from "./styles.module.scss";

type Props = {};

const Settings: React.FC<Props> = () => {
    return (
        <div className={styles.settings}>
            <div className={styles["settings-field"]}>
                <ProfileForm />
            </div>
            <div className={styles["settings-field"]}>
                <PasswordForm />
            </div>
            <Subscribers />
        </div>
    );
};

export default Settings;
