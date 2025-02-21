import { useState } from "react";

const Login = ({ setUser }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(""); // ✅ New state for success message

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
    
        console.log("Sending login data:", formData);
    
        try {
            const response = await fetch("http://localhost:8000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
            console.log("Response received:", data); // ✅ Debugging: Check what we receive
    
            if (response.ok) {
                setUser(data.user);
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Store user details
                setSuccess("✅ Login successful! Redirecting...");
                setTimeout(() => {
                    window.location.href = "/";
                }, 2000);
            }
             else {
                setError(data.message || "Login failed.");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Server error. Try again later.");
        }
    };
    

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>} {/* ✅ Display success message */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded"
                    required
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded"
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
            </form>
        </div>
    );
};

export default Login;
