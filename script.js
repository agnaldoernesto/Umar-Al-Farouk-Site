const back = document.getElementById("back"),
  content = document.getElementById("content");
const forms = {
  donation: `<div class="kicker">Apoie o Instituto</div><h2>Contribua para esta causa</h2><p>Escolha como gostaria de ajudar. Este protótipo não recebe pagamentos reais.</p><form id="donform"><div class="field"><label>Nome (opcional)</label><input id="donname" placeholder="O seu nome"></div><div class="field"><label>Forma de apoio</label><select id="dontype"><option>Donativo financeiro</option><option>Material escolar</option><option>Alimentos e bens essenciais</option><option>Voluntariado</option></select></div><div class="field"><label>Valor estimado</label><select id="donamount"><option>Prefiro combinar com o Instituto</option><option>100 MT</option><option>250 MT</option><option>500 MT</option><option>1.000 MT</option><option>Outro valor</option></select></div><button class="btn">Preparar pedido de apoio →</button></form><div class="result" id="donresult"></div><p class="note">Os dados oficiais de pagamento serão adicionados após validação da Direcção.</p>`,
  contact: `<div class="kicker">Contacto</div><h2>Fale com o Instituto</h2><p>Este formulário é demonstrativo e não envia mensagens para um servidor.</p><form id="conform"><div class="field"><label>Nome</label><input id="conname" required placeholder="O seu nome"></div><div class="field"><label>Assunto</label><select id="subject"><option>Informações gerais</option><option>Admissão e educação</option><option>Caridade e donativos</option><option>Eventos</option><option>Voluntariado</option></select></div><div class="field"><label>Mensagem</label><textarea id="message" required placeholder="Escreva a sua mensagem"></textarea></div><button class="btn">Preparar mensagem</button></form><div class="result" id="conresult"></div>`,
  library: `<div class="kicker">Recursos educativos</div><h2>Biblioteca demonstrativa</h2><p>Pesquise os títulos de exemplo.</p><div class="field"><label>Pesquisar livro ou tema</label><input id="booksearch" placeholder="Ex.: Alcorão, leitura, valores..."></div><div class="books" id="books"><div class="book"><b>📗 Alcorão</b>Recurso de estudo religioso</div><div class="book"><b>📘 Língua Portuguesa</b>Leitura e compreensão</div><div class="book"><b>📙 Matemática</b>Exercícios e aprendizagem</div><div class="book"><b>📕 Ética e Valores</b>Educação moral e cívica</div></div><p class="note">Os títulos são ilustrativos; os ficheiros não estão anexados.</p>`,
  results: `<div class="kicker">Área reservada — demonstração</div><h2>Consulta de resultados</h2><p>Não utilize dados pessoais reais nesta demonstração.</p><form id="resform"><div class="field"><label>Código demonstrativo</label><input id="code" required placeholder="Ex.: DEMO001"></div><div class="field"><label>Classe</label><select id="classe"><option>6.ª classe</option><option>7.ª classe</option><option>8.ª classe</option><option>9.ª classe</option><option>10.ª classe</option><option>Outra</option></select></div><button class="btn darkbtn">Consultar demonstração</button></form><div class="result" id="resresult"></div><p class="note">A consulta real exige autenticação segura e ligação à base de dados do Instituto.</p>`,
  news: `<div class="kicker">Notícias & comunicados</div><h2>Arquivo de notícias</h2><p>Filtre os conteúdos demonstrativos por categoria.</p><div class="tabs"><button class="tab active" data-filter="todas">Todas</button><button class="tab" data-filter="educacao">Educação</button><button class="tab" data-filter="caridade">Caridade</button><button class="tab" data-filter="eventos">Eventos</button></div><div id="archive"><div class="book" data-cat="educacao"><b>Educação — início do ano lectivo</b>Informação escolar e comunicados.</div><div class="book" data-cat="caridade"><b>Caridade — campanha de alimentos</b>Formas de apoiar famílias.</div><div class="book" data-cat="eventos"><b>Eventos — palestra sobre valores</b>Actividades e formação comunitária.</div></div><p class="note">Conteúdo a substituir por notícias oficiais.</p>`,
};
function openModal(type) {
  content.innerHTML = forms[type] || forms.contact;
  back.classList.add("show");
  document.body.style.overflow = "hidden";
  if (type === "donation")
    document.getElementById("donform").onsubmit = (e) => {
      e.preventDefault();
      show(
        "donresult",
        `Pedido preparado: ${document.getElementById("donname").value || "Benfeitor"} pretende apoiar com "${document.getElementById("dontype").value}" (${document.getElementById("donamount").value}). Para concluir, contacte a Direcção. Nenhum pagamento foi efectuado.`,
      );
    };
  if (type === "contact")
    document.getElementById("conform").onsubmit = (e) => {
      e.preventDefault();
      show(
        "conresult",
        `Mensagem preparada. Nome: ${document.getElementById("conname").value}. Assunto: ${document.getElementById("subject").value}. Mensagem: ${document.getElementById("message").value}. Esta mensagem não foi enviada.`,
      );
    };
  if (type === "results")
    document.getElementById("resform").onsubmit = (e) => {
      e.preventDefault();
      show(
        "resresult",
        `Consulta simulada para ${document.getElementById("code").value}: esta versão não contém notas reais. A versão final terá de usar autenticação segura.`,
      );
    };
  if (type === "library")
    document.getElementById("booksearch").oninput = (e) =>
      document
        .querySelectorAll("#books .book")
        .forEach(
          (b) =>
            (b.style.display = b.textContent
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
              ? "block"
              : "none"),
        );
  if (type === "news")
    document.querySelectorAll("[data-filter]").forEach(
      (b) =>
        (b.onclick = () => {
          document
            .querySelectorAll("[data-filter]")
            .forEach((x) => x.classList.remove("active"));
          b.classList.add("active");
          document
            .querySelectorAll("[data-cat]")
            .forEach(
              (c) =>
                (c.style.display =
                  b.dataset.filter === "todas" ||
                  c.dataset.cat === b.dataset.filter
                    ? "block"
                    : "none"),
            );
        }),
    );
}
function show(id, text) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.classList.add("show");
}
document
  .querySelectorAll("[data-modal]")
  .forEach((b) => (b.onclick = () => openModal(b.dataset.modal)));
document.querySelectorAll("[data-article]").forEach(
  (b) =>
    (b.onclick = () => {
      content.innerHTML = `<div class="kicker">Notícia demonstrativa</div><h2>${b.dataset.article}</h2><p>Este espaço será utilizado para publicar a notícia completa, fotografias autorizadas, data e informações úteis do Instituto.</p><button class="btn" onclick="closeModal()">Fechar notícia</button>`;
      back.classList.add("show");
      document.body.style.overflow = "hidden";
    }),
);
function closeModal() {
  back.classList.remove("show");
  document.body.style.overflow = "";
}
document.getElementById("close").onclick = closeModal;
back.onclick = (e) => {
  if (e.target === back) closeModal();
};
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
document.getElementById("hamb").onclick = () =>
  document.getElementById("links").classList.toggle("open");
document
  .querySelectorAll("#links a")
  .forEach(
    (a) =>
      (a.onclick = () =>
        document.getElementById("links").classList.remove("open")),
  );
document.getElementById("subscribe").onsubmit = (e) => {
  e.preventDefault();
  document.getElementById("submsg").textContent =
    "Obrigado! A subscrição foi simulada; ainda não foi guardada num servidor.";
  document.getElementById("email").value = "";
};
