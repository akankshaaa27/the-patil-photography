import React, { useState, useCallback } from "react";
import { Trash2 } from "lucide-react";

export default function ConfirmModal({ open, title, message, onConfirm, onCancel, confirmText = 'Delete' }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl p-6 w-full max-w-sm text-center shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 size={24} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 mb-6 text-sm">{message}</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-md"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

// hook to simplify usage pattern
export function useConfirm() {
  const [data, setData] = useState(null);

  const confirm = useCallback(({ title, message, confirmText }) => {
    return new Promise((resolve) => {
      setData({ title, message, confirmText, resolve });
    });
  }, []);

  const handleCancel = () => {
    if (data) data.resolve(false);
    setData(null);
  };

  const handleConfirm = () => {
    if (data) data.resolve(true);
    setData(null);
  };

  const ConfirmDialog = data ? (
    <ConfirmModal
      open={true}
      title={data.title}
      message={data.message}
      confirmText={data.confirmText}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  ) : null;

  return { confirm, ConfirmDialog };
}
