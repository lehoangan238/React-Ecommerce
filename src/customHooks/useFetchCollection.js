import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase/config";
const useFetchCollection = (collectionName) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getCollection = () => {
    setIsLoading(true);
    try {
      const docRef = collection(db, collectionName);
      const q = query(docRef, orderBy("createdAt", "desc"));
      onSnapshot(q, (querySnapshot) => {
        const allData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(allData);
        setIsLoading(false);
      });
    } catch (err) {
      toast.error(err.message);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading };
};

export default useFetchCollection;
