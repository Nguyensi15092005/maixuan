module.exports = (query) => {
    const keywordRaw = query.keyword || "";
    const keyword = keywordRaw.toString().trim();

    const result = {};

    // Nếu keyword là số từ 1 đến 12 → tìm theo tháng (createdAt là Date)
    const month = parseInt(keyword, 10);
    if (!isNaN(month) && month >= 1 && month <= 12) {
        const year = new Date().getFullYear(); // bạn có thể dùng query.year nếu muốn
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 1);

        result.createdAt = { $gte: start, $lt: end };
    }

    // Nếu keyword là chuỗi chữ → tìm theo tên, phone...
    else if (keyword) {
        result.name = { $regex: keyword, $options: "i" }; // ví dụ tìm theo tên
        // result.phone = { $regex: keyword, $options: "i" }; // nếu muốn thêm tìm theo số
    }

    return result;
}

