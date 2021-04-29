import "./EditScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../redux/actions/productActions";
import { getProductDetails } from "../redux/actions/productActions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const [openAlert, setOpenAlert] = useState(false);
  const [severityAlert, setSeverityAlert] = useState("");
  const [message, setMessage] = useState("");

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
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
    debugger;

    if (!(name && description && countInStock && imageUrl && price)) {
      debugger;
      setMessage("Enter all of the fields");
      setOpenAlert(true);
      setSeverityAlert("warning");
      return;
    }
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
      setMessage("Product has been updated");

      setOpenAlert(true);
      setSeverityAlert("success");
    } else {
      const product = {
        name: name,
        description: description,
        countInStock: countInStock,
        imageUrl: imageUrl,
        price: price,
      };

      dispatch(createProduct(product)).then((respProdId) => {
        setMessage("Product has been created");
        setOpenAlert(true);
        setSeverityAlert("success");
        props.history.push(`/product/${respProdId}/new`);
      });
    }
  };
  const deleteHandler = () => {
    dispatch(deleteProduct(props.match.params.id));
    setSeverityAlert("warning");
    setOpenAlert(true);
    setMessage("Product has been deleted");

    props.history.push("/");
  };
  return (
    <div className="container">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="input__container">
            <div className="inputfield__div">
              <TextField
                required
                className="input"
                value={name || ""}
                onChange={handleChangeName}
                label="Name"
                variant="outlined"
              />
            </div>
            <div className="inputfield__div">
              <TextField
                className="input"
                value={description || ""}
                onChange={handleChangeDescription}
                multiline
                rows={4}
                label="Description"
                variant="outlined"
              />
            </div>
            <div className="inputfield__div">
              <TextField
                className="input"
                value={imageUrl || ""}
                onChange={handleChangeImageUrl}
                label="Image Url"
                variant="outlined"
              />
            </div>
            <div className="inputfield__div">
              <div className="priceCIS__div">
                <TextField
                  type="number"
                  className="inputCountInStock"
                  value={countInStock || ""}
                  onChange={handleChangeCountInStock}
                  label="Count In Stock"
                  variant="outlined"
                />

                <TextField
                  type="number"
                  className="inputPrice"
                  value={price || ""}
                  onChange={handleChangePrice}
                  label="Price ($)"
                  variant="outlined"
                />
              </div>
            </div>
          </div>

          <div className="buttons__div">
            {prodId ? (
              <Button
                className="crudButton"
                variant="contained"
                color="primary"
                onClick={submitHandler}
              >
                Save
              </Button>
            ) : (
              <Button
                className="crudButton"
                variant="contained"
                color="primary"
                onClick={submitHandler}
              >
                Create
              </Button>
            )}

            {prodId ? (
              <Button
                className="crudButton"
                variant="contained"
                color="secondary"
                onClick={deleteHandler}
              >
                Delete
              </Button>
            ) : null}
          </div>
          <Snackbar
            open={openAlert}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
          >
            <Alert onClose={handleCloseAlert} severity={severityAlert}>
              {message}
            </Alert>
          </Snackbar>
        </>
      )}
    </div>
  );
};

export default EditScreen;
