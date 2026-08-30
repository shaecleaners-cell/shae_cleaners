/* =====================================================
   SHAE CLEANERS
   ORDER.JS
===================================================== */


/* =====================================================
   NOMOR WHATSAPP SHAE CLEANERS
   GANTI DENGAN NOMOR WHATSAPP BISNIS ANDA
===================================================== */

const WA_NUMBER = "628XXXXXXXXXX";


/* =====================================================
   DATA HARGA
===================================================== */

const priceList = {

    sofa: {
        name: "Cuci Sofa",

        items: {
            standard1: {
                name: "Sofa Standard 1 Seater",
                price: 60000
            },

            lepasan1: {
                name: "Sofa Lepasan 1 Seater",
                price: 75000
            },

            besar1: {
                name: "Sofa Besar 1 Seater",
                price: 75000
            },

            stoll: {
                name: "Sofa Stoll 1 Seater",
                price: 50000
            },

            lstandard: {
                name: "Sofa L Standard / SET",
                price: 250000
            },

            lbig: {
                name: "Sofa L BIG / SET",
                price: 300000
            },

            u: {
                name: "Sofa U / SET",
                price: 350000
            }
        }
    },


    kasur: {
        name: "Cuci Kasur",

        items: {

            mini: {
                name: "Springbed Mini Single",
                price: 150000
            },

            single: {
                name: "Springbed Single",
                price: 180000
            },

            queen: {
                name: "Springbed Queen",
                price: 270000
            },

            king: {
                name: "Springbed King",
                price: 290000
            },

            superking: {
                name: "Springbed Super King",
                price: 310000
            }

        }
    },


    jokmobil: {
        name: "Jok Mobil",

        items: {

            twoSeat: {
                name: "Jok Mobil Saja 2 Baris",
                price: 250000
            },

            twoInterior: {
                name: "Jok Mobil + Interior 2 Baris",
                price: 400000
            },

            threeSeat: {
                name: "Jok Mobil Saja 3 Baris",
                price: 350000
            }

        }
    },


    karpet: {
        name: "Cuci Karpet",

        items: {

            meter: {
                name: "Karpet / m²",
                price: 13000
            }

        }
    },


    kursi: {
        name: "Cuci Kursi",

        items: {

            makanSmall: {
                name: "Kursi Makan Small",
                price: 30000
            },

            makanStandard: {
                name: "Kursi Makan Standard",
                price: 35000
            },

            kantorSmall: {
                name: "Kursi Kantor Small",
                price: 30000
            },

            kantorBig: {
                name: "Kursi Kantor BIG",
                price: 40000
            }

        }
    },


    ac: {
        name: "Cuci AC",

        items: {

            standard: {
                name: "AC Standard",
                price: 75000
            },

            split: {
                name: "AC Split",
                price: 75000
            }

        }
    },


    gorden: {
        name: "Cuci Gorden",

        items: {

            standard: {
                name: "Gorden Standard / m²",
                price: 15000
            }

        }
    },


    homecleaning: {
        name: "Home Cleaning",

        items: {

            standard: {
                name: "Home Cleaning Standard",
                price: 150000
            }

        }
    }

};


/* =====================================================
   ELEMENT
===================================================== */

const layanan = document.getElementById("layanan");
const jenis = document.getElementById("jenis");

const harga = document.getElementById("harga");
const qtyElement = document.getElementById("qty");
const totalElement = document.getElementById("total");

const summaryLayanan =
    document.getElementById("summaryLayanan");

const summaryJenis =
    document.getElementById("summaryJenis");

const summaryHarga =
    document.getElementById("summaryHarga");

const summaryQty =
    document.getElementById("summaryQty");

const discountRow =
    document.getElementById("discountRow");

const discountText =
    document.getElementById("discountText");

const invoiceElement =
    document.getElementById("invoice");

const btnWA =
    document.getElementById("btnWA");

const minusBtn =
    document.getElementById("minusBtn");

const plusBtn =
    document.getElementById("plusBtn");


let qty = 1;
let selectedPrice = 0;


/* =====================================================
   FORMAT RUPIAH
===================================================== */

function formatRupiah(value) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }
    ).format(value);

}


/* =====================================================
   GENERATE INVOICE
===================================================== */

function generateInvoice() {

    const now = new Date();

    const year =
        now.getFullYear();

    const month =
        String(now.getMonth() + 1)
        .padStart(2, "0");

    const day =
        String(now.getDate())
        .padStart(2, "0");

    const random =
        Math.floor(
            100 + Math.random() * 900
        );

    return `INV-${year}${month}${day}-${random}`;

}

invoiceElement.textContent =
    generateInvoice();


/* =====================================================
   SET MIN DATE
===================================================== */

const tanggal =
    document.getElementById("tanggal");

