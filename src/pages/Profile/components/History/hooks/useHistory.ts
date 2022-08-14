import * as React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../../../../hooks/useTypedSelectors";
import { HistoriesActions } from "../../../../../redux/actions/histories";

const useHistory = () => {
    const [
        histories,
        pageSize,
        totalPages,
    ] = useTypedSelector(({ histories }) => [
        histories.histories,
        histories.pageSize,
        histories.totalPages,
    ]);

    const dispatch = useDispatch();

    const fetchHistories = React.useCallback(
        (page: number = 1) => {
            return Promise.all([
                dispatch(HistoriesActions.fetchHistories(page)),
            ]);
        },
        [dispatch]
    );

    return {
        fetchHistories,
        histories: histories,
        maxCount: totalPages,
        pageSize,
    };
};

export default useHistory;
