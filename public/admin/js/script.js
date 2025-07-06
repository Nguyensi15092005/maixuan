const menuClick = document.querySelector(".right .icon-menu");
if (menuClick) {
  const menuSilbar = document.querySelector(".right .menu-silbar");
  menuClick.addEventListener("click", () => {
    menuSilbar.classList.toggle("active");
  })
}

// Page pagination
const buttonPagination = document.querySelectorAll("[button-page]")
if (buttonPagination) {
  let url = new URL(window.location.href);
  buttonPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-page");
      if (page > 0) {
        url.searchParams.set("page", page)
        window.location.href = url.href
      }
    })
  })
}
// end Page pagination

// Show-alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("date-time"));
  const close = showAlert.querySelector("[close-alert]")

  setTimeout(() => {
    showAlert.classList.add("alert-hidden")
  }, time);

  close.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden")
  })
}
// end Show-alert


// delete Item
const buttonDel = document.querySelectorAll("[button-delete]");
if (buttonDel.length > 0) {
  const formButtonDelete = document.querySelector("#form-delete-item");
  const patch = formButtonDelete.getAttribute("data-path");
  buttonDel.forEach(button => {
    button.addEventListener("click", () => {
      const isComfirm = confirm("Bạn có chắt muốn xóa hay không?");
      if (isComfirm) {
        const id = button.getAttribute("data-id");
        const action = `${patch}/${id}?_method=DELETE`;

        formButtonDelete.action = action;
        formButtonDelete.submit();
      }

    })
  })
}
// end delete Item


// checkAll
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckboxAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsID = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckboxAll.addEventListener("click", () => {
    if (inputCheckboxAll.checked) {
      inputsID.forEach(input => {
        input.checked = true;
      })
    }
    else {
      inputsID.forEach(input => {
        input.checked = false;
      })
    }
  });
  inputsID.forEach(input => {
    input.addEventListener("click", () => {
      const countCheck = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
      if (countCheck == inputsID.length) {
        inputCheckboxAll.checked = true;
      }
      else {
        inputCheckboxAll.checked = false;
      }
    })
  })


}
// end checkAll

// form change Multi
const formchangeMulti = document.querySelector("[form-change-multi]");
if (formchangeMulti) {

  formchangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxMuli = document.querySelector("[checkbox-multi]");
    const inputChecked = checkboxMuli.querySelectorAll("input[name='id']:checked");
    if (inputChecked.length == 0) {
      alert("vui lòng chon 1 mặt hàng!");
      return;
    }

    const tyChange = e.target.type.value;

    if (tyChange == "delete-all") {
      const isComfirm = confirm("Bạn có chắt muốn xóa các mặt hàng này không?");
      if (!isComfirm) {
        return;
      }
    }


    if (inputChecked.length > 0) {
      let ids = [];

      const inputIds = document.querySelector("input[name='ids']")

      inputChecked.forEach(input => {
        const id = input.value;
        console.log(id)

        if (tyChange == "change-position") {
          const position = input.closest("tr").querySelector("input[name='position']").value;

          ids.push(`${id}-${position}`)

        }
        else {
          ids.push(id);
        }

      })

      inputIds.value = ids.join(", ");

      formchangeMulti.submit();

    }
    else {
      alert("vui lòng chon 1 mặt hàng!");
    }
  })

}
// end form change Multi


// now time
const now = new Date();
const time = now.toLocaleString();
const headerThanhtoan = document.querySelector(".header-thanhtoan");
if (headerThanhtoan) {
  const span = document.createElement("span");
  span.textContent = time;
  headerThanhtoan.appendChild(span);
}

const date = now.toLocaleDateString("vi-VN");
const timeBC = document.querySelector(".time-baocao");
if (timeBC) {
  timeBC.textContent = `Ngày bán: ${date}`
}
// end now time


// Search Suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const boxSuggest = boxSearch.querySelector(".inner-suggest");

  input.addEventListener("keyup", () => {
    const keyword = input.value;
    if (keyword == "") {
      boxSuggest.classList.remove("show");
    }

    const link = `/admin/searchhh?keyword=${keyword}`;

    fetch(link)
      .then(res => res.json())
      .then(data => {
        if (data.code == 200) {
          const hanghoa = data.hanghoa;
          if (hanghoa.length > 0) {
            boxSuggest.classList.add("show");
            const htmls = hanghoa.map((item) => {
              return `
                <div class="item-suggest" onclick="handleclick('${item.title}', ${item.capitalPrice}, '${item.id}')">
                  <span>${item.title}</span>
                  <span>${item.capitalPrice}</span>
                  <span>Tồn: ${item.inventory}</span>
                </div>
                `
            })

            const boxList = boxSuggest.querySelector(".inner-list");
            boxList.innerHTML = htmls.join("");
          }
          else {
            boxSuggest.classList.remove("show");
          }

        }
      });
  })

}




