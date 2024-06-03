interface ConfModalProps {
    modalId: string;
    modalHeading: string;
    onDelete: () => void;
}

const ConfModal = ({ modalId, modalHeading, onDelete }: ConfModalProps): JSX.Element => {
    return (
        <div className="modal fade" id={modalId} tabIndex={-1} aria-labelledby={`${modalId}Label`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h5 className="modal-title text-white">{modalHeading}</h5>
                        <button type="button" className="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">CLOSE</button>
                        <button type="button" className="btn btn-light btn-sm" data-bs-dismiss="modal" onClick={onDelete}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfModal;