/* =====================================================
   SHAE CLEANERS
   APP.JS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       PROMO TEXT ROTATION
    ================================================= */

    const promoText = document.getElementById("promoText");

    const promoList = [
        "🔥 Diskon Cleaning Hingga 25%",
        "🛋️ Cuci Sofa Mulai Harga Terjangkau",
        "🛏️ Kasur Bersih, Tidur Lebih Nyaman",
        "🚗 Paket Jok Mobil Hemat",
        "🎁 Cleaning 2 Item FREE 1 Item",
        "⭐ Booking Online Lebih Cepat"
    ];

    let promoIndex = 0;

    function changePromo() {

        if (!promoText) return;

        promoText.style.opacity = "0";
        promoText.style.transform = "translateY(5px)";

        setTimeout(() => {

            promoIndex++;

            if (promoIndex >= promoList.length) {
                promoIndex = 0;
            }

            promoText.textContent = promoList[promoIndex];

            promoText.style.opacity = "1";
            promoText.style.transform = "translateY(0)";

        }, 250);
    }

    setInterval(changePromo, 3000);


    /* =================================================
       MENU BUTTON
    ================================================= */

    const menuBtn = document.getElementById("menuBtn");

    if (menuBtn) {

        menuBtn.addEventListener("click", () => {
            openMenu();
        });

    }


    /* =================================================
       CLOSE MENU
    ================================================= */

    document.addEventListener("click", (event) => {

        const overlay = document.querySelector(".menu-overlay");

        if (!overlay) return;

        if (event.target === overlay) {
            closeMenu();
        }

    });


    /* =================================================
       SERVICE CARD ANIMATION
    ================================================= */

    const serviceCards =
        document.querySelectorAll(".service-card");

    serviceCards.forEach((card, index) => {

        card.style.opacity = "0";
        card.style.transform = "translateY(10px)";

        setTimeout(() => {

            card.style.transition =
                "opacity .35s ease, transform .35s ease";

            card.style.opacity = "1";
            card.style.transform = "translateY(0)";

        }, 80 + (index * 50));

    });


    /* =================================================
       BOTTOM NAV ACTIVE
    ================================================= */

    const currentPage =
        window.location.pathname.split("/").pop() ||
        "index.html";

    const navItems =
        document.querySelectorAll(".nav-item");

    navItems.forEach(item => {

        const href = item.getAttribute("href");

        if (href === currentPage) {
            item.classList.add("active");
        }

    });


    /* =================================================
       PWA SERVICE WORKER
    ================================================= */

    if ("serviceWorker" in navigator) {

        window.addEventListener("load", () => {

            navigator.serviceWorker
                .register("sw.js")
                .then(() => {
                    console.log(
                        "Shae Cleaners PWA aktif."
                    );
                })
                .catch(error => {
                    console.log(
                        "Service Worker gagal:",
                        error
                    );
                });

        });

    }

});


/* =====================================================
   OPEN MENU
===================================================== */

function openMenu() {

    let overlay =
        document.querySelector(".menu-overlay");

    /* Buat menu jika belum ada */

    if (!overlay) {

        overlay = document.createElement("div");

        overlay.className = "menu-overlay";

        overlay.innerHTML = `
            <div class="menu-panel">

                <a href="index.html">
                    <i class="fa-solid fa-house"></i>
                    <span>Beranda</span>
                </a>

                <a href="pages/order.html">
                    <i class="fa-solid fa-receipt"></i>
                    <span>Pesanan</span>
                </a>

                <a href="pages/tracking.html">
                    <i class="fa-solid fa-location-dot"></i>
                    <span>Tracking Pesanan</span>
                </a>

                <a href="pages/promo.html">
                    <i class="fa-solid fa-gift"></i>
                    <span>Promo</span>
                </a>

                <a href="pages/akun.html">
                    <i class="fa-solid fa-user"></i>
                    <span>Akun Saya</span>
                </a>

                <a href="pages/chat.html">
                    <i class="fa-solid fa-comments"></i>
                    <span>Chat</span>
                </a>

            </div>
        `;

        document.body.appendChild(overlay);

    }

    overlay.classList.add("show");
}

/* =========================================================
   SEARCH
========================================================= */

const searchInput =
  document.getElementById(
    "searchInput"
  );


if (searchInput) {

  searchInput.addEventListener(
    "input",
    function () {

      const keyword =
        this.value
          .toLowerCase()
          .trim();


      if (!keyword) return;


      const result =
        Object.values(services)
          .find(service =>

            service.name
              .toLowerCase()
              .includes(keyword)

            ||

            service.category
              .toLowerCase()
              .includes(keyword)

          );


      if (result) {

        window.location.href =
          `detail.html?service=${result.id}`;

      }

    }
  );

}
/* =========================================================
   PROMO SLIDER
========================================================= */

const promoSlider =
  document.getElementById(
    "promoSlider"
  );


const promoDots =
  document.querySelectorAll(
    ".slider-dots .dot"
  );


if (promoSlider) {

  let currentSlide = 0;


  promoSlider.addEventListener(
    "scroll",
    function () {

      const width =
        promoSlider.offsetWidth;


      if (!width) return;


      currentSlide =
        Math.round(
          promoSlider.scrollLeft / width
        );


      promoDots.forEach(
        (dot, index) => {

          dot.classList.toggle(
            "active",
            index === currentSlide
          );

        }
      );

    }
  );


  setInterval(() => {

    if (!promoSlider) return;


    const width =
      promoSlider.offsetWidth;


    if (!width) return;


    currentSlide++;


    if (
      currentSlide >=
      promoSlider.children.length
    ) {

      currentSlide = 0;

    }


    promoSlider.scrollTo({

      left:
        currentSlide * width,

      behavior:
        "smooth"

    });

  }, 5000);

}


/* =====================================================
   CLOSE MENU
===================================================== */

function closeMenu() {

    const overlay =
        document.querySelector(".menu-overlay");

    if (overlay) {
        overlay.classList.remove("show");
    }

}


/* =====================================================
   GLOBAL BOOKING FUNCTION
===================================================== */

function booking() {

    window.location.href = "pages/order.html";

}


/* =====================================================
   FORMAT RUPIAH
===================================================== */

function formatRupiah(value) {

    value = Number(value) || 0;

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
   SAVE SIMPLE DATA
===================================================== */

function saveData(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    } catch (error) {

        console.error(
            "Gagal menyimpan data:",
            error
        );

    }

}


/* =====================================================
   GET SIMPLE DATA
===================================================== */

function getData(key) {

    try {

        const data =
            localStorage.getItem(key);

        return data
            ? JSON.parse(data)
            : null;

    } catch (error) {

        console.error(
            "Gagal membaca data:",
            error
        );

        return null;

    }

}


/* =====================================================
   REMOVE DATA
===================================================== */

function removeData(key) {

    localStorage.removeItem(key);

}


/* =====================================================
   SCROLL TOP
===================================================== */

function scrollTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   PREVENT DOUBLE CLICK
===================================================== */

function preventDoubleClick(button) {

    if (!button) return;

    button.disabled = true;

    setTimeout(() => {
        button.disabled = false;
    }, 1200);

}


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "%cShae Cleaners",
    "color:#1677ff;font-size:20px;font-weight:bold;"
);

console.log(
    "Cleaning Service App Ready."
);