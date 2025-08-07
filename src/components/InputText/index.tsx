import React from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputTextProps {
  iconLeft?: React.ReactNode;
  placeholder?: string;
  iconRight?: React.ReactNode;
  showRightToggle?: boolean;
  showValue?: boolean;
  onToggle?: () => void;
  type?: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText = ({
  iconLeft,
  placeholder,
  iconRight,
  showRightToggle = false,
  showValue = false,
  onToggle,
  type = "text",
  value,
  name,
  onChange,
}: InputTextProps) => {
  return (
    <div className="relative w-full">
      {iconLeft && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
          {iconLeft}
        </div>
      )}
      <input
        type={showRightToggle ? (showValue ? "text" : "password") : type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        placeholder={placeholder}
        className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
      />
      {iconRight && showRightToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 p-0 top-1/2 transform bg-transparent -translate-y-1/2 text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-0 border-none"
        >
          {showValue ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      )}

      {iconRight && !showRightToggle && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
          {iconRight}
        </div>
      )}
    </div>
  );
};

export default InputText;
