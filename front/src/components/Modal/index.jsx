import React from "react";
import PortalModal from './Portal';
import { Overley, Dialog} from './styles';

const Modal = ({ children, open, onClose, ...rest}) => {

    if(!open) return null;


    function onOverlayClick(){
        onClose();
    }

    function onDialogClick(e){
        e.stopPropagation();
    }

    return (
        <PortalModal>
            <Overley onClick={onOverlayClick}>
                <Dialog {...rest} onClick={onDialogClick}>{children}</Dialog>
            </Overley>
        </PortalModal>
    );
};

export default Modal;