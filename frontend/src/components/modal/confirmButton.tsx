import { ButtonPrimary, ButtonSecondary } from "@/components/button";
import Modal from "@/components/modal/commonModal";

const DeleteConfirmModal = ({
  title,
  description,
  onClose,
  onConfirm,
}: Readonly<{
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}>) => {
  const handleConfirm = () => {
    onClose();
    onConfirm();
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-6">
        <h1 className="text-lg font-bold">{title}</h1>
        <h1 className="text-xs text-gray-dark ">{description}</h1>
        <div className="pt-3 flex justify-between min-w-40">
          <div>
            <ButtonSecondary dense label="いいえ" onClick={onClose} />
          </div>
          <div>
            <ButtonPrimary dense label="はい" onClick={handleConfirm} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;