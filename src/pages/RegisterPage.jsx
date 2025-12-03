import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3001/register", {
                email,
                password
            });

            alert("Đăng ký thành công!");
            navigate("/login");
        } catch (err) {
            alert("Lỗi đăng ký!");
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center from-blue-100 to-blue-300">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
                    Đăng ký
                </h1>

                <form onSubmit={handleRegister} className="space-y-5">

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            placeholder="Nhập email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium text-gray-700">
                            Mật khẩu
                        </label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                            type="password"
                            placeholder="Nhập mật khẩu..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg w-full text-lg shadow-lg">
                        Đăng ký
                    </button>
                </form>
            </div>
        </div>
    );

}

export default RegisterPage;
