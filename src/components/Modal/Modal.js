import React, { useState } from "react";
import "./Modal.css";
import axios from "../../api";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

const initialState = {
  title: "",
  price: "",
  expirationDate: "",
  firma: "",
};

function Modal({ setOpenModal, itemId, setReload }) {
  const [data, setData] = useState(initialState);
  const [loader, setLoader] = useState(false);

  const handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    setData(p => ({ ...p, [name]: value }));
  };

  const handleUpdate = e => {
    e.preventDefault();
    setLoader(true);

    const formattedDate = data.expirationDate.split("-").reverse().join(".");
    const updatedData = { ...data, expirationDate: formattedDate };

    axios
      .put(`/put/product/${itemId}`, updatedData)
      .then(res => {
        toast.success(res.data.msg);
        setReload(true);
      })
      .catch(err => {
        toast.error(err.response.data.msg);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className="body">
          <form action="#" onSubmit={handleUpdate}>
            <input
              type="text"
              value={data.title}
              onChange={handleChange}
              name="title"
              placeholder="Title"
            />
            <input
              type="number"
              value={data.price}
              onChange={handleChange}
              name="price"
              placeholder="Price"
            />
            <input
              type="date"
              value={data.expirationDate}
              onChange={handleChange}
              name="expirationDate"
              placeholder="Date"
            />
            <input
              type="text"
              value={data.firma}
              onChange={handleChange}
              name="firma"
              placeholder="Firma"
            />
            <button disabled={loader} type="submit">
              {loader ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
