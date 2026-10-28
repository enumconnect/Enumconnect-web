import GameRunner from "./game-runner";
import Link from "next/link";

export default function Home() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Enumconnect home">
          <span className="brand-icon" aria-hidden="true">e<span>·</span></span>
          enumconnect<span className="brand-period">.</span>
        </Link>
        <span className="header-note"><span className="status-dot" /> A little work in progress</span>
      </header>
      <main className="landing">
        <section className="intro" aria-labelledby="page-title">
          <span className="eyebrow"><span className="status-dot" /> UNDER DEVELOPMENT</span>
          <h1 id="page-title">Good things<br />are <span>connecting.</span></h1>
          <p className="intro-copy">We’re building something we can’t wait to share with you. Enumconnect is still under development, and we’re giving every detail a little extra care.</p>
          <div className="return-note">
            <span className="note-icon" aria-hidden="true">↗</span>
            <div><strong>Come back a little later.</strong><p>We’ll be here, a little closer to ready.</p></div>
          </div>
          <div className="handwritten" aria-hidden="true">In the meantime, take a little adventure break <span>⤴</span></div>
        </section>
        <GameRunner />
      </main>
      <footer className="site-footer">
        <span>© Enumconnect. All rights reserved.</span>
        <span>Something worth the wait.<span className="footer-spark" aria-hidden="true"> ✳</span></span>
      </footer>
    </div>
  );
}
