import { deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db, storage } from "../../../firebase/config";
import styles from "./ViewProducts.module.scss";
// import { FaEdit, FaTrashAlt } from "react-icons/fa";
// import Loader from "../../loader/Loader";
import { deleteObject, ref } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
// import {
//   selectProducts,
//   STORE_PRODUCTS,
// } from "../../../redux/slice/productSlice";
import useFetchCollection from "../../../customHooks/useFetchCollection";
import {
  selectProducts,
  STORE_PRODUCTS,
} from "../../../redux/productSlice/productSlice";
// import {
//   FILTER_BY_SEARCH,
//   selectFilteredProducts,
// } from "../../../redux/slice/filterSlice";
// import Search from "../../search/Search";
// import Pagination from "../../pagination/Pagination";

const ViewProducts = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector(selectProducts);
  // const filteredProducts = useSelector(selectFilteredProducts);
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  // Get Current Products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = filteredProducts.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );
  const dispatch = useDispatch();
  // get categorySlug from data

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: data,
      })
    );
  }, [dispatch, data]);

  // useEffect(() => {
  //   dispatch(FILTER_BY_SEARCH({ products, search }));
  // }, [dispatch, products, search]);

  // const confirmDelete = (id, imageURL) => {
  //   Notiflix.Confirm.show(
  //     "Delete Product!!!",
  //     "You are about to delete this product",
  //     "Delete",
  //     "Cancel",
  //     function okCb() {
  //       deleteProduct(id, imageURL);
  //     },
  //     function cancelCb() {
  //       console.log("Delete Canceled");
  //     },
  //     {
  //       width: "320px",
  //       borderRadius: "3px",
  //       titleColor: "orangered",
  //       okButtonBackground: "orangered",
  //       cssAnimationStyle: "zoom",
  //     }
  //   );
  // };

  const deleteProduct = async (id, imageURL) => {
    try {
      await deleteDoc(doc(db, "products", id));
      // delete image from storage
      imageURL.forEach(async (image) => {
        const storageRef = ref(storage, image);
        await deleteObject(storageRef);
      });
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className={styles.table}>
        <h2>All Products</h2>

        <div className={styles.search}>
          <p>
            <b>{data.length}</b> products found
          </p>
          {/* <Search value={search} onChange={(e) => setSearch(e.target.value)} /> */}
        </div>

        {data.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((product, index) => {
                const category = product.categorySlug.label;
                const { id, title, price, imageURL } = product;
                console.log(imageURL);
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL[0]}
                        alt={title}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{title}</td>
                    <td>{category}</td>
                    <td>{`${price} VNĐ`}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <i className="bx bx-edit-alt"></i>
                      </Link>
                      &nbsp;
                      <i
                        className="bx bx-trash"
                        onClick={() => deleteProduct(id, imageURL)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        {/* <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
        /> */}
      </div>
    </>
  );
};

export default ViewProducts;
