// src/pages/LoginPage.tsx
import { useLoginFormStore } from "../store/Auth/loginFormStore";
import { useLoginHandlers } from "../hooks/useLoginHandlers";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import InputText from "../components/InputText";

const LoginPage = () => {
  const {
    email,
    password,
    showPassword,
    isLoading,
    errors,
    setEmail,
    setPassword,
    setShowPassword,
  } = useLoginFormStore();

  const { handleSubmit } = useLoginHandlers();

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" />
      <div className="w-100 max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-5 shadow-2xl">
        <h2 className="text-2xl font-bold text-white text-center pb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputText
            name="email"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            iconLeft={<Mail className="h-5 w-5" />}
          />
          <InputText
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            iconLeft={<Lock className="h-5 w-5" />}
            iconRight={showPassword ? <EyeOff /> : <Eye />}
            showRightToggle
            showValue={showPassword}
            onToggle={() => setShowPassword(!showPassword)}
          />
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
                <span className="font-semibold">Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
