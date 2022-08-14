import { useTypedSelector } from "./useTypedSelectors";

const useCompany = () => {
    const [info] = useTypedSelector(({ company }) => [company.info]);
    return { info };
};

export default useCompany;
