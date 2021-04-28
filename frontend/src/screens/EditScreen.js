import "./EditScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../redux/actions/productActions";
import { getProductDetails } from "../redux/actions/productActions";

const EditScreen = (props) => {
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  const prodId = props.match.params.id;
  useEffect(() => {
    if (product && prodId !== product._id) {
      dispatch(getProductDetails(prodId));
    }
  }, [dispatch, prodId, product]);

  const [name, setName] = useState(product ? product.name : "");
  const [description, setDescription] = useState(
    product ? product.description : ""
  );
  const [countInStock, setCountInStock] = useState(
    product ? product.countInStock : ""
  );
  const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : "");
  const [price, setPrice] = useState(product ? product.price : "");

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setCountInStock(product.countInStock);
      setImageUrl(product.imageUrl);
      setPrice(product.price);
    }
  }, [product]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeCountInStock = (e) => {
    setCountInStock(e.target.value);
  };
  const handleChangeImageUrl = (e) => {
    setImageUrl(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const submitHandler = () => {
    //edit or create
    if (prodId) {
      const product = {
        name: name,
        description: description,
        countInStock: countInStock,
        imageUrl: imageUrl,
        price: price,
      };
      dispatch(updateProduct(prodId, product));
    } else {
      const product = {
        name: name,
        description: description,
        countInStock: countInStock,
        imageUrl: imageUrl,
        price: price,
      };
      dispatch(createProduct(product));
    }
  };
  const deleteHandler = () => {
    dispatch(deleteProduct(props.match.params.id));
    props.history.push("/");
  };
  return (
    <div>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <label>
            Name:
            <input type="text" value={name || ""} onChange={handleChangeName} />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={description || ""}
              onChange={handleChangeDescription}
            />
          </label>
          <label>
            CountInStock:
            <input
              type="text"
              value={countInStock || ""}
              onChange={handleChangeCountInStock}
            />
          </label>
          <label>
            ImageUrl:
            <input
              type="text"
              value={imageUrl || ""}
              onChange={handleChangeImageUrl}
            />
          </label>
          <label>
            Price:
            <input
              type="text"
              value={price || ""}
              onChange={handleChangePrice}
            />
          </label>
          <button onClick={submitHandler}> save</button>
          {prodId ? <button onClick={deleteHandler}> delete</button> : null}
        </>
      )}
    </div>
  );
};

export default EditScreen;
