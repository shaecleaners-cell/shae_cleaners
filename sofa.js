/* ==========================================
   SHAE CLEANERS
   SOFA SERVICE
   COCOK DENGAN ORDER.JS
   TANPA FIREBASE
========================================== */


/* ================= DATA SOFA ================= */

const sofaData = [

  {
    id: "sofa-standard",
    layanan: "Cuci Sofa",
    item: "Sofa Standard 1 Seater",
    harga: 60000,
    total: 60000,
    qty: 1,
    icon: "fa-couch"
  },

  {
    id: "sofa-lepasan",
    layanan: "Cuci Sofa",
    item: "Sofa Lepasan 1 Seater",
    harga: 75000,
    total: 75000,
    qty: 1,
    icon: "fa-couch"
  },

  {
    id: "sofa-besar",
    layanan: "Cuci Sofa",
    item: "Sofa Besar 1 Seater",
    harga: 75000,
    total: 75000,
    qty: 1,
    icon: "fa-couch"
  },

  {
    id: "sofa-stool",
    layanan: "Cuci Sofa",
    item: "Sofa Stool",
    harga: 50000,
    total: 50000,
    qty: 1,
    icon: "fa-chair"
  },

  {
    id: "sofa-l-standard",
    layanan: "Cuci Sofa",
    item: "Sofa L Standard",
    harga: 250000,
    total: 250000,
    qty: 1,
    icon: "fa-couch"
  },

  {
    id: "sofa-l-big",
    layanan: "Cuci Sofa",
    item: "Sofa L BIG",
    harga: 300000,
    total: 300000,
    qty: 1,
    icon: "fa-couch"
  },

  {
    id: "sofa-u",
    layanan: "Cuci Sofa",
    item: "Sofa U",
    harga: 350000,
    total: 350000,
    qty: 1,
    icon: "fa-couch"
  }

];


/* ================= STATE ================= */

let selectedSofa = null;


/* ================= RUPIAH ================= */

function formatRupiah(value) {

  return "Rp" +
    Number(value || 0)
      .toLocaleString("id-ID");

}


/* ================= LOAD ================= */

function loadSofa() {

  const list =
    document.getElementById(
      "sofaList"
    );

  if (!list) return;


  list.innerHTML = "";


  sofaData.forEach(
    sofa => {

      const card =
        document.createElement("button");


      card.type =
        "button";


      card.className =
        "sofa-card";


      card.dataset.id =
        sofa.id;


      card.innerHTML = `

        <div class="sofa-card-icon">

          <i class="fa-solid ${sofa.icon}"></i>

        </div>


        <div class="sofa-card-content">

          <strong>
            ${sofa.item}
          </strong>

          <span>
            ${getDescription(sofa)}
          </span>

          <b>
            ${formatRupiah(sofa.harga)}
          </b>

        </div>


        <div class="sofa-card-arrow">

          <i class="fa-solid fa-chevron-right"></i>

        </div>

      `;


      card.addEventListener(
        "click",
        () => {

          selectSofa(sofa);

        }
      );


      list.appendChild(card);

    }
  );

}


/* ================= DESCRIPTION ================= */

function getDescription(sofa) {

  if (
    sofa.id === "sofa-standard"
  ) {

    return "Harga per 1 seat";

  }


  if (
    sofa.id === "sofa-lepasan"
  ) {

    return "Cover sofa dapat dilepas";

  }


  if (
    sofa.id === "sofa-besar"
  ) {

    return "Untuk sofa ukuran besar";

  }


  if (
    sofa.id === "sofa-stool"
  ) {

    return "Harga per 1 seat";

  }


  if (
    sofa.id === "sofa-l-standard"
  ) {

    return "Harga per SET";

  }


  if (
    sofa.id === "sofa-l-big"
  ) {

    return "Harga per SET ukuran besar";

  }


  if (
    sofa.id === "sofa-u"
  ) {

    return "Harga per SET";

  }


  return "Cleaning sofa profesional";

}


