import React, { useEffect, useMemo, useRef, useState } from "react";

/* ========= CONFIG LIENS ========= */
const LINKS = {
  whatsapp: "https://wa.me/2420682226686",
  email: "mailto:urithioba@gmail.com",
  instagram:
    "https://www.instagram.com/urithioba?igsh=OGx0eHp4c3B2ZTQ3&utm_source=qr",
  facebook: "https://www.facebook.com/share/1SNeNnLMnY/?mibextid=wwXIfr",
  tiktok: "https://www.tiktok.com/@urithioba?_r=1&_t=ZN-93uBJvxl2Zy",
  snapchat: "https://snapchat.com/t/pCzq3fWY",
};

/* ========= TEXTES FR/EN ========= */
const COPY = {
  fr: {
    discover: "DÉCOUVRIR LA COLLECTION",
    tshirtsTitle: "T-SHIRTS",
    tshirtsHint:
      "Swipe / cliquez pour voir les photos. Cliquez sur une photo pour l’ouvrir en plein écran.",
    contactTitle: "CONTACT",
    contactBrand: "URITHI OBA",
    email: "E-mail",
    whatsapp: "WhatsApp",
    detailsTitle: "Détails",
    size: "Taille",
    qty: "Quantité",
    order: "Commander sur WhatsApp",
    favorites: "Favoris",
    searchPlaceholder: "Rechercher…",
    noResult: "Aucun résultat",
  },
  en: {
    discover: "DISCOVER THE COLLECTION",
    tshirtsTitle: "T-SHIRTS",
    tshirtsHint:
      "Swipe / click to view photos. Click a photo to open full screen.",
    contactTitle: "CONTACT",
    contactBrand: "URITHI OBA",
    email: "Email",
    whatsapp: "WhatsApp",
    detailsTitle: "Details",
    size: "Size",
    qty: "Quantity",
    order: "Order on WhatsApp",
    favorites: "Favorites",
    searchPlaceholder: "Search…",
    noResult: "No results",
  },
};

/* ========= DATA PRODUITS ========= */
const PRODUCTS = [
  {
    id: "noir",
    nameFr: "La Cosmogonie Kongo — T-Shirt Noir",
    nameEn: "La Cosmogonie Kongo — Black T-Shirt",
    price: 26250,
    currency: "FCFA",
    slides: [
      "/images/tshirt-noir-front.jpg",
      "/images/tshirt-noir-back.jpg",
      "/images/mannequin-noir-front.jpg",
      "/images/mannequin-noir-back.jpg",
    ],
    details: ["300GMS", "100% coton", "Made in Kongo"],
  },
  {
    id: "blanc",
    nameFr: "La Cosmogonie Kongo — T-Shirt Blanc",
    nameEn: "La Cosmogonie Kongo — White T-Shirt",
    price: 26250,
    currency: "FCFA",
    slides: [
      "/images/tshirt-blanc-front.jpg",
      "/images/tshirt-blanc-back.jpg",
      "/images/mannequin-blanc-front.jpg",
      "/images/mannequin-blanc-back.jpg",
    ],
    details: ["300GMS", "100% coton", "Made in Kongo"],
  },
];