// Search Suggest


let danhSachHangHoa = [];

const handleclick = (title, price, id) => {
  // Kiểm tra trùng
  if (danhSachHangHoa.some(item => item.id_hh === id)) {
    alert("Sản phẩm đã được thêm.");
    return;
  }

  const bodyListHH = document.querySelector(".body-list-hh");
  if (bodyListHH) {
    const index = danhSachHangHoa.length;

    // Thêm vào mảng tạm
    danhSachHangHoa.push({
      id_hh: id,
      ten_hh: title,
      soluong: 1,
      dongia: price
    });

    const div = document.createElement("div");
    div.classList.add("row", "item-list");

    div.innerHTML = `
      <div class="left-item col-5">
        <span class="btn-remove" style="cursor:pointer;"><i class="fa-solid fa-trash-can"></i></span>
        <span>${title}</span>
      </div>
      <div class="right-item col-5">
        <input 
          type="number"
          min="1"
          class="input-quantity"
          value="1"
        >
        <span class="unit-price">${price.toLocaleString('vi-VN')}</span>
        <span class="total-price">${price.toLocaleString('vi-VN')}</span>
      </div>
    `;

    const input = div.querySelector(".input-quantity");
    const total = div.querySelector(".total-price");

    input.addEventListener("input", () => {
      const quantity = parseInt(input.value) || 1;
      total.textContent = (quantity * price).toLocaleString('vi-VN');
      danhSachHangHoa[index].soluong = quantity;
      capNhatInputHidden();
      tinhTongTien();
    });

    const btnRemove = div.querySelector(".btn-remove");
    btnRemove.addEventListener("click", () => {
      danhSachHangHoa[index] = null;
      div.remove();
      capNhatInputHidden();
      tinhTongTien();
      capNhatSoLuongHang();
    });

    bodyListHH.appendChild(div);
    capNhatInputHidden();
    tinhTongTien();
    capNhatSoLuongHang();
  }
};

const capNhatInputHidden = () => {
  const dsInput = document.getElementById("ds_hanghoa");
  const filtered = danhSachHangHoa.filter(item => item !== null);
  dsInput.value = JSON.stringify(filtered);
};

const tinhTongTien = () => {
  let tong = 0;
  danhSachHangHoa.forEach(item => {
    if (item) tong += item.soluong * item.dongia;
  });

  document.querySelectorAll(".tong-tien").forEach(input => {
    input.value = tong.toLocaleString("vi-VN");
  });
};

const capNhatSoLuongHang = () => {
  const count = danhSachHangHoa.filter(item => item !== null).length;
  const soLuongSpan = document.querySelector(".so-luong");
  if (soLuongSpan) {
    soLuongSpan.textContent = count;
  }
};

// End box search


// thanh toan search

const TTsearch = document.querySelector(".thanh-toan-search");
if (TTsearch) {
  const input = TTsearch.querySelector("input[name='key']");
  const boxSuggest = TTsearch.querySelector(".innet-ss");
  input.addEventListener("keyup", () => {
    const showKH = document.querySelector(".show-kh");
    if (showKH) {
      showKH.style.display = "block";
    }
    const key = input.value;
    if (key == "") {
      boxSuggest.classList.remove("show");
    }

    const link = `/admin/searchkh?key=${key}`;

    fetch(link)
      .then(res => res.json())
      .then(data => {
        if (data.code == 200) {
          const khachhang = data.khachhang;
          console.log(khachhang)
          if (khachhang.length > 0) {
            boxSuggest.classList.add("show-kh");
            const htmls = khachhang.map((item) => {
              return `
                <div class="item-ss" onclick="handleclickKH('${item.id}','${item.name}', ${item.inDebt})">
                  <span>${item.name}</span>
                  <span>${item.phone}</span>
                </div>
                `
            })

            const boxList = boxSuggest.querySelector(".inner-list-ss");
            boxList.innerHTML = htmls.join("");
          }
          else {
            boxSuggest.classList.remove("show-kh");
          }

        }
      });
  })

}

const handleclickKH = (id, name, inDebt) => {
  const showKH = document.querySelector(".show-kh");
  showKH.style.display = "none";
  const idKH = document.querySelector("input[name='id_kh'");
  idKH.value = id;
  const no = document.querySelector(".no");
  no.textContent = `Nợ: ${inDebt.toLocaleString("vi-VN")}`
  const input = document.querySelector("input[name='key']");
  input.value = name;
  console.log(no)
}


// End thanh toan search



