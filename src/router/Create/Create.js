import React, { useState } from "react";
import "./Create.css";
import axios from "../../api";
import { toast } from "react-toastify";

const initialState = {
	title: "",
	price: "",
	expirationDate: "",
	quantityOfProduct: "",
	firma: ""
};

function Create() {
	const [data, setData] = useState(initialState);
	const [loading, setLoading] = useState(false);

	const handleChange = e => {
		let name = e.target.name;
		let value = e.target.value;
		setData(p => ({ ...p, [name]: value }));
	};

	const handleCreate = e => {
		e.preventDefault();

		setLoading(true);
		axios
			.post("/post/product", data)
			.then(res => {
				toast.success(res.data.msg);
				setData(initialState);
			})
			.catch(err => {
				console.log(err);
				toast.error(err.response.data.msg);
			})
			.finally(() => setLoading(false));
	};

	return (
		<div className="create">
			<div className="create__wrapper">
				<form action="#" onSubmit={handleCreate} className="create__form">
					<input
						type="text"
						value={data.title}
						onChange={handleChange}
						name="title"
						required
						placeholder="Title"
					/>
					<input
						type="number"
						value={data.price}
						onChange={handleChange}
						name="price"
						required
						placeholder="Price"
					/>
					<input
						type="date"
						value={data.expirationDate}
						onChange={handleChange}
						name="expirationDate"
						required
						placeholder="Date"
					/>
					<input
						type="number"
						value={data.quantityOfProduct}
						onChange={handleChange}
						name="quantityOfProduct"
						required
						placeholder="Quantity"
					/>
					<input
						type="text"
						value={data.firma}
						onChange={handleChange}
						name="firma"
						required
						placeholder="Firma"
					/>
					<button type="submit" disabled={loading}>
						{loading ? <div className="ring"></div> : "Create"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default Create;
