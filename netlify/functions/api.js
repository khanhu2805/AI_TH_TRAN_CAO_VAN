const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const serverless = require('serverless-http'); // Thêm dòng này

const app = express();
app.use(cors());

let resultFromClient = null;

app.use(bodyParser.json());

// Sử dụng router để quản lý các routes
const router = express.Router();

// API nhận kết quả từ Teachable Machine và lưu trữ
router.post('/process-result', (req, res) => {
    const result = req.body.result;
    console.log("Received result from Teachable Machine:", result);

    // Lưu kết quả nhận diện
    resultFromClient = result;

    res.json({ status: "success", result: result });
});

// API để ESP32 lấy thông tin kết quả nhận diện
router.get('/get-result', (req, res) => {
    if (resultFromClient) {
        res.json({ status: "success", result: resultFromClient });
    } else {
        res.json({ status: "error", message: "No result available" });
    }
});

// Gắn router vào app với một tiền tố, ví dụ /api
// Điều này giúp Netlify dễ dàng điều hướng
app.use('/.netlify/functions/api', router);

// Cấu hình phục vụ file HTML từ thư mục 'public'
// Lưu ý: Việc phục vụ file tĩnh nên để Netlify xử lý thì tốt hơn.
// Bạn có thể bỏ phần này và cấu hình trong netlify.toml
// app.use(express.static(path.join(__dirname, '../../app/public')));


// Xuất ra handler cho Netlify
module.exports.handler = serverless(app);