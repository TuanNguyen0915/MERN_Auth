const BASE_URL = `${import.meta.env.VITE_SERVER_URL}/auth`;

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

const logIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const json = await res.json();
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

export { signUp, logIn };
