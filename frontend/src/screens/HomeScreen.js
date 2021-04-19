import "./HomeScreen.css";

import Product from "../components/Product";
const HomeScreen = () => {
  return (
    <div className="homescreen">
      <h2 className="homescree__title">
        <div className="homescreen__products">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </h2>
    </div>
  );
};

export default HomeScreen;
