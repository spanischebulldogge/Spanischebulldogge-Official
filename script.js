/* ===========================
   SPANISCHEBULLDOGGE
=========================== */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {

            menuBtn.innerHTML = "✖️";

        } else {

            menuBtn.innerHTML = "☰";

        }

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuBtn.innerHTML = "☰";

        });

    });

}
/* ===========================
   Statistik Animation
=========================== */

function animateNumber(id, end) {

    const element = document.getElementById(id);

    if (!element) return;

    let current = 0;

    const step = Math.max(1, Math.ceil(end / 80));

    const interval = setInterval(() => {

        current += step;

        if (current >= end) {

            current = end;

            clearInterval(interval);

        }

        element.textContent = current;

    }, 20);

}

animateNumber("caseCount", 87);
animateNumber("cityCount", 49);
animateNumber("stateCount", 10);
/* ===========================
   LEAFLET
=========================== */

const map = L.map("map").setView([51.1657, 10.4515], 6);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap"
    }
).addTo(map);

let markerListe = [];
let daten = [];

fetch("data.json")

.then(res => res.json())

.then(data => {

    daten = data;

    daten.forEach(einsatz => {

        const marker = L.marker([
            einsatz.lat,
            einsatz.lng
        ]).addTo(map);

        marker.bindPopup(`
            <strong>${einsatz.stadt}</strong><br>
            ${einsatz.bundesland}<br>
            Dokumentierte Fälle: ${einsatz.faelle}
        `);

        marker.info = einsatz;

        markerListe.push(marker);

    });

});
const search = document.getElementById("search");

search.addEventListener("input", function(){

    const text = this.value.toLowerCase();

    markerListe.forEach(marker=>{

        if(marker.info.stadt.toLowerCase().includes(text)){

            map.setView(
                [marker.info.lat, marker.info.lng],
                10
            );

            marker.openPopup();

        }

    });

});
/* ===========================
   Live Banner
=========================== */

function updateLiveBanner() {

    if (!daten || daten.length === 0) return;

    const letzter = daten[daten.length - 1];

    const banner = document.getElementById("liveLatest");

    if (banner) {

        banner.textContent =
            `${letzter.stadt} • ${letzter.faelle} dokumentierte Fälle`;

    }

}

fetch("data.json")
    .then(res => res.json())
    .then(data => {

        daten = data;

        updateLiveBanner();

    });
    /* ===========================
   Navbar Scroll
=========================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});