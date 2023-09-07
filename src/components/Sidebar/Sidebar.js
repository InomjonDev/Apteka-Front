import React, { useState } from "react";
import "./Sidebar.css";
import {
	AiTwotoneHome,
	AiOutlinePlusCircle,
	AiOutlineHome,
	AiFillPlusCircle,
	AiOutlineMenu,
	AiOutlineUser
} from "react-icons/ai";
// import { BiSolidBuildings } from "react-icons/bi";
import { GrUpdate } from "react-icons/gr";
import {
	RiDeleteBin5Line,
	RiDeleteBin5Fill,
	RiAdminLine
} from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ onToggle }) {
	const location = useLocation();
	const [open, setOpen] = useState(false);

	const toggle = () => {
		setOpen(!open);
		onToggle(!open);
	};

	const isPathActive = path => {
		return location.pathname === path;
	};

	const getHomeIcon = () => {
		return isPathActive("/") ? <AiTwotoneHome /> : <AiOutlineHome />;
	};

	const getPlusIcon = () => {
		return isPathActive("/create") ? (
			<AiFillPlusCircle />
		) : (
			<AiOutlinePlusCircle />
		);
	};

	const getDeleteIcon = () => {
		return isPathActive("/delete") ? (
			<RiDeleteBin5Fill />
		) : (
			<RiDeleteBin5Line />
		);
	};

	return (
		<div className={`sibedar ${open ? "short" : ""}`}>
			<div className="sibedar__logo">
				{/* <span>
          <BiSolidBuildings />
        </span> */}
				<button onClick={() => toggle()} className={`sidebar__toggle`}>
					<AiOutlineMenu />
				</button>
				<p>Apteka Name</p>
			</div>
			<div className="sidebar__links">
				<ul className="sidebar__list">
					<span>Menu</span>
					<li className={`sidebar__item ${isPathActive("/") ? "active" : ""}`}>
						<Link to="/">
							{getHomeIcon()}
							<span>Home</span>
						</Link>
					</li>
					<li
						className={`sidebar__item ${
							isPathActive("/create") ? "active" : ""
						}`}
					>
						<Link to={`/create`}>
							{getPlusIcon()}
							<span>Create</span>
						</Link>
					</li>
					<li
						className={`sidebar__item ${
							isPathActive("/update") ? "active" : ""
						}`}
					>
						<Link to={`/update`}>
							<GrUpdate style={{ fontSize: 20 }} />
							<span>Update</span>
						</Link>
					</li>
					<li
						className={`sidebar__item ${
							isPathActive("/delete") ? "active" : ""
						}`}
					>
						<Link to={`/delete`}>
							{getDeleteIcon()}
							<span>Delete</span>
						</Link>
					</li>
					<li
						className={`sidebar__item ${isPathActive("/debt") ? "active" : ""}`}
					>
						<Link to={`/debt`}>
							<AiOutlineUser />
							<span>Debtor</span>
						</Link>
					</li>
				</ul>

				<ul className="sidebar__list">
					<li className="sidebar__item">
						<Link to="/admin">
							<RiAdminLine />
							<span>Admin</span>
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Sidebar;
