import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { cars, categories, formatPrice, wa } from "./cars";

const Eyebrow = ({ children }) => (
  <div className="eyebrow"><span className="eyebrow-line" /> {children}</div>
);

const PageHead = ({ eyebrow, title, accent, text }) => (
  <section className="page-head section-pad">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h1 className="page-title">{title} <span>{accent}</span></h1>
    {text && <p>{text}</p>}
  </section>
);

const Tilt = ({ children }) => {
  const move = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateY(-6px)`;
  };
  return (
    <div className="tilt reveal" onMouseMove={move} onMouseLeave={(e) => (e.currentTarget.style.transform = "")}>
      {children}
    </div>
  );
};

const CarCard = ({ car }) => (
  <Tilt>
    <article className="car-card">
      <Link to={`/collection/${car.id}`} className="car-image-button">
        <img src={car.image} alt={car.name} loading="lazy" />
        <span className="car-tag">{car.tag}</span>
        <span className="image-index">VM.0{car.id}</span>
        <span className="image-arrow">↗</span>
      </Link>
      <div className="car-info">
        <div className="car-year">{car.year} MODEL <span>•</span> {car.category.toUpperCase()}</div>
        <h3>{car.name}</h3>
        <div className="car-specs"><span>⚙ {car.transmission}</span><span>◉ {car.fuel}</span></div>
        <div className="car-card-bottom">
          <div><small>ASKING PRICE</small><strong>{formatPrice(car.price)}</strong></div>
          <Link to={`/collection/${car.id}`} className="card-details">↗</Link>
        </div>
      </div>
    </article>
  </Tilt>
);

const Count = ({ to, suffix = "" }) => {
  const [n, setN] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1600, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <strong ref={ref}>{n}{suffix}</strong>;
};

const words = ["SEDAN", "LUXURY", "SUV", "SPORTS", "PERFORMANCE", "COMFORT", "STYLE"];

export function Home() {
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-grid" />
        <div className="hero-copy">
          <Eyebrow>THE ART OF THE DRIVE</Eyebrow>
          <h1>
            <span className="ln"><i style={{ "--d": "0.2s" }}>DRIVE</i></span>
            <span className="ln out"><i style={{ "--d": "0.4s" }}>BEYOND</i></span>
            <span className="ln"><i style={{ "--d": "0.6s" }}>ORDINARY<b className="hero-period">.</b></i></span>
          </h1>
          <p className="hero-description">
            Exceptional cars. Unforgettable journeys.<br />Discover a collection built around your ambition.
          </p>
          <div className="hero-actions">
            <Link to="/collection" className="button-primary">Explore collection <span>↗</span></Link>
            <Link to="/experience" className="button-ghost">Our story <span>→</span></Link>
          </div>
          <div className="hero-footnote">
            <span className="hero-index">01 / 04</span><span className="footnote-line" />
            <span>DESIGNED FOR THE EXTRAORDINARY</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
          <div className="hero-car-frame">
            <img className="hero-car" src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=90" alt="Luxury sports car" />
          </div>
          <div className="hero-image-shade" />
          <div className="hero-side-label"><span>VM / 001</span><span>PERFORMANCE MEETS DESIGN</span></div>
          <div className="hero-floating-card">
            <span className="floating-label">THE VELOCITY STANDARD</span>
            <strong>Every detail.</strong><strong>Every journey.</strong>
            <span className="floating-arrow">↗</span>
          </div>
        </div>
        <div className="hero-bottom-line" />
      </section>

      <div className="marquee">
        <div className="marquee-track">
          {[...words, ...words, ...words, ...words].map((w, i) => (<span key={i}>{w} <b>✦</b></span>))}
        </div>
      </div>

      <section className="section-pad">
        <div className="section-heading reveal">
          <div><Eyebrow>FEATURED</Eyebrow><h2>Fresh on <span>the floor.</span></h2></div>
          <Link to="/collection" className="text-link">View all cars <span>↗</span></Link>
        </div>
        <div className="car-grid">{cars.slice(0, 3).map((c) => <CarCard key={c.id} car={c} />)}</div>
      </section>

      <section className="numbers section-pad reveal">
        <div className="numbers-grid">
          {/* TODO: replace with your showroom's real numbers */}
          <div className="number-item"><Count to={250} suffix="+" /><h3>Cars delivered</h3><p>Replace with your real figure.</p></div>
          <div className="number-item"><Count to={12} suffix="+" /><h3>Years of experience</h3><p>Replace with your real figure.</p></div>
          <div className="number-item"><Count to={100} suffix="%" /><h3>Personal service</h3><p>Support at every step.</p></div>
        </div>
      </section>

      <section className="cta-band reveal">
        <h2>Your next drive <span>starts here.</span></h2>
        <Link to="/contact" className="button-primary">Talk to our team <span>↗</span></Link>
      </section>
    </>
  );
}

export function Collection() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = cars.filter((c) =>
    (cat === "All" || c.category === cat) &&
    `${c.name} ${c.year} ${c.category}`.toLowerCase().includes(q.toLowerCase())
  );
  return (
    <>
      <PageHead eyebrow="THE COLLECTION" title="Find your" accent="kind of drive." text="From everyday refinement to statement-making performance." />
      <section className="collection" style={{ padding: "0 6% 100px" }}>
        <div className="inventory-tools">
          <div className="category-list">
            {categories.map((c) => (
              <button key={c} className={cat === c ? "category active" : "category"} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <label className="search-box">
            <span>⌕</span>
            <input type="search" placeholder="Search your next car..." value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
        </div>
        <div className="inventory-meta">
          <span>SHOWING <strong>{String(list.length).padStart(2, "0")}</strong> VEHICLES</span>
          <span>HANDPICKED. NEVER ORDINARY.</span>
        </div>
        <div className="car-grid" key={cat + q}>{list.map((c) => <CarCard key={c.id} car={c} />)}</div>
        {!list.length && (
          <div className="empty-state"><h3>No matching cars found</h3>
            <button className="button-primary" onClick={() => { setQ(""); setCat("All"); }}>Reset filters</button>
          </div>
        )}
      </section>
    </>
  );
}
const EmiCalculator = ({ car }) => {
  const [downPct, setDownPct] = useState(30);
  const [years, setYears] = useState(3);
  const [rate, setRate] = useState(18);

  const down = Math.round((car.price * downPct) / 100);
  const loan = car.price - down;
  const r = rate / 1200;
  const n = years * 12;
  const emi = r === 0 ? loan / n : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  const fmt = (v) => `PKR ${Math.round(v).toLocaleString("en-PK")}`;

  return (
    <div className="emi reveal">
      <Eyebrow>INSTALLMENT CALCULATOR</Eyebrow>
      <div className="emi-grid">
        <div className="emi-controls">
          <label>
            <span>Down payment <b>{downPct}% · {fmt(down)}</b></span>
            <input type="range" min="10" max="80" step="5" value={downPct} onChange={(e) => setDownPct(+e.target.value)} />
          </label>
          <label>
            <span>Duration <b>{years} {years === 1 ? "year" : "years"}</b></span>
            <input type="range" min="1" max="7" step="1" value={years} onChange={(e) => setYears(+e.target.value)} />
          </label>
          <label>
            <span>Markup rate <b>{rate}% per year</b></span>
            <input type="range" min="8" max="30" step="1" value={rate} onChange={(e) => setRate(+e.target.value)} />
          </label>
        </div>

        <div className="emi-result">
          <small>MONTHLY INSTALLMENT</small>
          <strong>{fmt(emi)}</strong>
          <div className="emi-rows">
            <div><span>Loan amount</span><b>{fmt(loan)}</b></div>
            <div><span>Total markup</span><b>{fmt(total - loan)}</b></div>
            <div><span>Total payable</span><b>{fmt(total + down)}</b></div>
          </div>
          <a
            className="button-primary"
            target="_blank"
            rel="noreferrer"
            href={wa(`Hello! I am interested in the ${car.name}. Down payment ${downPct}% (${fmt(down)}), ${years} years. Estimated installment ${fmt(emi)}/month. Please share details.`)}
          >
            Enquire with this plan <span>↗</span>
          </a>
          <p>Ye sirf andaza hai. Asli kist bank ya leasing company ke rate par depend karti hai.</p>
        </div>
      </div>
    </div>
  );
};
export function CarDetail() {
  const { id } = useParams();
  const car = cars.find((c) => String(c.id) === id);
  if (!car) return <PageHead eyebrow="404" title="Car not" accent="found." />;
  const specs = [["Year", car.year], ["Category", car.category], ["Transmission", car.transmission], ["Fuel", car.fuel]];
  return (
    <section className="detail section-pad">
      <Link to="/collection" className="text-link">← Back to collection</Link>
      <div className="detail-grid">
        <div className="detail-img reveal"><img src={car.image} alt={car.name} /></div>
        <div className="detail-info reveal">
          <Eyebrow>{car.tag}</Eyebrow>
          <h1 className="page-title">{car.name}</h1>
          <div className="modal-price">{formatPrice(car.price)}</div>
          <div className="spec-grid">
            {specs.map(([k, v]) => (<div key={k}><small>{k.toUpperCase()}</small><strong>{v}</strong></div>))}
          </div>
          <p className="detail-text">{car.description}</p>
          <a className="button-primary" target="_blank" rel="noreferrer"
            href={wa(`Hello! I am interested in the ${car.name} (${car.year}). Please share more details.`)}>
            Enquire about this car <span>↗</span>
          </a>
        </div>
      </div>
        <EmiCalculator car={car} />
    </section>
  );
}

const steps = [
  ["01", "Tell us your drive", "Share your needs, budget and taste. We listen first."],
  ["02", "We curate options", "A short list of cars that genuinely fit you."],
  ["03", "See it in person", "Visit the showroom, inspect and test drive."],
  ["04", "Drive away happy", "Clear communication and support at every step."],
];

export function Experience() {
  return (
    <>
      <PageHead eyebrow="THE VELOCITY EXPERIENCE" title="Not just a car." accent="A statement." text="The right car reflects your taste, your ambitions and the experiences you want to create." />
      <section className="manifesto" style={{ borderTop: 0 }}>
        <div className="manifesto-image">
          <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85" alt="Premium car detail" />
          <div className="manifesto-image-caption">MORE THAN A MACHINE. A FEELING.</div>
        </div>
        <div className="timeline">
          {steps.map(([n, t, d]) => (
            <div className="step reveal" key={n}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></div>
          ))}
        </div>
      </section>
    </>
  );
}

export function Contact() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const send = () => window.open(wa(`Hello Velocity Motors! I am ${name || "a customer"}. ${msg}`), "_blank");
  return (
    <>
      <PageHead eyebrow="THE ROAD AWAITS" title="Your next drive" accent="starts here." text="Tell us what you are looking for. Let's find the right car for you." />
      <section className="contact-grid" style={{ padding: "0 6% 110px" }}>
        <div className="contact-form reveal">
          <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          <textarea rows="5" placeholder="What car are you looking for?" value={msg} onChange={(e) => setMsg(e.target.value)} />
          <button className="button-primary" onClick={send}>Send on WhatsApp <span>↗</span></button>
        </div>
        <div className="contact-side reveal">
          <div><small>VISIT US</small><strong>Bosan Road, Multan</strong></div>
          <div><small>WHATSAPP</small><strong>+92 332 1514444</strong></div>
          <a className="button-ghost" target="_blank" rel="noreferrer"
            href="https://www.google.com/maps/search/?api=1&query=car+showroom+Bosan+Road+Multan+Pakistan">
            Find our location <span>↗</span>
          </a>
        </div>
      </section>
    </>
  );
}