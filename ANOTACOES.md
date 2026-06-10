# Anotações — Projeto 01: Todo List

> Não copie da documentação.
> Escreva com suas palavras — como explicaria para um amigo.
> Se não consegue explicar, ainda não entendeu.

---

## Conceito: addEventListener

**O que é:**

O `addEventListener` é um método que pendura uma função num elemento do DOM. Você diz: "quando esse botão for clicado, execute essa função". Ele recebe dois argumentos: o tipo de evento (`'click'`, `'keydown'`, `'submit'`) e a função que roda quando o evento acontece — o callback. O navegador fica de olho e dispara o callback no momento certo. Dá para usar no mesmo elemento quantas vezes quiser, para eventos diferentes, sem sobrescrever.

**Por que usei nesse projeto:**

Precisei reagir a três ações do usuário: clicar no botão "adicionar" (chama `addTask`), pressionar Enter no input (também chama `addTask`) e, futuramente, clicar nos botões de filtro e no checkbox de cada tarefa. Sem `addEventListener`, o JS ficaria mudo — não saberia quando o usuário interagiu com a página.

**Exemplo que escrevi:**
```javascript
addBtn.addEventListener('click', (e) => {
  e.preventDefault()
  addTask()
})

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') return addTask()
})
```

**O que me confundiu:**

A diferença entre evento `click` no botão e evento `submit` do formulário. O botão é `type="submit"` dentro de um `<form>`, então clicar nele dispara os dois. Se eu só trato o click e não chamo `preventDefault`, a página recarrega e perco tudo. Também confundi o Enter do input: ele dispara submit no form, não um click no botão — por isso tratei com `keydown` direto no input.

**Como explico para alguém:**

Imagina uma campainha. O `addEventListener` é você instalar a campainha na porta (elemento) e programar o que acontece quando tocam (evento): acender uma luz, travar a porta, tocar uma música. Você pode ter várias campainhas na mesma porta, cada uma com uma função diferente. O navegador é o porteiro que fica ouvindo e avisa quando alguém aperta.

---

## Conceito: Array — push / filter / find

**O que é:**

`push` adiciona um item no final do array e devolve o novo tamanho. `filter` percorre o array, testa cada item com uma função e devolve um **array novo** só com os que passaram no teste — o array original não muda. `find` também percorre e testa, mas devolve o **primeiro item** que passa (ou `undefined` se nenhum passar), não um array.

**Por que usei nesse projeto:**

- `push` para adicionar uma tarefa nova ao array `tasks` depois de ler o input.
- `filter` para remover uma tarefa: crio um array novo sem o `id` que quero excluir e atribuo de volta a `tasks`.
- `find` está planejado para o `toggleTask`: localizar a tarefa pelo `id` e inverter `done`.

**Exemplo que escrevi:**
```javascript
// push — adiciona ao final
tasks.push({ id: Date.now(), text: 'Estudar JS', done: false })

// filter — remove pelo id
tasks = tasks.filter(task => task.id !== idParaRemover)

// find — acha a tarefa para marcar como concluída
const task = tasks.find(t => t.id === idAlvo)
if (task) task.done = !task.done
```

**O que me confundiu:**

`filter` não altera o array original — ele fabrica um novo. No começo eu escrevia `tasks.filter(...)` e esperava que `tasks` tivesse mudado sozinho. Precisei entender que **preciso reatribuir** (`tasks = tasks.filter(...)`) para o estado refletir a remoção. Também confundi `find` com `filter`: `find` devolve o objeto, `filter` devolve um array (mesmo que com um só item).

**Como explico para alguém:**

Pensa num fichário. `push` é colocar uma ficha nova no fim da pilha. `filter` é folhear todas as fichas, separar as que interessam e guardar numa pilha nova — a pilha original continua igual. `find` é folhear até achar a primeira ficha que combina com o que você procura e puxar só ela. `push` modifica o original; `filter` e `find` só leem.

---

## Conceito: createElement e appendChild

