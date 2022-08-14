import * as React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../hooks/useTypedSelectors";
import { UserActions } from "../../../redux/actions/user";

export type AuthFormValues = {
    code?: string;
    phone?: string;
};

const useProfile = () => {
    const [user] = useTypedSelector(({ user }) => [user.user]);

    const dispatch = useDispatch();

    const isAuth = React.useMemo(() => {
        if (!!user) {
            return true;
        }
        return false;
    }, [user]);

    const fetchUser = React.useCallback(
        (values: AuthFormValues) => {
            dispatch(UserActions.fetchUser());
        },
        [dispatch]
    );

    return {
        isAuth,
        user,
        fetchUser,
    };
};

export default useProfile;
