interface AlertPopupProps {
    open: boolean;
    message: string;
    onClose: () => void;
    title?: string
}

const AlertPopup = ({ open, message, onClose, title }: AlertPopupProps) => {
    if (!open) return null;
    return <dialog className="modal" open={open}>
        <div className="modal-box text-white card-bg-dev">
            <h3 className="text-lg font-bold">{title ? title : "Alert"}</h3>
            <p className="py-4">{message ?? ''}</p>
            <div className="modal-action">
                <label className="btn" onClick={onClose}>Close</label>
            </div>
        </div>
    </dialog>
}

export default AlertPopup