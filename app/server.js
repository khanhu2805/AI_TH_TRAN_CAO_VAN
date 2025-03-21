const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');


const app = express();
app.use(cors());
const port = 5000;

let resultFromClient = null;

app.use(bodyParser.json());

// Cấu hình phục vụ file HTML từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

// API nhận kết quả từ Teachable Machine và lưu trữ
app.post('/process-result', (req, res) => {
    const result = req.body.result;
    console.log("Received result from Teachable Machine:", result);

    // Lưu kết quả nhận diện
    resultFromClient = result;

    res.json({ status: "success", result: result });
});

// API để ESP32 lấy thông tin kết quả nhận diện
app.get('/get-result', (req, res) => {
    if (resultFromClient) {
        res.json({ status: "success", result: resultFromClient });
    } else {
        res.json({ status: "error", message: "No result available" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
