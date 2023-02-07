/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../Card";
import { storage, db } from "../../../firebase/config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";
import styles from "./AddProduct.module.scss";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import { selectProducts } from "../../../redux/productSlice/productSlice";
import Select from "react-select";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import createSlug from "../../../utils/createSlug";

// const categories = [
//   {
//     display: "Áo thun",
//     categorySlug: "ao-thun",
//   },
//   {
//     display: "Áo somi",
//     categorySlug: "ao-somi",
//   },
//   {
//     display: "Quần jean",
//     categorySlug: "quan-jean",
//   },
// ];
const categories = [
  {
    label: "Áo thun",
    value: "ao-thun",
  },
  {
    label: "Áo somi",
    value: "ao-somi",
  },
  {
    label: "Quần jean",
    value: "quan-jean",
  },
];
const size = [
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
  { label: "XXL", value: "XXL" },
];
const colors = [
  {
    label: "Trắng",
    value: "white",
  },
  {
    label: "Hồng",
    value: "pink",
  },
  {
    label: "Đen",
    value: "black",
  },
  {
    label: "Vàng",
    value: "yellow",
  },
  {
    label: "Cam",
    value: "orange",
  },
  {
    label: "Xanh dương",
    value: "blue",
  },
];
const initialState = {
  title: "",
  price: "",
  imageURL: "",
  categorySlug: "",
  colors: [],
  slug: "",
  size: [],
  description: "",
};
const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);
  const productEdit = products.find((product) => product.id === id);
  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });
  console.log(product);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [urls, setUrls] = useState([]);
  console.log(urls);
  const navigate = useNavigate();
  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }
  const [images, setImages] = useState(
    productEdit?.imageURL ? productEdit.imageURL : []
  );
  console.log(images);

  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      slug: createSlug(product.title),
    }));
  }, [product.title]);

  // check urls == []
  const image = urls.length === 0 ? images : urls;
  console.log(image);
  //set product imageURL
  detectForm(
    id,
    "",
    useEffect(() => {
      setProduct({
        ...product,
        imageURL: images,
      });
    }, [images])
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleSelectSizeChange = (e) => {
    setProduct({ ...product, size: e });
  };
  const handleSelectColorChange = (e) => {
    setProduct({ ...product, colors: e });
  };
  const handleSelectCategoryChange = (e) => {
    setProduct({ ...product, categorySlug: e });
  };
  const handleImageChange = (e) => {
    const promises = [];
    // eslint-disable-next-line array-callback-return
    Array.from(e.target.files).map((file) => {
      const storageRef = ref(storage, `yoloShop/${Date.now()}${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          toast.error(error.message);
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrls((prev) => [...prev, downloadURL]);
            setImages((prev) => [...prev, downloadURL]);
          });
        }
      );
    });
    Promise.all(promises).then((result) => {
      toast.success("Image uploaded successfully.");
      console.log(urls);
    });
  };

  const addProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const docRef = addDoc(collection(db, "products"), {
        title: product.title,
        price: product.price,
        imageURL: product.imageURL,
        categorySlug: product.categorySlug,
        colors: product.colors,
        slug: createSlug(product.title),
        size: product.size,
        description: product.description,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });
      toast.success("Product added successfully.");
      navigate("/admin/all-products");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (productEdit.imageURL !== product.imageURL) {
      productEdit.imageURL.map((image) => {
        const desertRef = ref(storage, image);
        deleteObject(desertRef)
          .then(() => {
            console.log("delete success");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }

    try {
      setDoc(doc(db, "products", id), {
        title: product.title,
        price: product.price,
        imageURL: image,
        categorySlug: product.categorySlug,
        colors: product.colors,
        slug: createSlug(product.title),
        size: product.size,
        description: product.description,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      toast.success("Product Edited Successfully");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <React.Fragment>
      <div className={styles.product}>
        <h2>{detectForm(id, "Add New Product", "Edit Product")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label>Product name:</label>
            <input
              type="text"
              placeholder="Product name"
              required
              name="title"
              value={product.title}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? ` Uploading ${uploadProgress}%`
                      : `Upload complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="Product Image"
                name="image"
                onChange={(e) => handleImageChange(e)}
                multiple
              />
              {detectForm(
                id,
                null,
                product.imageURL === ""
                  ? null
                  : product.imageURL.map((url, index) => (
                      <input
                        type="text"
                        required
                        placeholder="Image URL"
                        name={`image0${index + 1}`}
                        value={url}
                        disabled
                      />
                    ))
              )}
              {urls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt="product"
                  style={{ width: "150px", margin: "0 40px" }}
                />
              ))}
            </Card>
            <label>Product price:</label>
            <input
              type="number"
              placeholder="Product price"
              required
              name="price"
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Size:</label>
            <Select
              options={size}
              isMulti={true}
              closeMenuOnSelect={false}
              name="size"
              defaultValue={product.size}
              onChange={(e) => handleSelectSizeChange(e)}
            />

            <label>Colors:</label>
            <Select
              options={colors}
              isMulti={true}
              closeMenuOnSelect={false}
              defaultValue={product.colors}
              onChange={(e) => handleSelectColorChange(e)}
            />
            <label>Product Category:</label>
            <Select
              options={categories}
              isMulti={false}
              closeMenuOnSelect={true}
              defaultValue={product.categorySlug}
              onChange={(e) => handleSelectCategoryChange(e)}
            />

            <label>Product Description</label>
            <textarea
              name="description"
              required
              value={product.description}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            ></textarea>
            <button className="--btn --btn-primary">
              {" "}
              {detectForm(id, "Save Product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default AddProduct;
