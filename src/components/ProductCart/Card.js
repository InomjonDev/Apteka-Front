import React, { useEffect, useState } from "react";
import "./Card.css";
import { AiOutlineLine } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import axios from "../../api";

function Card({ isDelete }) {
  const [dataPro, setDataPro] = useState([]);
  const [quantity, setQuantity] = useState();
  const [reload, setReload] = useState(false);
  const [quantityMap, setQuantityMap] = useState({});

  const handleMinus = (e, id) => {
    e.preventDefault();
    const itemQuantity = quantityMap[id] || 0;
    axios
      .patch(`/patch/quantity-minus/product/${id}`, { quantity: itemQuantity })
      .then(res => {
        console.log(res.data.innerData);
        setReload(p => !p);
      })
      .catch(err => {
        console.log(err.response.data.msg);
      });

    setQuantity("");
    setQuantityMap(prevMap => ({ ...prevMap, [id]: "" }));
  };

  useEffect(() => {
    axios
      .get("/get/products")
      .then(res => {
        setDataPro(res.data.innerData);
      })
      .catch(err => setDataPro([]));
  }, [reload]);

  const handleDelete = id => {
    axios
      .delete(`/delete/product/${id}`)
      .then(() => {
        setDataPro(prevDataPro => prevDataPro.filter(item => item._id !== id));
      })
      .catch(err => {
        console.error("Error deleting product:", err);
      });
  };

  return (
    <div className="card">
      <div className="card__wrapper">
        {dataPro.map(item => (
          <div className="card__item" key={item._id}>
            <p className="card__title">{item.title}</p>
            <div className="card__actions">
              <span className="card__actions-item">
                {item.quantityOfProduct} dona
              </span>
              <span className="card__actions-price">{item.price} so'm</span>
              <span className="card__actions-date">{item.expirationDate}</span>
              <span className="card__actions-firma">{item.firma}</span>
            </div>
            {isDelete ? (
              <button
                onClick={() => handleDelete(item._id)}
                className="delete-btn"
              >
                <FiTrash2 />
              </button>
            ) : (
              <div className="card__input">
                <form action="#" onSubmit={e => handleMinus(e, item._id)}>
                  <input
                    type="text"
                    value={quantityMap[item._id] || ""}
                    onChange={e =>
                      setQuantityMap(prevMap => ({
                        ...prevMap,
                        [item._id]: e.target.value,
                      }))
                    }
                    placeholder="Minus Quantity"
                  />
                  <button type="submit">
                    <AiOutlineLine />
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