**O que é:**
O metodo createElement monta as peças do meu HTML como se fosse um lego, esse metodo do JavaScript é como se disse ao navegador para fabricar uma nova peça para o meu HTML, que ficará armazenada na memoria. 
O metodo appendChild adciona um nó no elemento pai especificado. E ele que forma a estrutura de arvore do DOM inserindo um elemento dentro do outro seguindo a regra filho -> pai. É como pegar partes menores e inserir em caixas maiores.  

**Por que usei nesse projeto:**
Para criar e a estrutura de uma lista eu precisei criar os elementos individualmente e depois junta-los em uma estrutura parecida com o meu HTML, essa lista está montada como um quebra cabeça ou uma arvore genealogica. 

Para criar cada pedaço da minha lista com a tarefa, que possui varios elementos que não estão no meu HTML estatico. Uso esse metodo para criar cada elemento de forma individual e com o metodo appendChild juntar todos. 

**Exemplo que escrevi:**
```javascript
const li = document.createElement('li')
  li.className = 'task-item'
  li.setAttribute('data-status', task.done ? 'completed' : 'active')

  const label = document.createElement('label')
  label.className = 'task-checkbox'

```

**O que me confundiu:**
Como construir a arvore do DOM com esse metodo, onde cada nó deveria ser inserido.


**Como explico para alguém:**
Esses dois metodos funcionam como uma montadora de carros: o createElement cria as peças do carro e appedChild monta as peças para formar o carro. 
---

## Conceito: localStorage

**O que é:**

O `localStorage` é um armário no navegador que guarda dados como texto (chave-valor) e **persiste** mesmo depois de fechar a aba ou reiniciar o computador. Diferente de variáveis no JS, que somem no reload da página. Ele só aceita strings — para guardar objetos ou arrays, preciso converter com `JSON.stringify` na hora de salvar e `JSON.parse` na hora de ler.

**Por que usei nesse projeto:**

Sem `localStorage`, cada vez que a página recarrega, o array `tasks` volta a ser `[]` vazio — perco tudo que o usuário digitou. Com ele, salvo as tarefas em disco e, ao abrir a página, carrego de volta para o array antes de renderizar.

**Exemplo que escrevi:**
```javascript
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks() {
  const saved = localStorage.getItem('tasks')
  if (saved) {
    tasks = JSON.parse(saved)
  }
}
```

**O que me confundiu:**

Esquecer o `JSON.stringify` na gravação faz o navegador chamar `.toString()` no array, salvando `"[object Object],[object Object]"` — lixo. Esquecer o `JSON.parse` na leitura devolve uma string, não um array utilizável. Também precisei tratar o caso da primeira visita, quando `getItem` retorna `null` porque a chave ainda não existe — se eu fizer `JSON.parse(null)` dá erro.

**Como explico para alguém:**

É uma gaveta do navegador com etiquetas. Você escreve um papel, coloca na gaveta com uma etiqueta (`setItem('tasks', ...)`) e fecha. Amanhã você abre a gaveta, lê a etiqueta e pega o papel de volta (`getItem('tasks')`). Só que a gaveta só guarda texto — se você quer guardar uma lista de compras (array/objeto), precisa tirar uma foto da lista (`stringify`) antes de guardar e depois revelar a foto (`parse`) para ler.

---

## Resumo — Dificuldades na Versão 1 (render e debug)

> Sessão de implementação do `renderTasks`, `createTaskElement` e listeners.
> Data: 02/06/2026

### O que estava certo desde cedo

- Montar cada tarefa com `createElement` + `appendChild` seguindo a árvore do HTML.
- Centralizar o estado em `tasks` e usar `renderTasks()` para redesenhar a tela.
- Limpar o `taskList` antes de renderizar de novo (`replaceChildren`).

### O que mais me travou

**1. Dado vs elemento na tela**

O array `tasks` guarda **objetos** (`{ id, text, done }`). O `appendChild` só aceita **nós do DOM** (`<li>`, etc.). No `forEach`, eu estava tentando colocar o objeto direto na lista — a lógica do loop estava ok, mas faltava passar cada item por `createTaskElement` antes de anexar.

**2. Empty state e `replaceChildren`**

