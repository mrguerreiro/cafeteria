document.getElementById("search-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Impede o envio do formulário
  const query = document.getElementById("search-input").value.toLowerCase();
  
  // Remove destaques anteriores
  const highlightedElements = document.querySelectorAll(".highlight");
  highlightedElements.forEach(element => {
    element.outerHTML = element.innerHTML;
  });

  if (query) {
    const elements = document.body.getElementsByTagName("*");
    Array.from(elements).forEach(element => {
      if (element.children.length === 0 && element.textContent.toLowerCase().includes(query)) {
        const regex = new RegExp(`(${query})`, "gi");
        element.innerHTML = element.innerHTML.replace(regex, `<span class="highlight">$1</span>`);
      }
    });
  }
});
