interface FormModalProps<T extends Record<string, unknown>> {
  form: T;
  fields: {
    key: keyof T;
    label: string;
    type?: 'text' | 'number' | 'password' | 'select';
    options?: { value: string; label: string }[];
    readOnly?: boolean;
  }[];
  onChange: (field: keyof T, value: string) => void;
  onSubmit: () => void;
  onFileChange?: (file: File) => void;
  onOpenImagePicker?: () => void; // ✅ mới thêm
  onClose?: () => void;
  mode?: 'add' | 'edit';
  title?: string;
  submitText?: string;
  imagePreviewUrl?: string;
}

const FormModal = <T extends Record<string, unknown>>({
  form,
  fields,
  onChange,
  onSubmit,
  onClose,
  onFileChange,
  onOpenImagePicker,
  imagePreviewUrl,
  mode = 'add',
  title,
  submitText,
}: FormModalProps<T>) => {
  const defaultTitle = mode === 'edit' ? 'Chỉnh sửa' : 'Thêm mới';
  const defaultButton = mode === 'edit' ? 'Lưu thay đổi' : 'Xác nhận';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title || defaultTitle}</h2>
          <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Ảnh + upload */}
          {onFileChange && (
            <div className="flex items-start gap-4">
              {imagePreviewUrl && (
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover border rounded-md"
                />
              )}

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onFileChange(file);
                  }}
                  className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />

                {onOpenImagePicker && (
                  <button
                    type="button"
                    onClick={onOpenImagePicker}
                    className="mt-2 text-blue-600 text-sm underline hover:text-blue-800"
                  >
                    Chọn ảnh từ thư viện
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Các field khác */}
          {fields.map(({ key, label, type = 'text', options, readOnly }) => {
            const isPriceField = key === 'price' || key === 'sale_price';
            if (isPriceField) return null;

            return (
              <div key={String(key)}>
                <label className="text-sm font-medium text-gray-900 mb-2 block">{label}</label>
                {type === 'select' && options ? (
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                    value={form[key] as string}
                    onChange={(e) => onChange(key, e.target.value)}
                  >
                    <option value="">Chọn {label.toLowerCase()}</option>
                    {options.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    readOnly={readOnly}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm ${readOnly ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    value={form[key] as string | number}
                    onChange={(e) => onChange(key, e.target.value)}
                  />
                )}
              </div>
            );
          })}

          {/* price + sale_price */}
          {('price' in form && 'sale_price' in form) && (
            <div className="flex gap-4">
              {(['price', 'sale_price'] as (keyof T)[]).map((key) => (
                <div className="flex-1" key={String(key)}>
                  <label className="text-sm font-medium text-gray-900 mb-2 block">
                    {key === 'price' ? 'Price' : 'Sale Price'}
                  </label>
                  <input
                    type="number"
                    value={form[key] as string | number}
                    onChange={(e) => onChange(key, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 text-sm"
            onClick={onSubmit}
          >
            {submitText || defaultButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
