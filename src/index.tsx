import * as React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { Provider } from "react-redux";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./global-styles.scss";

import store from "./redux/store";

const ScrollToTop: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const location = useLocation();
    React.useLayoutEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);

    return <>{children}</>;
};

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </Router>
    </Provider>,
    document.getElementById("root")
);
