import React, { useState, type FormEvent } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import InputText from "../components/InputText";
import { BACKEND_API } from "../scripts/api";
import { useNavigate } from "react-router-dom";
import type { FormError } from "../common/interfaces/FormError.interface";
import { FaGoogle, FaTwitter } from "react-icons/fa";

type FormData = { name: string; email: string; password: string };
type AuthError = FormError & { err?: string };

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<AuthError>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    const { name, email, password } = formData;
    if (!email || !password || (!isLogin && !name)) {
      setErrors({ err: "Vui lòng không để trống thông tin" });
      return false;
    }
    if (!validateEmail(email)) {
      setErrors({ err: "Email không đúng định dạng" });
      return false;
    }
    if (password.length < 6) {
      setErrors({ err: "Mật khẩu phải tối thiểu 6 ký tự" });
      return false;
    }
    if (!isLogin && !agree) {
      setErrors({ err: "Bạn cần đồng ý với điều khoản trước khi đăng ký" });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors.err) setErrors({});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const url = `${BACKEND_API}/auth/${isLogin ? "login" : "register"}`;
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Lỗi không xác định");

      if (isLogin) {
        localStorage.setItem("access_token", data.access_token);
        navigate("/home");
      } else {
        alert("Đăng ký thành công. Vui lòng đăng nhập.");
        switchMode();
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setErrors({ err: message });
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin((prev) => !prev);
    setErrors({});
    setFormData({ name: "", email: "", password: "" });
    setShowPassword(false);
    setAgree(false);
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" />

      <div className="w-100 max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-2xl">
        <h2 className="text-2xl font-bold text-white text-center pb-6">
          {isLogin ? "Welcome Back" : "Registration"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <InputText
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              iconLeft={<User className="h-5 w-5" />}
            />
          )}

          <InputText
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            iconLeft={<Mail className="h-5 w-5" />}
          />

          <InputText
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            iconLeft={<Lock className="h-5 w-5" />}
            iconRight={showPassword ? <EyeOff /> : <Eye />}
            showRightToggle
            showValue={showPassword}
            onToggle={() => setShowPassword((prev) => !prev)}
          />

          {!isLogin && (
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="accent-transparent h-4 w-4 border border-white rounded"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-blue-400 underline">
                  Terms & Conditions
                </a>
              </span>
            </div>
          )}

          {errors.err && (
            <p className="text-red-400 text-sm text-center -mt-2">{errors.err}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
              isLoading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {isLoading ? (
              <span>Đang xử lý...</span>
            ) : (
              <>
                <span className="font-semibold">
                  {isLogin ? "Sign In" : "Create Account"}
                </span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-2 text-center text-sm text-white">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={switchMode}
            className="text-blue-400 p-0 bg-transparent hover:underline focus:outline-none"
          >
            {isLogin ? "Sign up" : "Sign in"}
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

export default AuthPage;
