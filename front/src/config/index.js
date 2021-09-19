import axios from "axios";

export default axios.create({
    baseURL: `http://${process.env.REACT_APP_IP}:5081/api`
});