Quando o empty state ficava fixo dentro do `<ul>`, o `replaceChildren()` apagava ele junto com as tarefas. Tentei criar a mensagem vazia do zero (boa ideia), mas no começo montava o elemento e **não anexava** no `taskList`. Depois corrigi: limpar → se vazio, criar e colocar a mensagem → senão, criar cada `<li>`.

**3. Formulário com `type="submit"`**

O botão “adicionar” está dentro de um `<form>`. Mesmo com `addTask()` funcionando, a página podia **recarregar** e zerar tudo — parecia que o input “limpava” sozinho, mas era reload. Precisei de `preventDefault` no fluxo do submit/clique (e lembrar que Enter no input também dispara submit).

**4. Erros em cascata no topo do arquivo**

Placeholders incompletos (`const statTotal = /* seu código */`) quebravam a **sintaxe** do script inteiro. O erro aparecia em outra linha (`let tasks`), mas a causa era **acima**. Comentei o que ainda não implementei em vez de deixar `=` sem valor.

**5. Variável comentada, uso ativo**

Comentei `filters` no topo, mas o `filters.addEventListener(...)` no final continuava rodando → `ReferenceError` → o script **parava antes** do `init()`. Resultado: `renderTasks()` nem rodava ao carregar a página.

**6. Debug “cego” no DevTools**

O Console estava **filtrado** (ex.: por `localStorage`). Meus `console.log` não apareciam e parecia que nada executava. Limpar o filtro foi essencial para ver erros reais.

### Lições que quero guardar

| Situação | O que checar primeiro |
|----------|------------------------|
| Lista vazia na tela | Console sem filtro → erros ao carregar → `#taskList` no Elements |
| Input limpa, nada renderiza | Página recarrega? Script chegou no `init()`? |
| Erro em linha “estranha” | Olhar declarações **incompletas** algumas linhas acima |
| Comentei uma variável | Comentar também **todos os usos** dela, ou definir de verdade |

### Pendências que ainda vi no código

- `uuidv4()` usado no `addTask`, mas função não definida no arquivo (roteiro sugere `Date.now()` na V1).
- `formError` selecionado por id, mas elemento ainda não existe no HTML.
- Botão excluir criado no DOM, mas sem listener chamando `removeTask`.
- `filters` com `getElementsByClassName` retorna **coleção**, não um elemento único — pode afetar o listener na V4.

---

## Conceito: classList.toggle vs setAttribute

**O que é:**

`classList.toggle('classe', condicao)` adiciona ou remove uma classe CSS com base num booleano — se a condição for `true`, a classe entra; se for `false`, sai. Já `setAttribute` sobrescreve qualquer atributo HTML (como `data-status`), mas não mexe nas classes.

**Por que usei nesse projeto:**

Precisava que o `<li>` ganhasse a classe `completed` quando `task.done` fosse `true`, porque o CSS usa `.task-item.completed` para riscar o texto e mudar a opacidade. No começo usei `setAttribute('data-status', ...)`, mas o CSS não lê atributo customizado — ele lê classe. `classList.toggle('completed', task.done)` resolveu.

**O que me confundiu:**

Achar que qualquer diferença no HTML (classe, atributo, data-) teria o mesmo efeito visual. Na verdade o CSS é seletivo: ele só enxerga o que está escrito nos seletores dele. Colocar info num atributo que o CSS não consulta é como escrever um bilhete e guardar no bolso em vez de colocar no quadro.

**Como explico para alguém:**

O CSS é um segurança na porta de uma balada. Ele olha a roupa (classe) pra decidir quem entra. Se você colocar a informação numa credencial (data-status) que o segurança não foi treinado pra ler, ele ignora. `classList.toggle` é trocar a roupa do elemento; `setAttribute` é pendurar um crachá que ninguém vai conferir.

---

## Conceito: find() retorna o objeto, não modifica

**O que é:**

`find()` percorre o array e **devolve** o primeiro objeto que satisfaz a condição. Só devolve — não altera nada. Se você quer modificar o objeto, precisa pegar o retorno numa variável e depois alterar a propriedade manualmente.

