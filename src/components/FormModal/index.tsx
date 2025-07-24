interface FormModalProps<T extends Record<string, unknown>> {
  form: T;
  fields: {
    key: keyof T;
    label: string;
    type?: 'text' | 'number' | 'password' | 'select';
    options?: { value: string; label: string }[];
    readOnly?: boolean; // ✅ thêm hỗ trợ readOnly cho từng field
  }[];
  onChange: (field: keyof T, value: string) => void;
  onSubmit: () => void;
  onClose?: () => void;
  mode?: 'add' | 'edit';
  title?: string;
  submitText?: string;
}

const FormModal = <T extends Record<string, unknown>>({
  form,
  fields,
  onChange,
  onSubmit,
  onClose,
  mode = 'add',
  title,
  submitText,
}: FormModalProps<T>) => {
  const defaultTitle = mode === 'edit' ? 'Chỉnh sửa' : 'Thêm mới';
  const defaultButton = mode === 'edit' ? 'Lưu thay đổi' : 'Xác nhận';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title || defaultTitle}</h2>
          <button className="text-gray-400 hover:text-gray-600" onClick={onClose}>×</button>
        </div>

        <div className="p-6 space-y-4">
          {fields.map(({ key, label, type = 'text', options, readOnly }) => (
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
          ))}
        </div>

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
