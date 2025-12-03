import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function List() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const API_URL = "http://localhost:3001/tours";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setTours(res.data))
      .catch((err) => {
        console.error("Lỗi khi tải dữ liệu:", err);
        setError("Không thể tải danh sách tour");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = () => {
    navigate("/add");
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Bạn có chắc muốn xóa tour này?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setTours(tours.filter((tour) => tour.id !== id));
      alert("Xóa thành công");
    } catch (err) {
      alert("Lỗi xóa tour!");
      console.log(err);
    }
  };

  if (loading) return <p className="mt-6 text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="mt-6 text-center text-red-500">{error}</p>;
  if (!tours.length) return <p className="mt-6 text-center text-gray-500">Chưa có tour nào</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Danh sách Tour</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left">#</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Ảnh</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Tên Tour</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Điểm đến</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Thời gian</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Giá</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Số lượng</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Hành Động</th>
            </tr>
          </thead>

          <tbody>
            {tours.map((tour, index) => (
              <tr key={tour.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                <td className="px-4 py-2 border border-gray-300">
                  <img
                    src={tour.image}
                    alt={tour.name}
                    className="w-24 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border border-gray-300">{tour.name}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.destination}</td>
                <td className="px-4 py-2 border border-gray-300">{tour.duration}</td>
                <td className="px-4 py-2 border border-gray-300 text-red-600" >
                  {tour.price.toLocaleString()} VNĐ
                </td>
                <td className="px-4 py-2 border border-gray-300">{tour.available}</td>
                <td className="px-6 py-3 flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(tour.id)}
                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow transition"
                  >
                    Sửa
                  </button>

                  <button
                    onClick={() => handleDelete(tour.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow transition"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default List;