**Por que usei nesse projeto:**

No `toggleTask`, preciso localizar a tarefa pelo `id` e inverter o `done`. `find()` me dá o objeto; depois eu faço `task.done = !task.done` para modificar.

**Exemplo que escrevi:**
```javascript
const task = tasks.find(t => t.id === id)
if (task) task.done = !task.done
```

**O que me confundiu:**

Tentei fazer tudo numa linha: `tasks.find(task => task.id === id ? !task.done : task.done)`. O `find` espera um booleano como retorno do callback — ele usou o resultado do ternary (`true`/`false`) como critério de busca, não como operação de modificação. Também achei que `find` por si só alterava o array, mas ele só lê.

**Como explico para alguém:**

`find` é um localizador de arquivos: ele te leva até a pasta certa e aponta pro documento. Ele não abre o documento e não rabisca nada. Você precisa pegar o documento (`const task = ...`) e canetar você mesmo (`task.done = !task.done`).

---

## Conceito: return prematuro interrompe o fluxo

**O que é:**

`return` dentro de uma função encerra a execução naquela linha — nada depois dela roda.

**Por que usei nesse projeto:**

No `toggleTask`, depois de achar a tarefa e inverter `done`, preciso chamar `renderTasks()` e `updateStats()` para a tela refletir a mudança.

**O que me confundiu:**

Escrevi `if(marktask) return marktask.done = !marktask.done`. O `return` fez a função terminar ali — as chamadas de `renderTasks()` e `updateStats()` que vinham depois nunca executavam. O toggle acontecia no objeto, mas a interface nunca atualizava.

**Como explico para alguém:**

`return` é como sair da sala batendo a porta. Se você bate a porta no meio do serviço (depois de trocar a lâmpada mas antes de ligar o interruptor), a pessoa na sala não vê a luz acender. O trabalho está feito, mas ninguém sabe.

---

## Conceito: DOM selectors — querySelector vs getElementById

**O que é:**

`getElementById('nome')` é direto: acha o elemento pelo `id`. `querySelector('[all]')` busca um elemento que tenha **atributo** `all` — não um `id`, não uma classe. A sintaxe `[atributo]` é um seletor de atributo CSS, não de ID. Atributo `all` não existe em HTML padrão.

**Por que usei nesse projeto:**

Preciso selecionar os spans do footer que vão exibir total, pendentes e concluídas.

**O que me confundiu:**

Usei `document.querySelector('[all]')` pensando que encontraria algo, mas não existia nenhum elemento com atributo `all` no HTML — `data-filter="all"` é um atributo diferente (`data-filter`, não `all`). O correto era dar `id`s únicos para cada span e usar `getElementById`.

**Como explico para alguém:**

`querySelector('[all]')` é como gritar "ALL!" num estádio lotado — ninguém tem esse nome. `getElementById` é como ligar pro número do celular da pessoa: você tem o contato certo e acha na hora.

---

## Conceito: IDs HTML devem ser únicos

**O que é:**

O atributo `id` no HTML é como um CPF — não podem existir dois elementos com o mesmo valor. Se repetir, o navegador só reconhece o primeiro; `getElementById` retorna sempre o primeiro, e os outros ficam inacessíveis por ID.

**Por que usei nesse projeto:**

Precisava de três spans no footer para exibir total, pendentes e concluídas.

**O que me confundiu:**

Coloquei três spans com `id="taskCount"` — todos iguais. O JS só conseguia selecionar o primeiro. Os outros dois pareciam "invisíveis" pro código. Depois entendi que cada span precisava de um identificador único: `totalTask`, `activeTask`, `completedTask`.

**Como explico para alguém:**

ID duplicado é como duas pessoas com o mesmo número de matrícula na escola. A secretária (navegador) sempre acha a primeira e ignora as outras — mesmo que tenham nomes diferentes, o número é o mesmo, então não dá pra diferenciar.

---

## Conceito: render — estado vs DOM

**O que é:**

O **estado** (`tasks`) é o que o programa lembra. O **DOM** é o que o usuário vê. `renderTasks()` é a ponte: lê o estado e reconstrói a interface.

