// api/auth.js
export const loginUser = async (email, password) => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // tarvitaan cookieille
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error || "Login failed" };
    }

    return data; // { email, id }
  } catch (err) {
    console.error("loginUser error:", err);
    return { error: "Network error" };
  }
};


export async function signUp(username, email, password,) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  return await res.json();
};
