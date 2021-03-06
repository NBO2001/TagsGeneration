import reactDom from "react-dom";

const Portal = ({children}) => {
    const division = document.getElementById('root-modal-sub');

    return reactDom.createPortal(children, division);
};

export default Portal;