**Por que usei nesse projeto:**

Cada vez que adiciono ou removo tarefa, não mudo o HTML manualmente — atualizo o array e chamo `renderTasks()` para sincronizar a tela.

**O que me confundiu:**

Achar que o array sozinho já apareceria na lista; confundir “limpar o input” com “renderizar com sucesso”; achar que erro em `tasks` era culpa de `tasks`.

**Como explico para alguém:**

O array é a memória; o `<ul>` é o quadro. O render apaga o quadro e desenha de novo com base na memória.

---

## Conceito: debugging no navegador

**O que é:**

Usar Console, Elements e Sources para ver se o JS carregou, se o array tem dados e se os nós existem no DOM.

**Por que usei nesse projeto:**

A lógica parecia certa, mas nada aparecia — o problema estava fora do `renderTasks` (script quebrando antes do `init`, form recarregando, filtro escondendo logs).

**O que me confundiu:**

Console vazio ≠ código correto. Rodapé com “3 tarefas restantes” é HTML estático, não prova que o JS atualizou nada.

**Como explico para alguém:**

Antes de mexer no render, confirmo: script carregou? `tasks` tem itens? `#taskList` tem filhos no Elements?

---

## Conceito: replaceChild — substituir elemento no DOM

**O que é:**

`replaceChild` é o método que troca um filho por outro dentro de um elemento pai. Ele recebe dois argumentos: primeiro o elemento **novo** (que vai entrar), depois o elemento **velho** (que vai sair). O pai continua o mesmo — só o filho especificado é substituído. Os outros filhos permanecem intactos. Para achar o pai de qualquer elemento, uso `elemento.parentNode`.

**Por que usei nesse projeto:**

Na edição inline, precisei transformar o `<span class="task-text">` em um `<input>` no mesmo lugar da árvore. Se eu usasse `appendChild`, o input ia para o final do `<li>` e o span velho ficava lá sobrando. Com `replaceChild`, o span sai e o input entra no mesmo ponto — o checkbox e os botões continuam onde estavam. Também usei para desfazer a troca no Escape: `replaceChild` de volta, input sai, span original retorna.

**Exemplo que escrevi:**
```javascript
// Abrir edição — troca span por input
const listaPai = textEl.parentNode
listaPai.replaceChild(newInput, textEl)

// Cancelar edição — troca input por span de volta
listaPai.replaceChild(textEl, newInput)
```

**O que me confundiu:**

A ordem dos parâmetros: o **novo** vem antes do **velho**. No começo inverti e nada funcionava. Também confundi `replaceChild` com `replaceChildren`: o primeiro troca um filho específico, o segundo limpa **todos** os filhos de uma vez (que eu já usava no `renderTasks`).

**Como explico para alguém:**

Imagina um porta-retratos com 3 fotos lado a lado. `replaceChild` é você tirar a foto do meio e colocar outra no mesmo lugar — as fotos das pontas continuam lá. `replaceChildren` é você tirar todas as fotos de uma vez e colocar uma nova coleção inteira. O pai (a moldura) não muda.

---

## Conceito: map() e spread operator

**O que é:**

`map()` é irmão do `filter()` e do `find()`. Ele percorre cada item do array e devolve um **array novo do mesmo tamanho**, onde cada item foi transformado pela função que você passa. O array original não é modificado — você precisa **reatribuir** (`tasks = tasks.map(...)`), igual no `filter`. 

O spread operator (`...objeto`) "espalha" todas as propriedades de um objeto dentro de outro. `{...task, text: 'novo'}` significa: crie um objeto novo com todas as propriedades de `task`, mas sobrescreva `text` com o valor novo.

**Por que usei nesse projeto:**

No `saveEdit`, precisei atualizar o texto de uma tarefa específica dentro do array. Usei `map` para percorrer todas: se o `id` bate, crio uma cópia com `text` novo (`{...task, text: novoTexto}`); se não bate, mantenho a tarefa igual (`task`). Depois reatribuí a `tasks`. Sem o spread, eu teria que copiar propriedade por propriedade manualmente.

