import { Routes, Route } from "react-router-dom";

import { Footer, Header, Menu } from "./components";
import { Cart, Home, Profile } from "./pages";

// TODO: переделать корзину, чтобы при добавлении/удалении ингредиентов были разные сущности
// TODO: в истории переделать пагинацию, чтобы пред страница была слева, если больше 2
// TODO: фильтры через тэги
// TODO: самовывоз

const App = () => {
    return (
        <div className="root-container">
            <div className="border bg-white">
                <div className="page-container">
                    <Header />
                </div>
            </div>
            <div className="border bg-white sticky">
                <div className="page-container">
                    <Menu />
                </div>
            </div>
            <div className="page-container">
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile/*" element={<Profile />} />
                </Routes>
            </div>
            <div className="footer">
                <div className="page-container">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default App;
