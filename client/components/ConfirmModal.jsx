import React, { useState, useCallback } from "react";
import { Trash2 } from "lucide-react";

export default function ConfirmModal({ open, title, message, onConfirm, onCancel, confirmText = 'Delete', variant = 'modal' }) {
  if (!open) return null;

  // Modal center (default)
  if (variant === 'modal') {
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

  // Slide-in drawer from right
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* backdrop */}
      <div className="flex-1 bg-black/40" onClick={onCancel} />
      <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 transform translate-x-0 transition-transform duration-200">
        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
          <Trash2 size={24} />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 mb-6 text-sm">{message}</p>
        <div className="flex gap-3">
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
// useConfirm provides a convenient promise-based API for showing
// confirmation dialogs.  By default the dialog now uses the
// centered `modal` variant, so it appears in the middle of the
// screen instead of sliding in from the right.  Callers may still
// override the `variant` option when invoking `confirm()` if a
// slide-in drawer is specifically desired.
export function useConfirm() {
  const [data, setData] = useState(null);

  // confirm accepts either a string or an object with options
  // options: { title, message, confirmText, variant }
  const confirm = useCallback((opts = {}) => {
    const defaultPayload = {
      title: "Delete this invoice?",
      message: "This action cannot be undone.",
      confirmText: "Delete",
      // changed default variant to modal so dialogs appear centered
      // instead of sliding in from the right side
      variant: "modal",
    };

    let payload = {};
    if (typeof opts === "string") {
      payload = { ...defaultPayload, title: opts };
    } else {
      payload = { ...defaultPayload, ...opts };
    }

    return new Promise((resolve) => {
      setData({ ...payload, resolve });
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
      variant={data.variant}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
    />
  ) : null;

  return { confirm, ConfirmDialog };
}