// print
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-thanhtoan');
  

  form.addEventListener('submit', async function (e) {
    const inputThanhtoan = document.querySelector("input[name='id_kh']");
    if(inputThanhtoan.value != ""){ 
    e.preventDefault(); // Chặn submit form

    const raw = document.getElementById('ds_hanghoa').value;
    const ds_hanghoa = raw ? JSON.parse(raw) : [];

    const total = ds_hanghoa.reduce((sum, item) => {
      const price = parseInt((item.dongia + "").replace(/\./g, ""));
      const qty = parseInt(item.soluong);
      return sum + price * qty;
    }, 0);

    const data = {
      date: new Date().toLocaleString('vi-VN'),
      staff: "Mai Xuân",
      customer: document.querySelector("input[name='key']").value || "Khách lẻ",
      address: "--",
      items: ds_hanghoa.map(item => ({
        name: item.ten_hh,
        price: item.dongia,
        quantity: item.soluong,
        total: item.dongia * item.soluong
      })),
      total: total,
      oldDebt: 0,
      grandTotal: total,
    };

    const invoiceHTML = `
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Hóa đơn bán hàng</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 14px;
              width: 80mm;
              margin: 0 auto;
              padding: 10px;
            }
            .center { text-align: center; }
            .bold { font-weight: bold; }
            table { width: 100%; border-collapse: collapse; }
            td { padding: 2px 0; }
            .total { font-weight: bold; }
            hr { border: none; border-top: 1px dashed #000; margin: 8px 0; }
            img.qr { margin-top: 10px; width: 120px; }

            @media print {
              @page {
                size: 80mm auto;
                margin: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="center bold">CỬA HÀNG MAI XUÂN</div>
          <div class="center">HÓA ĐƠN BÁN HÀNG</div>
          <div>Ngày: ${data.date}</div>
          <div>NV giao hàng: ${data.staff}</div>
          <div>Khách hàng: ${data.customer}</div>
          <div>SĐT: --</div>
          <div>Địa chỉ: ${data.address}</div>

          <hr>

          <table>
            ${data.items.map(item => `
              <tr><td colspan="3"><b>${item.name}</b></td></tr>
              <tr>
                <td>${item.price.toLocaleString('vi-VN')}đ</td>
                <td>x${item.quantity}</td>
                <td style="text-align:right">${item.total.toLocaleString('vi-VN')}đ</td>
              </tr>
            `).join('')}
          </table>

          <hr>

          <table>
            <tr>
              <td><b>Tổng tiền hàng:</b></td>
              <td style="text-align:right">${data.total.toLocaleString('vi-VN')}đ</td>
            </tr>
            <tr>
              <td class="bold">Tổng thu:</td>
              <td class="bold" style="text-align:right">${data.grandTotal.toLocaleString('vi-VN')}đ</td>
            </tr>
          </table>

          <hr>

          <div class="center">
            <img class="qr" src="/admin/img/QR.png" />
          </div>

          <div class="center">Cảm ơn và hẹn gặp lại!</div>

          <script>
            window.onload = function () {
              window.print();
              window.onafterprint = function () {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `;

    // Mở popup và in
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();

    // Gửi lại form sau khi in
    setTimeout(() => {
      form.submit();
    }, 1000);
    }else{
  alert("Vui lòng chọn khách hàng");
  }
  });
});






// document.addEventListener('DOMContentLoaded', function () {
//   const form = document.getElementById('form-thanhtoan');

//   form.addEventListener('submit', async function (e) {
//     e.preventDefault(); //  Chặn submit ban đầu

//     const formData = new FormData(form);
//     const raw = document.getElementById('ds_hanghoa').value;
//     const ds_hanghoa = raw ? JSON.parse(raw) : [];

//     const total = parseInt(formData.get('tongtienhang')) || 0;

//     //  Hàm chuyển số thành chữ (tiếng Việt đơn giản)
//     function toWordsVietnamese(number) {
//       const n2w = window.n2vi || function (n) { return n + " đồng"; };
//       return n2w(number);
//     }
//     console.log(ds_hanghoa)

//     const data = {
//       date: new Date().toLocaleString('vi-VN'),
//       staff: "Mai Xuân",
//       customer: document.querySelector("input[name='key']").value || "Khách lẻ",
//       address: "--",
//       items: ds_hanghoa.map(item => ({
//         name: item.ten_hh,
//         price: item.dongia,
//         quantity: item.soluong,
//         total: item.dongia * item.soluong
//       })),
//       total: total,
//       oldDebt: 0,
//       grandTotal: total,
//       totalInWords: toWordsVietnamese(total),
//       qrData: `https://img.vietqr.io/image/MB-879888999.png?amount=${total}&accountName=MAI%20XUAN`
//     };
    

//     try {
//       console.log(data)
//       const response = await fetch('/api/print', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data)
//       });

//       const result = await response.json();

//       if (result.success) {
//         form.submit(); // ✅ Gửi form sau khi in thành công
//       } else {
//         alert('Không in được hóa đơn: ' + result.message);
//       }
//     } catch (err) {
//       alert('Lỗi khi gửi yêu cầu in hóa đơn');
//       console.error(err);
//     }
//   });
// });
// end print




