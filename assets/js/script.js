// Busca simples: destaca no conteúdo da página o termo pesquisado.
document.getElementById("search-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Impede o recarregamento da página
  const query = document.getElementById("search-input").value.trim().toLowerCase();

  // Remove destaques de uma busca anterior
  document.querySelectorAll("mark.search-highlight").forEach((mark) => {
    const parent = mark.parentNode;
    parent.replaceChild(document.createTextNode(mark.textContent), mark);
    parent.normalize();
  });

  if (!query) return;

  let firstMatch = null;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    // Ignora scripts, estilos e o próprio campo de busca
    if (node.parentElement.closest("script, style, nav")) continue;
    if (node.nodeValue.toLowerCase().includes(query)) textNodes.push(node);
  }

  textNodes.forEach((node) => {
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const span = document.createElement("span");
    span.innerHTML = node.nodeValue.replace(regex, '<mark class="search-highlight">$1</mark>');
    if (!firstMatch) firstMatch = span;
    node.parentNode.replaceChild(span, node);
  });

  // Leva o usuário até a primeira ocorrência encontrada
  if (firstMatch) {
    firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});
