// controller này sẽ làm chức năng upload file
import multer, {diskStorage} from "multer";

// process.cwd() => đường dẫn tuyệt đối tới source BE: D:\Cybersoft\BackEnd - Node38\ExpressJS\Online\Node38_Youtube_BE
const storage = multer({
    storage: diskStorage({
        destination: process.cwd() + "/public/img", // Định nghĩa nơi lưu file
        filename: (req, file, callback) => {
            // param 1: định nghĩa lỗi nếu upload file thất bại
            // param 2: đặt tên file trước khi lưu file xuống BE
            // getTime sẽ chuyển đổi date: yyyy-mm-dd HH:mm:ss -> integer
            callback(null, new Date().getTime() + `_${file.originalname}`)
        }
    })
}); 

export default storage;