const today =
    new Date();

const todayString =
    today.toISOString().split("T")[0];

tanggal.min = todayString;


/* =====================================================
   PILIH LAYANAN
===================================================== */

layanan.addEventListener("change", function () {

    const service =
        priceList[this.value];

    jenis.innerHTML = "";

    selectedPrice = 0;
    qty = 1;

    updateQuantity();

    if (!service) {

        jenis.disabled = true;

        jenis.innerHTML = `
            <option value="">
                Pilih layanan terlebih dahulu
            </option>
        `;

        updateSummary();

        return;
    }


    jenis.disabled = false;

    const defaultOption =
        document.createElement("option");

    defaultOption.value = "";

    defaultOption.textContent =
        "Pilih jenis / ukuran";

    jenis.appendChild(defaultOption);


    Object.keys(service.items)
        .forEach(key => {

            const item =
                service.items[key];

            const option =
                document.createElement("option");

            option.value = key;

            option.textContent =
                `${item.name} - ${formatRupiah(item.price)}`;

            jenis.appendChild(option);

        });


    summaryLayanan.textContent =
        service.name;

    summaryJenis.textContent = "-";

    harga.textContent = "Rp0";

    summaryHarga.textContent = "Rp0";

    totalElement.textContent = "Rp0";

    hideDiscount();

});


/* =====================================================
   PILIH JENIS
===================================================== */

jenis.addEventListener("change", function () {

    const service =
        priceList[layanan.value];

    if (!service || !this.value) {

        selectedPrice = 0;

        harga.textContent = "Rp0";

        summaryJenis.textContent = "-";

        updateTotal();

        return;
    }


    const item =
        service.items[this.value];

    selectedPrice =
        item.price;


    harga.textContent =
        formatRupiah(selectedPrice);


    summaryHarga.textContent =
        formatRupiah(selectedPrice);


    summaryJenis.textContent =
        item.name;


    updateTotal();

});


/* =====================================================
   QUANTITY - MINUS
===================================================== */

minusBtn.addEventListener("click", () => {

    if (qty > 1) {

        qty--;

        updateQuantity();

    }

});


/* =====================================================
   QUANTITY - PLUS
===================================================== */

plusBtn.addEventListener("click", () => {

    if (qty < 99) {

        qty++;

        updateQuantity();

    }

});


/* =====================================================
   UPDATE QUANTITY
===================================================== */

function updateQuantity() {

    qtyElement.textContent =
        qty;

    summaryQty.textContent =
        qty;

    updateTotal();

}


/* =====================================================
   PROMO
===================================================== */

function checkPromo() {

    const service =
        layanan.value;

    /*
       Promo hanya untuk:
       Sofa
       Kasur
       Jok Mobil

       Jika jumlah minimal 3,
       1 item dianggap FREE.
    */

    const promoServices = [
        "sofa",
        "kasur",
        "jokmobil"
    ];

    if (
        promoServices.includes(service) &&
        qty >= 3
    ) {

        return true;

    }

    return false;

}


/* =====================================================
   TOTAL
===================================================== */

function updateTotal() {

    if (!selectedPrice) {

        totalElement.textContent =
            "Rp0";

        hideDiscount();

        return;
    }


    let paidQty = qty;


    if (checkPromo()) {

        paidQty =
            qty - 1;

        showDiscount();

    } else {

        hideDiscount();

    }


    const total =
        selectedPrice * paidQty;


    totalElement.textContent =
        formatRupiah(total);

}


/* =====================================================
   SHOW PROMO
===================================================== */

function showDiscount() {

    discountRow.style.display =
        "flex";

    discountText.textContent =
        "1 ITEM FREE";

}


/* =====================================================
   HIDE PROMO
===================================================== */

function hideDiscount() {

    discountRow.style.display =
        "none";

}


/* =====================================================
   VALIDASI
===================================================== */

function validateForm() {

    const nama =
        document.getElementById("nama").value.trim();

    const telepon =
        document.getElementById("telepon").value.trim();

    const alamat =
        document.getElementById("alamat").value.trim();

    const tanggalValue =
        tanggal.value;

    const jam =
        document.getElementById("jam").value;


    if (!nama) {

        alert("Silakan masukkan nama Anda.");

        document.getElementById("nama").focus();

        return false;

    }


    if (!telepon) {

        alert("Silakan masukkan nomor WhatsApp.");

        document.getElementById("telepon").focus();

        return false;

    }


    if (!alamat) {

        alert("Silakan masukkan alamat.");

        document.getElementById("alamat").focus();

        return false;

    }


    if (!layanan.value) {

        alert("Silakan pilih layanan.");

        layanan.focus();

        return false;

    }


    if (!jenis.value) {

        alert("Silakan pilih jenis / ukuran.");

        jenis.focus();

        return false;

    }


    if (!tanggalValue) {

        alert("Silakan pilih tanggal.");

        tanggal.focus();

        return false;

    }


    if (!jam) {

        alert("Silakan pilih jam.");

        document.getElementById("jam").focus();

        return false;

    }


    return true;

}


