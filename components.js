// components.js

const header = `
  <header class="site-header">
    <div class="container site-header__inner">
      <a href="/" class="logo">Halo Ceremonies</a>
      <button
        class="nav-toggle"
        aria-controls="main-nav"
        aria-expanded="false"
        aria-label="Open navigation menu"
      >
        <span class="nav-toggle__bar"></span>
        <span class="nav-toggle__bar"></span>
        <span class="nav-toggle__bar"></span>
      </button>
      <nav id="main-nav" class="main-nav" aria-hidden="true">
        <ul role="list">
          <li><a href="/#top">Home</a></li>
          <li><a href="/#about">About</a></li>
          <li><a href="/#services">Services</a></li>
          <li><a href="/#gallery">Gallery</a></li>
          <li><a href="/#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
`;
const footer = `
  <footer class="site-footer">
    <p>&copy; 2026 Halo Ceremonies</p>
    <nav>
      <a href="/about/">About</a>
      <a href="/contact/">Contact</a>
    </nav>
  </footer>
`;

document.getElementById("header").innerHTML = header;
document.getElementById("footer").innerHTML = footer;
// Add this at the bottom of components.js, after the innerHTML lines

// Highlight the nav link whose hash target is currently in view,
// falling back to pathname match for non-anchor pages
const currentPath = window.location.pathname;
document.querySelectorAll(".main-nav a").forEach((link) => {
  const href = link.getAttribute("href");
  // On the home page, mark Home active by default; other links are highlighted by scroll
  if (href === "/#top" && currentPath === "/") {
    link.classList.add("active");
  } else if (!href.startsWith("/#") && href === currentPath) {
    link.classList.add("active");
  }
});
