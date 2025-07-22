import { BACKEND_API } from "./api";

export const login = async (email: string, password: string) => {
  const res = await fetch(`${BACKEND_API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Đăng nhập thất bại");
  return data;
};


export const register = async (payload: { name: string; email: string; password: string }) => {
  const res = await fetch(`${BACKEND_API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Đăng ký thất bại");
  return data;
};

