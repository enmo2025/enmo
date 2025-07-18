import React from 'react';
import { Button } from '../ui/button';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title,
  description,
  confirmText,
  cancelText,
  onCancel,
  onConfirm,
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-30" />
      <div className="relative z-10 mx-auto flex w-full max-w-sm flex-col items-center gap-5 rounded-lg border border-[#DBD0BB] bg-white px-5 py-6 shadow-lg">
        <h2 className="text-center text-title-lg font-bold text-warning">{title}</h2>
        {description && (
          <p className="rounded-lg border border-warning p-5 text-center text-sm text-warning">{description}</p>
        )}
        <div className="flex w-full gap-3">
          <Button typeStyle="round" size="xl" onClick={onCancel} variant="outline" className="w-1/2 text-body-md">
            {cancelText}
          </Button>
          <Button typeStyle="round" size="xl" onClick={onConfirm} variant="outline" className="w-1/2 text-body-md">
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