/* ================= SELECT ================= */

function selectSofa(sofa) {

  selectedSofa =
    sofa;


  /*
    Hilangkan selected
    dari kartu lain
  */

  document
    .querySelectorAll(".sofa-card")
    .forEach(card => {

      card.classList.remove(
        "selected"
      );

    });


  /*
    Tandai kartu yang dipilih
  */

  const card =
    document.querySelector(
      `[data-id="${sofa.id}"]`
    );


  if (card) {

    card.classList.add(
      "selected"
    );

  }


  /*
    Update bottom bar
  */

  const selectedName =
    document.getElementById(
      "selectedName"
    );


  const selectedPrice =
    document.getElementById(
      "selectedPrice"
    );


  const orderButton =
    document.getElementById(
      "orderButton"
    );


  if (selectedName) {

    selectedName.textContent =
      sofa.item;

  }


  if (selectedPrice) {

    selectedPrice.textContent =
      formatRupiah(
        sofa.harga
      );

  }


  if (orderButton) {

    orderButton.disabled =
      false;

  }


  /*
    SIMPAN DENGAN KEY
    YANG DICARI ORDER.JS
  */

  localStorage.setItem(

    "shaeSelectedService",

    JSON.stringify(sofa)

  );

}


/* ================= ORDER ================= */

function orderSofa() {

  /*
    Kalau belum ada pilihan
    coba ambil dari localStorage
  */

  if (!selectedSofa) {

    try {

      selectedSofa =
        JSON.parse(
          localStorage.getItem(
            "shaeSelectedService"
          )
        );

    } catch {

      selectedSofa =
        null;

    }

  }


  if (!selectedSofa) {

    alert(
      "Silakan pilih jenis sofa terlebih dahulu."
    );

    return;

  }


  /*
    Pastikan format sesuai
    dengan order.js
  */

  const serviceData = {

    id:
      selectedSofa.id,

    layanan:
      selectedSofa.layanan,

    item:
      selectedSofa.item,

    harga:
      Number(
        selectedSofa.harga
      ),

    qty:
      Number(
        selectedSofa.qty || 1
      ),

    total:
      Number(
        selectedSofa.total
      )

  };


  /*
    Simpan ulang
  */

  localStorage.setItem(

    "shaeSelectedService",

    JSON.stringify(
      serviceData
    )

  );


  /*
    Masuk ORDER
  */

  window.location.href =
    "order.html";

}


/* ================= BACK ================= */

function goBack() {

  if (
    document.referrer &&
    document.referrer.includes(
      window.location.hostname
    )
  ) {

    history.back();

  } else {

    window.location.href =
      "index.html";

  }

}


/* ================= SHARE ================= */

function shareSofa() {

  const shareData = {

    title:
      "Cuci Sofa - Shae Cleaners",

    text:
      "Pesan layanan Cuci Sofa Shae Cleaners.",

    url:
      window.location.href

  };


  if (
    navigator.share
  ) {

    navigator.share(
      shareData
    ).catch(
      () => {}
    );

    return;

  }


  if (
    navigator.clipboard
  ) {

    navigator.clipboard
      .writeText(
        window.location.href
      )
      .then(() => {

        alert(
          "Link layanan berhasil disalin."
        );

      });

    return;

  }


  alert(
    "Fitur share tidak tersedia."
  );

}


/* ================= RESTORE ================= */

function restoreSelectedSofa() {

  try {

    const saved =
      JSON.parse(
        localStorage.getItem(
          "shaeSelectedService"
        )
      );


    if (!saved) return;


    const found =
      sofaData.find(
        sofa =>
          sofa.id === saved.id
      );


    if (found) {

      selectSofa(
        found
      );

    }

  } catch {

    /*
      Abaikan data rusak
    */

  }

}


/* ================= START ================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    loadSofa();

    restoreSelectedSofa();

  }
);