/* =====================================================
   SIMPAN PESANAN
===================================================== */

function saveOrder() {

    const service =
        priceList[layanan.value];

    const item =
        service.items[jenis.value];


    let paidQty = qty;

    let promo = false;


    if (checkPromo()) {

        paidQty = qty - 1;

        promo = true;

    }


    const total =
        selectedPrice * paidQty;


    const orderData = {

        invoice:
            invoiceElement.textContent,

        nama:
            document.getElementById("nama").value.trim(),

        telepon:
            document.getElementById("telepon").value.trim(),

        alamat:
            document.getElementById("alamat").value.trim(),

        layanan:
            service.name,

        jenis:
            item.name,

        harga:
            selectedPrice,

        qty:
            qty,

        promo:
            promo,

        total:
            total,

        tanggal:
            tanggal.value,

        jam:
            document.getElementById("jam").value,

        catatan:
            document.getElementById("catatan").value.trim(),

        createdAt:
            new Date().toISOString()

    };


    localStorage.setItem(
        "shae_last_order",
        JSON.stringify(orderData)
    );


    return orderData;

}


/* =====================================================
   WHATSAPP
===================================================== */

btnWA.addEventListener("click", function () {

    if (!validateForm()) {
        return;
    }


    if (
        WA_NUMBER === "628XXXXXXXXXX"
    ) {

        alert(
            "Silakan ganti WA_NUMBER di order.js dengan nomor WhatsApp Shae Cleaners."
        );

        return;

    }


    const order =
        saveOrder();


    let message = "";


    message +=
        "🧼 *SHAE CLEANERS*%0A";

    message +=
        "━━━━━━━━━━━━━━━━━━%0A";

    message +=
        "📋 *PEMESANAN BARU*%0A%0A";


    message +=
        "🧾 Invoice: *" +
        order.invoice +
        "*%0A";

    message +=
        "👤 Nama: " +
        order.nama +
        "%0A";

    message +=
        "📱 WhatsApp: " +
        order.telepon +
        "%0A";

    message +=
        "📍 Alamat: " +
        order.alamat +
        "%0A%0A";


    message +=
        "🧹 *DETAIL LAYANAN*%0A";

    message +=
        "Layanan: " +
        order.layanan +
        "%0A";

    message +=
        "Jenis: " +
        order.jenis +
        "%0A";

    message +=
        "Harga: " +
        formatRupiah(order.harga) +
        "%0A";

    message +=
        "Jumlah: " +
        order.qty +
        "%0A";


    if (order.promo) {

        message +=
            "🎁 Promo: *1 ITEM FREE*%0A";

    }


    message +=
        "💰 Total: *" +
        formatRupiah(order.total) +
        "*%0A%0A";


    message +=
        "📅 Tanggal: " +
        order.tanggal +
        "%0A";

    message +=
        "⏰ Jam: " +
        order.jam +
        "%0A";


    if (order.catatan) {

        message +=
            "📝 Catatan: " +
            order.catatan +
            "%0A";

    }


    message +=
        "%0A━━━━━━━━━━━━━━━━━━%0A";

    message +=
        "Mohon konfirmasi jadwal booking saya. Terima kasih 🙏";


    const url =
        `https://wa.me/${WA_NUMBER}?text=${message}`;


    window.open(
        url,
        "_blank"
    );

});


/* =====================================================
   UPDATE SUMMARY AWAL
===================================================== */

function updateSummary() {

    summaryLayanan.textContent =
        "-";

    summaryJenis.textContent =
        "-";

    summaryHarga.textContent =
        "Rp0";

    summaryQty.textContent =
        qty;

    totalElement.textContent =
        "Rp0";

}


updateSummary();


/* =====================================================
   AUTO LOAD DATA TERAKHIR
===================================================== */

const lastOrder =
    localStorage.getItem(
        "shae_last_order"
    );


if (lastOrder) {

    try {

        const data =
            JSON.parse(lastOrder);

        /*
           Hanya isi data pelanggan,
           bukan langsung submit order.
        */

        if (data.nama) {

            document.getElementById("nama").value =
                data.nama;

        }

        if (data.telepon) {

            document.getElementById("telepon").value =
                data.telepon;

        }

        if (data.alamat) {

            document.getElementById("alamat").value =
                data.alamat;

        }

    } catch (error) {

        console.log(
            "Data order sebelumnya tidak dapat dibaca."
        );

    }

}