/* ========= ICONS (SVG) ========= */
function Icon({ type }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none" };
  if (type === "search")
    return (
      <svg {...common}>
        <path
          d="M10.5 19a8.5 8.5 0 1 1 0-17 8.5 8.5 0 0 1 0 17Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M16.5 16.5 21 21"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  if (type === "heart")
    return (
      <svg {...common}>
        <path
          d="M12 21s-7-4.6-9.2-9C1 7.8 3.1 5 6 5c1.7 0 3.1.9 4 2.1C10.9 5.9 12.3 5 14 5c2.9 0 5 2.8 3.2 7-2.2 4.4-9.2 9-9.2 9Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (type === "menu")
    return (
      <svg {...common}>
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );

  if (type === "instagram")
    return (
      <svg {...common}>
        <path
          d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M17.5 6.5h.01"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    );

  if (type === "facebook")
    return (
      <svg {...common}>
        <path
          d="M14 8h2V5h-2c-2 0-4 2-4 4v3H8v3h2v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1Z"
          fill="currentColor"
        />
      </svg>
    );

  if (type === "tiktok")
    return (
      <svg {...common}>
        <path
          d="M14 3c.6 2.7 2.3 4.3 5 4.6V10c-1.9 0-3.5-.6-5-1.7V15a6 6 0 1 1-6-6c.4 0 .8 0 1.2.1V12a3 3 0 1 0 2.8 3V3h2Z"
          fill="currentColor"
        />
      </svg>
    );

  if (type === "snapchat")
    return (
      <svg {...common}>
        <path
          d="M12 2c-3 0-4.5 2.2-4.5 4.8v2.2c0 .6-.5 1-1.2 1.4-.9.5-1.1 1.1-.1 1.6.7.4 1.2.4 1.7.6.6.2.6.8.1 1.2-.7.6-1.5.9-2.3 1.2-.5.2-.4.8 0 1 1.5.5 2.2.3 3 .1.6-.2 1.2 0 1.7.5.6.6 1.4.9 2.1.9s1.5-.3 2.1-.9c.5-.5 1.1-.7 1.7-.5.8.2 1.5.4 3-.1.4-.2.5-.8 0-1-.8-.3-1.6-.6-2.3-1.2-.5-.4-.5-1 .1-1.2.5-.2 1-.2 1.7-.6 1-.5.8-1.1-.1-1.6-.7-.4-1.2-.8-1.2-1.4V6.8C16.5 4.2 15 2 12 2Z"
          fill="currentColor"
        />
      </svg>
    );

  return null;
}

/* ========= GLIDE CAROUSEL (stable, pas sensible) ========= */
function GlideCarousel({ slides, altBase, onOpen }) {
  const [safeSlides, setSafeSlides] = useState(() => slides.filter(Boolean));
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setSafeSlides(slides.filter(Boolean));
    setIndex(0);
  }, [slides]);

  const total = safeSlides.length || 1;
  const progress = total <= 1 ? 1 : (index + 1) / total;

  const handleImgError = (badSrc) => {
    setSafeSlides((prev) => prev.filter((s) => s !== badSrc));
    setIndex((prev) => Math.max(0, Math.min(prev, total - 2)));
  };

  const startX = useRef(0);
  const deltaX = useRef(0);
  const dragging = useRef(false);

  const onPointerDown = (e) => {
    dragging.current = true;
    startX.current = e.clientX;
    deltaX.current = 0;
  };
  const onPointerMove = (e) => {
    if (!dragging.current) return;
    deltaX.current = e.clientX - startX.current;
  };
  const onPointerUp = () => {
    if (!dragging.current) return;
    dragging.current = false;

    const threshold = 80; // ✅ pas trop sensible
    if (deltaX.current > threshold) setIndex((i) => Math.max(0, i - 1));
    if (deltaX.current < -threshold) setIndex((i) => Math.min(total - 1, i + 1));
  };

  const go = (dir) =>
    setIndex((i) => Math.max(0, Math.min(total - 1, i + dir)));

  const current = safeSlides[index];

  return (
    <div className="glide">
      <div
        className="glide__viewport"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <button className="glide__nav glide__nav--left" onClick={() => go(-1)} aria-label="Précédent">
          ‹
        </button>

        <button
          className="glide__single"
          onClick={() => current && onOpen?.(current)}
          aria-label="Ouvrir en plein écran"
          type="button"
        >
          {current ? (
            <img
              src={current}
              alt={`${altBase} ${index + 1}`}
              loading="lazy"
              onError={() => handleImgError(current)}
            />
          ) : (
            <div className="glide__empty">Image indisponible</div>
          )}
        </button>

        <button className="glide__nav glide__nav--right" onClick={() => go(1)} aria-label="Suivant">
          ›
        </button>
      </div>

      <div className="glide__meta">
        <div className="glide__dots" aria-hidden="true">
          {safeSlides.map((_, i) => (
            <span key={i} className={i === index ? "dot dot--active" : "dot"} />
          ))}
        </div>

        <div className="glide__bar" aria-hidden="true">
          <span className="glide__barFill" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </div>
  );
}

/* ========= MODAL PLEIN ECRAN ========= */
function Lightbox({ src, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!src) return null;

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lightbox__close" onClick={onClose} aria-label="Fermer">
        ×
      </button>
      <img className="lightbox__img" src={src} alt="Plein écran" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

/* ========= APP ========= */
export default function App() {
  const [lang, setLang] = useState("fr");
  const t = COPY[lang];

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const [favorites, setFavorites] = useState(() => new Set());
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return PRODUCTS;
    return PRODUCTS.filter((p) => {
      const name = (lang === "fr" ? p.nameFr : p.nameEn).toLowerCase();
      return name.includes(query) || p.details.join(" ").toLowerCase().includes(query);
    });
  }, [q, lang]);

  const toggleFav = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  return (
    <div className="app">
      {/* ====== HEADER ====== */}
      <header className="topbar">
        <div className="topbar__left">
          <button className="lang" onClick={() => setLang((l) => (l === "fr" ? "en" : "fr"))}>
            {lang === "fr" ? "FR / EN" : "EN / FR"}
          </button>
        </div>

        <div className="brand" onClick={() => scrollToId("home")} role="button" tabIndex={0}>
          <img className="brand__logo" src="/images/logo.png" alt="URITHI OBA" />
          <span className="brand__name">URITHI OBA</span>
        </div>

        <div className="topbar__right">
          <button className="iconBtn" onClick={() => setSearchOpen((v) => !v)} aria-label="Recherche">
            <Icon type="search" />
          </button>
          <button className="iconBtn" onClick={() => scrollToId("tshirts")} aria-label="T-Shirts">
            <Icon type="heart" />
          </button>
          <button className="iconBtn" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
            <Icon type="menu" />
          </button>
        </div>
      </header>

      {/* ====== DRAWER MENU ====== */}
      <div className={menuOpen ? "drawer drawer--open" : "drawer"} onClick={() => setMenuOpen(false)}>
        <div className="drawer__panel" onClick={(e) => e.stopPropagation()}>
          <div className="drawer__title">Menu</div>

          <button className="drawer__link" onClick={() => scrollToId("home")}>
            Accueil
          </button>
          <button className="drawer__link" onClick={() => scrollToId("tshirts")}>
            T-Shirts
          </button>
          <button className="drawer__link" onClick={() => scrollToId("contact")}>
            Contact
          </button>

          <div className="drawer__sep" />

          <div className="drawer__smallTitle">Social</div>
          <div className="socialRow">
            <a className="socialIcon" href={LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Icon type="instagram" />
            </a>
            <a className="socialIcon" href={LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <Icon type="facebook" />
            </a>
            <a className="socialIcon" href={LINKS.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
              <Icon type="tiktok" />
            </a>
            <a className="socialIcon" href={LINKS.snapchat} target="_blank" rel="noreferrer" aria-label="Snapchat">
              <Icon type="snapchat" />
            </a>
          </div>

          <div className="drawer__sep" />

          <div className="drawer__smallTitle">{t.contactTitle}</div>
          <a className="drawer__contact" href={LINKS.email}>
            {t.email}: urithioba@gmail.com
          </a>
          <a className="drawer__contact" href={LINKS.whatsapp} target="_blank" rel="noreferrer">
            {t.whatsapp}: +242 06 822 66 86
          </a>
        </div>
      </div>

      {/* ====== SEARCH ====== */}
      <div className={searchOpen ? "search search--open" : "search"} onClick={() => setSearchOpen(false)}>
        <div className="search__panel" onClick={(e) => e.stopPropagation()}>
          <div className="search__title">{t.searchPlaceholder}</div>
          <input value={q} onChange={(e) => setQ(e.target.value)} className="search__input" placeholder={t.searchPlaceholder} />
          <div className="search__hint">
            {filtered.length ? `${filtered.length} résultat(s)` : t.noResult}
          </div>
        </div>
      </div>

      {/* ====== HERO (plein écran, image entière) ====== */}
      <section id="home" className="hero">
        <img className="hero__bg" src="/images/hero.jpg" alt="URITHI OBA Hero" />
        <div className="hero__veil" />
        <div className="hero__content">
          <h1 className="hero__title">URITHI OBA</h1>
          <button className="hero__cta" onClick={() => scrollToId("tshirts")}>
            {t.discover}
          </button>
        </div>
      </section>

      {/* ====== TSHIRTS ====== */}
      <section id="tshirts" className="section">
        <div className="section__head">
          <h2 className="section__title">{t.tshirtsTitle}</h2>
          <p className="section__subtitle">{t.tshirtsHint}</p>
        </div>

        <div className="grid">
          {filtered.map((p) => {
            const name = lang === "fr" ? p.nameFr : p.nameEn;
            const fav = favorites.has(p.id);

            return (
              <article key={p.id} className="card">
                <div className="card__top">
                  <div>
                    <div className="card__name">{name}</div>
                    <div className="card__price">
                      Prix : {p.price} {p.currency}
                    </div>
                  </div>

                  <button className={fav ? "fav fav--on" : "fav"} onClick={() => toggleFav(p.id)} aria-label={t.favorites}>
                    <Icon type="heart" />
                  </button>
                </div>

                <GlideCarousel slides={p.slides} altBase={name} onOpen={(src) => setLightboxSrc(src)} />

                <div className="card__form">
                  <div className="field">
                    <label>{t.size}</label>
                    <select defaultValue="M">
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                      <option>2XL</option>
                      <option>3XL</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>{t.qty}</label>
                    <input type="number" min="1" defaultValue="1" />
                  </div>
                </div>

                <div className="card__details">
                  <div className="card__detailsTitle">{t.detailsTitle}</div>
                  <ul>
                    {p.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>

                <a className="order" href={LINKS.whatsapp} target="_blank" rel="noreferrer">
                  {t.order}
                </a>
              </article>
            );
          })}
        </div>
      </section>

      {/* ====== CONTACT ====== */}
      <section id="contact" className="section section--contact">
        <div className="section__head">
          <h2 className="section__title">{t.contactTitle}</h2>
          <p className="section__subtitle">{t.contactBrand}</p>
        </div>

        <div className="contactBox">
          <a className="contactRow" href={LINKS.email}>
            <span className="contactLabel">{t.email}</span>
            <span className="contactValue">urithioba@gmail.com</span>
          </a>

          <a className="contactRow" href={LINKS.whatsapp} target="_blank" rel="noreferrer">
            <span className="contactLabel">{t.whatsapp}</span>
            <span className="contactValue">+242 06 822 66 86</span>
          </a>

          <div className="socialRow socialRow--center">
            <a className="socialIcon" href={LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Icon type="instagram" />
            </a>
            <a className="socialIcon" href={LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <Icon type="facebook" />
            </a>
            <a className="socialIcon" href={LINKS.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
              <Icon type="tiktok" />
            </a>
            <a className="socialIcon" href={LINKS.snapchat} target="_blank" rel="noreferrer" aria-label="Snapchat">
              <Icon type="snapchat" />
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">© {new Date().getFullYear()} URITHI OBA</footer>

      <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
    </div>
  );
}
