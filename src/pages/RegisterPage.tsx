// src/pages/RegisterPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { FaGoogle, FaTwitter } from "react-icons/fa";
import InputText from "../components/InputText";
import { register } from "../scripts/authApi";
import type { FormError } from "../interfaces/FormError.interface";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<FormError>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const { name, email, password } = formData;
    if (!name || !email || !password) return setErrors({ err: "Vui lòng nhập đầy đủ thông tin" }), false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setErrors({ err: "Email không đúng định dạng" }), false;
    if (password.length < 6) return setErrors({ err: "Mật khẩu tối thiểu 6 ký tự" }), false;
    if (!agree) return setErrors({ err: "Bạn phải đồng ý với điều khoản" }), false;
    setErrors({});
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await register(formData);
      alert("Đăng ký thành công. Vui lòng đăng nhập.");
      navigate("/login");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrors({ err: msg });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" />
      <div className="w-100 max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-2xl">
        <h2 className="text-2xl font-bold text-white text-center pb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputText
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            iconLeft={<User className="h-5 w-5" />}
          />
          <InputText
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            iconLeft={<Mail className="h-5 w-5" />}
          />
          <InputText
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            iconLeft={<Lock className="h-5 w-5" />}
            iconRight={showPassword ? <EyeOff /> : <Eye />}
            showRightToggle
            showValue={showPassword}
            onToggle={() => setShowPassword((prev) => !prev)}
          />
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="accent-transparent h-4 w-4 border border-white rounded"
            />
            <span>
              I agree to the <a href="#" className="text-blue-400 underline">Terms & Conditions</a>
            </span>
          </div>
          {errors.err && <p className="text-red-400 text-sm text-center -mt-2">{errors.err}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
              isLoading ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {isLoading ? <span>Đang xử lý...</span> : (<><span className="font-semibold">Create Account</span><ArrowRight className="h-4 w-4" /></>)}
          </button>
        </form>
        <div className="mt-2 text-center text-sm text-white">
          Already have an account?
          <button onClick={() => navigate("/login")} className="text-blue-400 p-1 bg-transparent hover:border-none hover:underline focus:outline-none">
            Sign in
          </button>
        </div>
        <div className="relative my-6">
          <hr className="border-gray-600" />
          <span className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 text-sm text-gray-400">
            Or continue with
          </span>
        </div>
        <div className="flex justify-center gap-4">
          <button className="w-1/2 border bg-transparent border-gray-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-white/10">
            <FaGoogle /> Google
          </button>
          <button className="w-1/2 border bg-transparent border-gray-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-white/10">
            <FaTwitter /> Twitter
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;