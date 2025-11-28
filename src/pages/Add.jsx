import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Add() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [available, setAvailable] = useState("");

  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();

    // kiểm tra tất cả trường bắt buộc
    if (!name || !price || !image || !destination || !duration || !available) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const newTour = {
      name,
      price: Number(price),
      image,
      destination,
      duration,
      available: Number(available),
    };

    try {
      await fetch("http://localhost:3001/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTour),
      });

      toast.success("Thêm thành công!");
      navigate("/list");
    } catch (error) {
      toast.error("Lỗi kết nối server");
    }
  };

  return (
    <div className="max-w-4xl mx-auto shadow-md bg-white p-6 rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Thêm Tour Mới</h1>

      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
        {/* Tên tour */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Tên tour</label>
          <input
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên tour..."
          />
        </div>

        {/* Giá */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Giá</label>
          <input
            type="number"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Nhập giá..."
          />
        </div>

        {/* Hình ảnh */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Hình ảnh</label>
          <input
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="URL hình ảnh"
          />
        </div>

        {/* Điểm đến */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Điểm đến</label>
          <input
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Nhập điểm đến..."
          />
        </div>

        {/* Thời gian */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Thời gian</label>
          <input
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Nhập thời gian (ví dụ: 3 ngày 2 đêm)"
          />
        </div>

        {/* Số lượng */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Số lượng</label>
          <input
            type="number"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={available}
            onChange={(e) => setAvailable(e.target.value)}
            placeholder="Nhập số lượng khách tối đa"
          />
        </div>

        {/* Button submit, chiếm full width 2 cột */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Thêm mới
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
