import React, { memo } from 'react';

import './modal.css';

type Props = {
  title: string;
  bodyText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const Modal = ({ title, bodyText, onConfirm, onCancel }: Props) => {
  const handleOuterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div onClick={handleOuterClick} className='modal'>
      <dialog>
        <h3 className='dialog-title'>{title}</h3>
        <p>{bodyText}</p>
        <div className='dialog-controls'>
          <button autoFocus onClick={onCancel} className='cancel'>
            Cancel
          </button>
          <button onClick={onConfirm} className='confirm'>
            Confirm
          </button>
        </div>
      </dialog>
    </div>
  );
};

export const ModalComponent = memo(Modal);
