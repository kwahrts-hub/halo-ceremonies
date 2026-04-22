// components.js

const header = (
  <header class="site-header">
    <a href="/" class="logo">
      Halo Ceremonies
    </a>
    <nav class="main-nav">
      <a href="/">Home</a>
      <a href="/about/">About</a>
      <a href="/services/">Services</a>
      <a href="/gallery/">Gallery</a>
      <a href="/contact/">Contact</a>
    </nav>
  </header>
);
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

const currentPath = window.location.pathname;
document.querySelectorAll(".main-nav a").forEach((link) => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("active");
  }
});
