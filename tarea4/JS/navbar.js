window.addEventListener("DOMContentLoaded", () => {

    const links = document.querySelectorAll(".nav-link");
  
    const currentPath = window.location.pathname.split("/").pop();
  
    links.forEach(link => {
      link.classList.remove("active");
    });
  
  
    links.forEach(link => {
  
      const linkPage = link.getAttribute("href");
  
      if (linkPage === currentPath) {
        link.classList.add("active");
      }
  
    });
  
  });