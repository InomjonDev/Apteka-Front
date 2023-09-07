import axios from "axios";

const mainUrl = axios.create({
	baseURL: "https://apteka--inomjon12.repl.co/"
	// baseURL: "http://localhost:8000"
});

export default mainUrl;
