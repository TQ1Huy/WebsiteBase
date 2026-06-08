// import mongoose from "mongoose";

// export async function connectDB() {
//   try {
//     console.log("ENV:", process.env.MONGO_URL);

//     await mongoose.connect(process.env.MONGO_URL!);

//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.log("Error connecting to MongoDB:", error);
//   }
// }
import mongoose from "mongoose";

export async function connectDB() {
  try {
    // 1. SỬA LỖI 2: Kiểm tra nếu đã kết nối rồi thì dùng lại, không kết nối thêm
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB đã kết nối sẵn trước đó.");
      return;
    }

    // Lấy chuỗi kết nối từ biến môi trường (SỬA LỖI 1: Đổi thành MONGO_URI cho khớp Vercel)
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      console.log("LỖI: Biến môi trường MONGO_URI chưa được định nghĩa!");
      return;
    }

    console.log("Đang tiến hành kết nối tới MongoDB...");
    
    // 2. Tiến hành kết nối
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB Connected Successfully 🎉");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
}