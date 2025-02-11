import axios from "axios";
import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const res = await axios.post("http://localhost:3001/api/auth/sign-up", {
        name,
        email,
        password,
      });

      console.log("Success:", res.data);
      setMessage("User registered successfully! ✅");
    } catch (error) {
      console.log("Axios Error:", error);

      if (error.response.status === 409) {
        setMessage("Email already in use! ❌");
      } else {
        setMessage(error.response.data.message || "Signup failed!");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form className="flex flex-col" onSubmit={handleSignUp}>
        <label>Name</label>
        <input
          className="w-[300px] rounded-md px-2 py-1 border border-gray-300 outline-gray-600/80"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          className="w-[300px] rounded-md px-2 py-1 border border-gray-300 outline-gray-600/80"
          placeholder="johndoe@gmail.com"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          className="w-[300px] rounded-md px-2 py-1 border border-gray-300 outline-gray-600/80"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-md"
        >
          Submit
        </button>
      </form>

      {message && <p className="mt-2 text-red-600">{message}</p>}
    </div>
  );
}

export default App;
