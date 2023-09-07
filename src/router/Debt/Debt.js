import "./Debt.css";
import axios from "../../api";
import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "number-brm";
import moment from "moment";
import "moment/locale/uz";
import { toast } from "react-toastify";
import Search from "../../components/Search/Search";

const initialState = {
  name: "",
  phoneNumber: "",
  orderedProducts: "",
  returnedDate: "",
  debt: "",
};

function Debt() {
  const [data, setData] = useState([]);
  const [modal, setIsModal] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [values, setValues] = useState(initialState);
  const [searchValue, setSearchValue] = useState("");
  const [selectedItem, setSelectedItemId] = useState(null);

  // Updating data values
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [orderedProducts, setOrderedProducts] = useState("");
  const [returnedDate, setReturnedDate] = useState("");
  const [debt, setDebt] = useState("");

  const handleSearch = value => {
    setSearchValue(value);
  };

  useEffect(() => {
    axios
      .get("/get/debtors", {
        params: {
          value: searchValue,
        },
      })
      .then(res => setData(res.data.innerData))
      .catch(err => console.log(err));
  }, [searchValue, reload]);

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post("/post/debtor", values)
      .then(res => {
        toast.success(res.data.msg);
        setValues(initialState);
        setReload(p => !p);
      })
      .catch(err => {
        console.log(err);
        toast.error(err.response.data.msg);
      });
  };

  const handleDelete = id => {
    axios
      .delete(`/delete/debtor/${id}`)
      .then(() => {
        setData(prevDataPro => prevDataPro.filter(item => item._id !== id));
      })
      .catch(err => {
        console.error("Error deleting product:", err);
      });
  };

  const handleUpdate = e => {
    e.preventDefault();

    axios
      .put(`/put/debtor/${selectedItem}`, {
        name,
        phoneNumber,
        orderedProducts,
        returnedDate,
        debt,
      })
      .then(res => {
        console.log(res);
        setReload(p => !p);
        setName("");
        setPhoneNumber("");
        setOrderedProducts("");
        setReturnedDate("");
        setDebt("");
      })
      .catch(err => {
        console.log(err.response.data.msg);
      });
  };

  return (
    <>
      <Search onSearch={handleSearch} />
      <div className="debtor__container">
        <div className="debtor__stats">
          <div>
            <p>Umumiy qarzdorlar soni: {data.length}</p>
          </div>
          <div>
            <p>
              Umumiy qarzdorlar hisobi:{" "}
              {data
                .reduce((totalDebt, item) => totalDebt + item.debt, 0)
                .brm("int")}{" "}
              so'm
            </p>
          </div>
          <div className="navigation">
            <button onClick={() => setIsModal(true)} className="add">
              Qarzdor qo'shish
            </button>
          </div>
        </div>
        <div className="debtor__body">
          <table className={modal ? "opacity" : ""}>
            <thead>
              <tr>
                <th>Qarzdor ismi</th>
                <th>Telefon raqami</th>
                <th>Olgan mahsulotlari</th>
                <th>Olgan vaqti</th>
                <th>Qaytarish vaqti</th>
                <th>Umumiy qarz</th>
                <th>D/U</th>
              </tr>
            </thead>

            <tbody>
              {data?.map(item => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.orderedProducts}</td>
                  <td>{moment(item.recivedDate).locale("uz").format("LLL")}</td>
                  <td>{item.returnedDate.split("-").reverse().join(".")}</td>
                  <td>{item.debt.brm("int")} so'm</td>
                  <td>
                    <button
                      onClick={() => {
                        setUpdateModal(true);
                        setSelectedItemId(item._id);
                      }}
                      className="edit__debtor"
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="delete__debtor"
                    >
                      <AiOutlineDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {modal ? (
            <form className="debtor__modal" onSubmit={handleSubmit}>
              <h1>Yangi qarzdor qo'shish</h1>
              <input
                type="text"
                placeholder="Qarzdor ismi"
                value={values.name}
                onChange={e => setValues(p => ({ ...p, name: e.target.value }))}
              />
              <input
                type="number"
                placeholder="Telefon raqami"
                value={values.phoneNumber}
                onChange={e =>
                  setValues(p => ({ ...p, phoneNumber: +e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="Olgan mahsulotlari"
                value={values.orderedProducts}
                onChange={e =>
                  setValues(p => ({ ...p, orderedProducts: e.target.value }))
                }
              />
              <input
                type="date"
                placeholder="Qaytarish vaqti"
                value={values.returnedDate}
                onChange={e =>
                  setValues(p => ({ ...p, returnedDate: e.target.value }))
                }
              />
              <input
                type="number"
                placeholder="Umumiy qarz hisobi"
                value={values.debt}
                onChange={e =>
                  setValues(p => ({ ...p, debt: +e.target.value }))
                }
              />
              <div>
                <button type={"submit"} className="add__debtor__btn">
                  Qo'shish
                </button>
                <button
                  type="button"
                  className="close__modal"
                  onClick={() => {
                    setIsModal(false);
                  }}
                >
                  Yopish
                </button>
              </div>
            </form>
          ) : (
            ""
          )}

          {updateModal ? (
            <>
              <form className="debtor__modal" onSubmit={handleUpdate}>
                <h1>Qarzdorni qo'shish yangilash</h1>
                <input
                  type="text"
                  placeholder="Qarzdor ismi"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />
                <input
                  type="number"
                  placeholder="Telefon raqami"
                  value={phoneNumber}
                  onChange={e => {
                    setPhoneNumber(+e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Olgan mahsulotlari"
                  value={orderedProducts}
                  onChange={e => {
                    setOrderedProducts(e.target.value);
                  }}
                />
                <input
                  type="date"
                  placeholder="Qaytarish vaqti"
                  value={returnedDate}
                  onChange={e => {
                    setReturnedDate(e.target.value);
                  }}
                />
                <input
                  type="number"
                  placeholder="Umumiy qarz hisobi"
                  value={debt}
                  onChange={e => {
                    setDebt(+e.target.value);
                  }}
                />

                <div>
                  <button type="submit">O'zgartirish</button>
                  <button
                    type="button"
                    className="close__modal"
                    onClick={() => {
                      setUpdateModal(false);
                    }}
                  >
                    Yopish
                  </button>
                </div>
              </form>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default Debt;
