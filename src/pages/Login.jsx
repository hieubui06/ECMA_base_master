import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async event => {
        event.preventDefault();

        try {
            const { data } = await axios.post("http://localhost:3001/login", {
                email,
                password,
            })
            toast.success("Đăng nhập thành công!");
            localStorage.setItem("token", data.accessToken);
            navigate("/list");
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Đăng nhập mới</h1>

            <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email" className="block font-medium mb-1">
                        Email
                    </label>
                    <input
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        type="email"
                        id="email"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block font-medium mb-1">
                        Password
                    </label>
                    <input
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        type="password"
                        id="password"
                        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default LoginPage;
