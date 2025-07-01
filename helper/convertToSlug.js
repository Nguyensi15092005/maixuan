const unidecode = require("unidecode");
// ccài thư viện unidecode
module.exports.convertToSlug = (text)=>{
    const unidecodeText = unidecode(text);
    // Khoang trắng thay thế thành dấu - (s là khoảng trắng nó sẽ + đến trc để xem có bao nhiêu khoảng trắng sau đó nó chỉ thay thế 1 dấu -)
    const slug = unidecodeText.replace(/\s+/g, "-");
    return slug;
}