**Exemplo que escrevi:**
```javascript
tasks = tasks.map(task => task.id === id ? {...task, text: novoTexto} : task)
```

**O que me confundiu:**

Achar que `map` modificava o array original — mesmo erro que cometi com `filter` no começo. O `map` fabrica um array novo; sem o `tasks =` na frente, o resultado é perdido. Também errei a condição do ternário: escrevi `task.id !== id` em vez de `task.id === id`, atualizando a tarefa errada. E na primeira tentativa usei `task.text = novoTexto` dentro do ternário — isso retorna a string, não o objeto, corrompendo o array.

**Como explico para alguém:**

`map` é como pegar um fichário, xerocar cada ficha, e em algumas você rabisca por cima da xerox antes de guardar num fichário novo. O fichário original permanece intocado. O spread (`...`) é como tirar uma xerox perfeita da ficha e depois escrever por cima só o campo que mudou.

---

## Conceito: variável de estado para controlar fluxo (editingId)

**O que é:**

Uma variável de estado é uma "lembrança" centralizada que diz em que situação o programa está. No caso, `editingId` guarda qual tarefa está com a edição aberta (ou `null` se nenhuma). Ela funciona como uma trava: antes de abrir uma edição, verifico `if(editingId === null)` — se já tiver alguém editando, não permite abrir outra. Toda vez que a edição termina (salvar, cancelar, ou operação que reconstrói a tela), preciso setar de volta para `null`.

**Por que usei nesse projeto:**

Sem essa trava, o usuário podia clicar no ✎ de várias tarefas ao mesmo tempo — cada clique criava um input novo, os spans iam sumindo, virava uma bagunça. Com `editingId`, a segunda tentativa de edição é simplesmente ignorada até a primeira terminar. Também precisei lembrar de resetar no `addTask`: se o usuário adiciona uma tarefa enquanto edita outra, o `renderTasks` destrói o input, mas o `editingId` continuava com o valor antigo — travava todas as edições futuras.

**Exemplo que escrevi:**
```javascript
let editingId = null

function editTask(id, textEl) {
  if(editingId === null) {
    editingId = id
    // ... cria input, substitui span ...
  }
}

function saveEdit(id, input) {
  // ... salva ...
  editingId = null
}

// No Escape: editingId = null
// No addTask: editingId = null
```

**O que me confundiu:**

Esquecer de resetar o `editingId` em algum caminho de saída. O fluxo de edição tem várias saídas: Enter (salva), Escape (cancela), adicionar tarefa (re-render destrói). Se eu esqueço de setar `null` em qualquer uma delas, a edição "trava" e o usuário não consegue editar mais nada até recarregar a página. Também inverti a condição na primeira tentativa: escrevi `if(editingId !== null)` — permitindo editar só quando já tinha alguém editando, o oposto do correto.

**Como explico para alguém:**

É como a trava de um banheiro químico: ou está `null` (livre) ou tem um `id` (ocupado por alguém). Você só entra se estiver `null`. Quando sai, precisa destrancar — se esquecer, ninguém mais entra. E se alguém der descarga no prédio inteiro (`addTask` com `renderTasks`), você também precisa destrancar, senão a trava fica presa para sempre.

---

## Conceito: dataset

**O que é:**

O `dataset` é uma propriedade de um elemento do DOM que dá acesso a todos os atributos `data-*` daquele elemento. Quando eu escrevo `data-filter="active"` no HTML, o JavaScript enxerga isso como `elemento.dataset.filter`. Cada elemento tem o seu próprio `dataset` — não tem nada a ver com o pai ou os filhos.

**Por que usei nesse projeto:**

Os três botões de filtro fazem coisas muito parecidas — só muda o valor do filtro. Se eu usasse `id`, precisaria de três listeners diferentes ou três `if`s com strings fixas. Com `data-filter`, os três botões têm o mesmo atributo com valores diferentes, e o código trata todos do mesmo jeito: lê `dataset.filter` e pronto.

