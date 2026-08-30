/* =====================================================
   SHAE CLEANERS
   INVOICE.JS
===================================================== */


/* =====================================================
   WHATSAPP
===================================================== */

const WA_NUMBER = "628XXXXXXXXXX";


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
    ).format(Number(value) || 0);

}


/* =====================================================
   AMBIL DATA ORDER
===================================================== */

const savedOrder =
    localStorage.getItem("shae_last_order");


let order = null;


if (savedOrder) {

    try {

        order = JSON.parse(savedOrder);

    } catch (error) {

        console.error(
            "Data invoice tidak dapat dibaca.",
            error
        );

    }

}


/* =====================================================
   JIKA TIDAK ADA DATA
===================================================== */

if (!order) {

    alert(
        "Belum ada pesanan yang tersedia."
    );

    window.location.href =
        "order.html";

}


/* =====================================================
   ELEMENT
===================================================== */

const invoiceNumber =
    document.getElementById("invoiceNumber");

const customerName =
    document.getElementById("customerName");

const customerPhone =
    document.getElementById("customerPhone");

const customerAddress =
    document.getElementById("customerAddress");

const serviceName =
    document.getElementById("serviceName");

const serviceType =
    document.getElementById("serviceType");

const unitPrice =
    document.getElementById("unitPrice");

const detailPrice =
    document.getElementById("detailPrice");

const detailQty =
    document.getElementById("detailQty");

const grandTotal =
    document.getElementById("grandTotal");

const scheduleDate =
    document.getElementById("scheduleDate");

const scheduleTime =
    document.getElementById("scheduleTime");

const promoDetail =
    document.getElementById("promoDetail");

const noteBox =
    document.getElementById("noteBox");

const customerNote =
    document.getElementById("customerNote");


/* =====================================================
   TAMPILKAN DATA
===================================================== */

if (order) {

    invoiceNumber.textContent =
        order.invoice || "-";


    customerName.textContent =
        order.nama || "-";


    customerPhone.textContent =
        order.telepon || "-";


    customerAddress.textContent =
        order.alamat || "-";


    serviceName.textContent =
        order.layanan || "-";


    serviceType.textContent =
        order.jenis || "-";


    unitPrice.textContent =
        formatRupiah(order.harga);


    detailPrice.textContent =
        formatRupiah(order.harga);


    detailQty.textContent =
        order.qty || 1;


    grandTotal.textContent =
        formatRupiah(order.total);


    scheduleDate.textContent =
        formatDate(order.tanggal);


    scheduleTime.textContent =
        order.jam || "-";


    /* PROMO */

    if (order.promo) {

        promoDetail.style.display =
            "flex";

    }


    /* CATATAN */

    if (order.catatan) {

        noteBox.style.display =
            "flex";

        customerNote.textContent =
            order.catatan;

    }

}


/* =====================================================
   FORMAT TANGGAL
===================================================== */

function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }

    const date =
        new Date(dateString + "T00:00:00");

    if (isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleDateString(
        "id-ID",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );

}


/* =====================================================
   CETAK INVOICE
===================================================== */

function printInvoice() {

    window.print();

}


/* =====================================================
   WHATSAPP
===================================================== */

function sendWhatsApp() {

    if (!order) {
        return;
    }


    if (
        WA_NUMBER === "628XXXXXXXXXX"
    ) {

        alert(
            "Silakan ganti WA_NUMBER di invoice.js dengan nomor WhatsApp Shae Cleaners."
        );

        return;

    }


    let message = "";


    message +=
        "🧼 *SHAE CLEANERS*%0A";

    message +=
        "━━━━━━━━━━━━━━━━━━%0A";

    message +=
        "🧾 *INVOICE PEMESANAN*%0A%0A";


    message +=
        "Invoice: *" +
        order.invoice +
        "*%0A";

    message +=
        "Nama: " +
        order.nama +
        "%0A";

    message +=
        "WhatsApp: " +
        order.telepon +
        "%0A";

    message +=
        "Alamat: " +
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
        formatDate(order.tanggal) +
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
        "Mohon konfirmasi pesanan saya. Terima kasih 🙏";


    const whatsappURL =
        `https://wa.me/${WA_NUMBER}?text=${message}`;


    window.open(
        whatsappURL,
        "_blank"
    );

}


/* =====================================================
   PESANAN BARU
===================================================== */

function newOrder() {

    window.location.href =
        "order.html";

}


/* =====================================================
   SIMPAN RIWAYAT INVOICE
===================================================== */

function saveInvoiceHistory() {

    if (!order) {
        return;
    }


    let history = [];


    try {

        history =
            JSON.parse(
                localStorage.getItem(
                    "shae_order_history"
                )
            ) || [];

    } catch (error) {

        history = [];

    }


    /*
       Hindari invoice yang sama
    */

    const exists =
        history.some(
            item =>
                item.invoice === order.invoice
        );


    if (!exists) {

        history.unshift(order);

        /*
           Maksimal 50 pesanan
        */

        history =
            history.slice(0, 50);


        localStorage.setItem(
            "shae_order_history",
            JSON.stringify(history)
        );

    }

}


/* =====================================================
   JALANKAN
===================================================== */

saveInvoiceHistory();


console.log(
    "Invoice Shae Cleaners aktif:",
    order
);