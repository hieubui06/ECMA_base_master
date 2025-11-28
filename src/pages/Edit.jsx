import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const API_URL = `http://localhost:3001/tours/${id}`;

  const [form, setForm] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    available: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  // ========= Load dữ liệu tour cần sửa =========
  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setForm(res.data))
      .catch(() => alert("Không tải được dữ liệu tour"))
      .finally(() => setLoading(false));
  }, [id]); // ⬅️ SỬA Ở ĐÂY

  // ========= Cập nhật state khi nhập =========
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ========= Submit cập nhật ==========
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(API_URL, form)
      .then(() => {
        alert("Cập nhật tour thành công!");
        navigate("/list");
      })
      .catch(() => alert("Cập nhật thất bại!"));
  };

  if (loading) return <p className="text-center mt-6">Đang tải dữ liệu...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Cập nhật Tour</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block font-medium">Tên Tour</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Điểm đến</label>
          <input
            type="text"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Thời gian</label>
          <input
            type="text"
            name="duration"
            value={form.duration}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Giá</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Số lượng còn</label>
          <input
            type="number"
            name="available"
            value={form.available}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Ảnh (URL)</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {form.image && (
          <img
            src={form.image}
            alt="preview"
            className="w-48 h-32 object-cover mt-2 rounded"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default Edit;