**Exemplo que escrevi:**
```javascript
if(e.target.dataset.filter) setFilter(e.target.dataset.filter)
```

**O que me confundiu:**

Achei que `dataset` buscava atributos no container pai, mas não — o `dataset` é da tag que contém o atributo `data-`. Quem busca nos filhos é o event delegation (outro conceito).

**Como explico para alguém:**

`dataset` é o RG do elemento. Cada elemento tem o seu próprio RG com os dados que eu escrevi no HTML com `data-`. Não é o RG da família inteira, é individual.

---

## Conceito: classList.add vs className

**O que é:**

`className` sobrescreve todas as classes de uma vez — se o elemento tinha `filter-btn active` e eu faço `className = 'active'`, a classe `filter-btn` some junto. Já `classList.add('active')` adiciona a classe sem apagar as que já existem. O mesmo vale para `classList.remove()`.

**Por que usei nesse projeto:**

No `setFilter`, precisei remover a classe `active` de todos os botões e adicionar só no clicado. Se usasse `className = 'active'`, o botão perdia a classe `filter-btn` e todo o estilo base (borda, padding, cor, transição) sumia — o botão ficava pelado.

**O que me confundiu:**

Na primeira tentativa escrevi `btn.className = 'active'` e os botões quebraram visualmente. Depois entendi que `className` é um trator que arrasa tudo e planta uma classe só, enquanto `classList.add` é um jardineiro que planta sem arrancar o que já estava lá.

**Como explico para alguém:**

`className` é trocar a roupa inteira — tira tudo e veste uma peça só. `classList.add` é colocar um casaco por cima do que já está vestindo.

---

## Conceito: Event delegation

**O que é:**

Event delegation é colocar um único listener no elemento pai e deixar o clique "borbulhar" dos filhos até ele. Quando qualquer filho é clicado, o evento sobe e o pai captura. Aí eu uso `e.target` para saber qual filho específico foi clicado.

**Por que usei nesse projeto:**

Em vez de colocar um `addEventListener` em cada um dos três botões de filtro, coloquei um só no `<nav class="filters">`. Quando o usuário clica em qualquer botão filho, o evento sobe, o listener do container dispara, e eu leio `e.target.dataset.filter` para saber qual botão específico foi.

**O que me confundiu:**

A diferença entre `e.target` (o elemento que recebeu o clique, mesmo que seja filho) e `e.currentTarget` (o elemento que tem o listener, o pai). Para ler o `data-filter`, eu preciso do `e.target` — o elemento clicado.

**Como explico para alguém:**

É como procurar um apartamento com o endereço e número certo, em vez de sair batendo porta por porta. O porteiro (container) sabe quem entrou e me avisa — eu não preciso vigiar cada porta individualmente.

---

## Conceito: Filtrar sem modificar o array original

**O que é:**

Quando o usuário troca o filtro, eu não posso modificar o array `tasks` original. Em vez disso, o `getFilteredTasks()` devolve um array novo com `filter()`, e o `renderTasks()` usa esse array novo para desenhar a tela. O `tasks` continua intacto com todas as tarefas.

**Por que usei nesse projeto:**

Se eu fizesse `tasks = tasks.filter(...)`, as tarefas que não passassem no filtro sumiriam **para sempre** do array. Quando o usuário voltasse para "Todas", elas não existiriam mais. O `tasks` é a fonte da verdade — guarda tudo. O filtro só decide o que aparece na tela naquele momento.

**O que me confundiu:**

No começo achei que filtrar e atribuir de volta (`tasks = tasks.filter(...)`) era a mesma coisa que só renderizar o filtro. Depois entendi que um destrói os dados e o outro só muda a visualização.

**Como explico para alguém:**

O array `tasks` é o arquivo morto com todos os documentos. O filtro é um funcionário que tira xerox só dos documentos que interessam e coloca na mesa. O arquivo morto continua completo — se amanhã o filtro mudar, é só tirar xerox de outros documentos. Mas se o funcionário rasgar os originais que não interessam naquele momento (filtrar o array original), já era.

---

<!-- Adicione um bloco para cada conceito novo que encontrar -->