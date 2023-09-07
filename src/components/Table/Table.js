import React, { useState, useEffect } from "react";
import axios from "../../api";
import "./Table.css";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineCreate } from "react-icons/md";
import { AiOutlineLine, AiOutlinePlus } from "react-icons/ai";
import "number-brm";
import Modal from "../Modal/Modal";
import { toast } from "react-toastify";

const Table = ({ isDelete, sale, searchValue, update }) => {
	const [dataPro, setDataPro] = useState([]);
	const [quantity, setQuantity] = useState();
	const [reload, setReload] = useState(false);
	const [quantityMap, setQuantityMap] = useState({});
	const [open, setOpen] = useState(false);
	const [selectedItemId, setSelectedItemId] = useState(null);

	const handleMinus = (e, id) => {
		e.preventDefault();
		const itemQuantity = parseInt(quantityMap[id]) || 1;

		axios
			.patch(`/patch/quantity-minus/product/${id}`, { quantity: itemQuantity })
			.then(res => {
				setReload(p => !p);
				setQuantityMap(prevMap => ({ ...prevMap, [id]: "" }));
			})
			.catch(err => {
				console.log(err.response.data.msg);
			});
	};

	const handlePlus = (e, id) => {
		e.preventDefault();
		const itemQuantity = quantityMap[id] || 1;
		axios
			.patch(`/patch/quantity-plus/product/${id}`, {
				quantity: itemQuantity
			})
			.then(res => {
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
			.get("/get/products", {
				params: {
					value: searchValue
				}
			})
			.then(res => {
				setDataPro(res.data.innerData);
			})
			.catch(err => setDataPro([]));
	}, [searchValue, reload]);

	const handleDelete = id => {
		axios
			.delete(`/delete/product/${id}`)
			.then(() => {
				setDataPro(prevDataPro => prevDataPro.filter(item => item._id !== id));
				toast.warn("Product is deleted", {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light"
				});
			})
			.catch(err => {
				console.error("Error deleting product:", err);
			});
	};
	const calculateExpirationClass = expirationDate => {
		const currentDate = new Date();
		const sixMonthsInMilliseconds = 6 * 30 * 24 * 60 * 60 * 1000;

		const timeDifference = new Date(expirationDate) - currentDate;

		if (timeDifference > sixMonthsInMilliseconds) {
			return "ex-green";
		} else {
			return "ex-red";
		}
	};

	return (
		<table>
			<thead>
				<tr>
					<th className="title">Title</th>
					<th className="price">Price</th>
					<th className="expiration">Expiration Date</th>
					<th className="quantity">Quantity</th>
					<th className="firma">Firma</th>
					{isDelete && <th className="delete">Delete</th>}
					{sale && <th className="sale">Sale</th>}
					{update && <th className="sale">Update</th>}
				</tr>
			</thead>
			<tbody>
				{dataPro?.map(item => (
					<tr key={item._id}>
						<td className="title">{item.title}</td>
						<td className="price">{Math.floor(item.price).brm("int")} so'm</td>
						<td
							className={`expiration ${calculateExpirationClass(
								item.expirationDate
							)}`}
						>
							{item.expirationDate.split("-").reverse().join(".")}
						</td>
						<td className="quantity">{item.quantityOfProduct}</td>
						<td className="firma">{item.firma}</td>
						{isDelete ? (
							<td className="delete">
								<button
									className="delete-btn"
									onClick={() => handleDelete(item._id)}
								>
									<FiTrash2 />
								</button>
							</td>
						) : (
							<></>
						)}
						{sale ? (
							<td className="table__input">
								<form action="#">
									<button
										className={`red btn ${
											item.quantityOfProduct <= 0 ? "disabled" : ""
										}`}
										type="submit"
										disabled={item.quantityOfProduct <= 0}
										onClick={e => handleMinus(e, item._id)}
									>
										<AiOutlineLine />
									</button>

									<input
										type="text"
										value={quantityMap[item._id] || ""}
										onChange={e =>
											setQuantityMap(prevMap => ({
												...prevMap,
												[item._id]: +e.target.value
											}))
										}
										placeholder="Minus Quantity"
									/>
									<button
										type="submit"
										onClick={e => handlePlus(e, item._id)}
										className="green btn"
									>
										<AiOutlinePlus />
									</button>
								</form>
							</td>
						) : (
							<></>
						)}
						{update ? (
							<td className="update">
								<button
									className="green btn"
									onClick={() => {
										setOpen(true);
										setSelectedItemId(item._id);
									}}
								>
									<MdOutlineCreate />
								</button>
							</td>
						) : (
							<></>
						)}
					</tr>
				))}
			</tbody>
			{open && (
				<Modal
					setOpenModal={setOpen}
					setReload={setReload}
					itemId={selectedItemId}
				/>
			)}
		</table>
	);
};

export default Table;
