fetch("components/sidebar.html")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Could not load sidebar");
    }
    return response.text();
  })
  .then((html) => {
    const container = document.getElementById("sidebar-container");
    container.innerHTML = html;

    // Normalize the current URL.
    const currentPath = window.location.pathname
      .replace(/\/+$/, "")
      .replace(/\/index\.html$/, "");

    // Find the link corresponding to the current page.
    container.querySelectorAll("a").forEach((link) => {
      const linkPath = new URL(link.href).pathname
        .replace(/\/+$/, "")
        .replace(/\/index\.html$/, "");

      if (linkPath === currentPath) {
        link.classList.add("current-page");
        link.setAttribute("aria-current", "page");
      }
    });
  })
  .catch((error) => {
    console.error("Error loading sidebar:", error);
  });
