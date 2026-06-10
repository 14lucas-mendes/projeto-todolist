# Log de Erros — Projeto 01: Todo List

> Registre cada erro encontrado, mesmo os simples.
> Esse arquivo é seu histórico de evolução real.
> Não pule esse passo — ele é parte do aprendizado.

---

## Erro 001

**Data:** 02/06/2026
**Versão:** V1

**O que tentei fazer:**

Renderizar as tarefas no `forEach` dentro de `renderTasks()`.

**O que aconteceu:**

Nada aparecia na lista (ou comportamento estranho no DOM).

**O que eu achei que era:**

Problema no `forEach` ou no `appendChild`.

**O que realmente era:**

Estava passando o **objeto** `task` do array direto para o `appendChild`. O DOM espera um **elemento** (`<li>`), não dados JavaScript.

**Como resolvi:**

Passei cada `task` por `createTaskElement(task)` e anexei o `<li>` retornado.

**Conceito envolvido:**

Estado (objeto) vs DOM (nó HTML); `createElement` / `appendChild`.

**Vou lembrar que:**

`push` no array ≠ item visível na tela. Sempre converter dado → elemento antes de anexar.

---

## Erro 002

**Data:** 02/06/2026
**Versão:** V1

**O que tentei fazer:**

Mostrar mensagem de lista vazia (`emptyState`) dentro do `taskList`.

**O que aconteceu:**

A mensagem sumia ou nunca aparecia depois do render.

**O que eu achei que era:**

Problema no `if (tasks.length === 0)`.

**O que realmente era:**

Duas causas: (1) `replaceChildren()` apagava o empty state fixo do HTML; (2) ao criar a mensagem dinamicamente, montava a `div` mas **não anexava** no `taskList`.

**Como resolvi:**

Passar a criar o empty state do zero após limpar a lista e **anexar** no `taskList` quando `tasks` estiver vazio.

**Conceito envolvido:**

`replaceChildren`, hierarquia pai/filho no DOM.

**Vou lembrar que:**

Criar elemento ≠ colocar na página. Todo nó precisa chegar até um pai que está no documento.

---

## Erro 003

**Data:** 02/06/2026
**Versão:** V1

**O que tentei fazer:**

Adicionar tarefa pelo botão “adicionar”.

**O que aconteceu:**

O input limpava, mas a lista continuava vazia após clicar.

**O que eu achei que era:**

`addTask` ou `renderTasks` com lógica errada.

**O que realmente era:**

O botão é `type="submit"` dentro de um `<form>`. A página **recarregava** após o clique, resetando `tasks` para `[]`.

**Como resolvi:**

Adicionar `preventDefault` no listener (e tratar também o submit/Enter do formulário).

**Conceito envolvido:**

Comportamento padrão de formulários HTML; eventos `click` vs `submit`.

**Vou lembrar que:**

Input que limpa sozinho pode ser reload, não sucesso do JS.

---

## Erro 004

**Data:** 02/06/2026
**Versão:** V1

**O que tentei fazer:**

Comentar variáveis ainda não usadas (`statTotal`, etc.) no topo do script.

**O que aconteceu:**

O editor mostrava erro na linha `let tasks = []` (`,` expected).

**O que eu achei que era:**

Problema na variável `tasks`.

**O que realmente era:**

Erro **em cascata**: `const statTotal = /* seu código */` deixava uma declaração **incompleta** (sintaxe inválida). O parser quebrava antes e reportava erro na linha seguinte.

**Como resolvi:**

Comentar a linha inteira ou completar a declaração — nunca deixar `=` sem valor.

**Conceito envolvido:**

Parsing JavaScript; erros de sintaxe que “descem” para linhas abaixo.

**Vou lembrar que:**

Se o erro parece absurdo, olhar algumas linhas **acima**.

---

## Erro 005

**Data:** 02/06/2026
**Versão:** V1

**O que tentei fazer:**

Corrigir o erro do `statTotal` comentando variáveis do topo.

**O que aconteceu:**

Novo erro na linha 328: `filters.addEventListener(...)`. Lista ainda não renderizava ao abrir a página.

**O que eu achei que era:**

Problema no listener de filtros ou no `addEventListener`.

**O que realmente era:**

`filters` estava **comentado** no topo, mas o listener no final do arquivo ainda usava `filters` → `ReferenceError: filters is not defined` → script **parava** antes de `init()` → `renderTasks()` nunca rodava no carregamento.

**Como resolvi:**

Ou definir `filters` de verdade (selecionar o `<nav class="filters">`), ou comentar o bloco do listener até a Versão 4.

**Conceito envolvido:**

Ordem de execução do script; variável declarada vs variável usada.

**Vou lembrar que:**

Comentar a declaração não comenta o uso. Se o script quebra no meio, tudo **depois** (incluindo `init()`) não roda.

---

## Erro 006

**Data:** 02/06/2026
**Versão:** V1

**O que tentei fazer:**

Debugar com `console.log(tasks)` e `console.log(taskList)`.

**O que aconteceu:**

Console parecia vazio; difícil saber se o código executava.

**O que eu achei que era:**

Logs não estavam no lugar certo ou JS não rodava.

**O que realmente era:**

O Console do DevTools estava com **filtro ativo** (ex.: `localStorage`), escondendo mensagens que não continham esse termo.

**Como resolvi:**

Limpar o filtro do Console e recarregar a página antes de concluir qualquer diagnóstico.

**Conceito envolvido:**

DevTools Console; filtros de log.

**Vou lembrar que:**

Console vazio com filtro ≠ código silencioso. Sempre checar filtros e níveis antes de debugar.

---

## Erro 007

**Data:** 02/06/2026
**Versão:** V1

**O que tentei fazer:**

Validar se a aplicação estava funcionando olhando o rodapé.

**O que aconteceu:**

Rodapé mostrava “3 tarefas restantes” com a lista visualmente vazia.

**O que eu achei que era:**

Contador funcionando, render falhando.

**O que realmente era:**

O texto “3 tarefas restantes” é **HTML estático** no `index.html`. `updateStats()` ainda não implementado — não refletia o array `tasks`.

**Como resolvi:**

Passar a confiar no Console, no Elements (`#taskList`) e no array `tasks`, não no texto fixo do HTML.

**Conceito envolvido:**

HTML estático vs DOM atualizado por JavaScript.

**Vou lembrar que:**

Se o JS não rodou ou não atualizou aquele nó, o HTML inicial continua mentindo na tela.

---

## Erro 008

**Data:** 06/06/2026
**Versão:** V2

**O que tentei fazer:**

Inverter `task.done` dentro do `toggleTask` usando `find()`.

**O que aconteceu:**

Nada mudava — a tarefa continuava com o mesmo status.

**O que eu achei que era:**

Problema no `find` ou no `if`.

**O que realmente era:**

Escrevi `tasks.find(task => task.id === id ? !task.done : task.done)`. O `find()` espera que o callback retorne `true`/`false` para localizar o item — ele usou o resultado do ternary como critério de busca, não como operação de modificação. Nenhuma propriedade foi alterada.

**Como resolvi:**

Separei em dois passos: (1) `const task = tasks.find(t => t.id === id)` para localizar, (2) `if (task) task.done = !task.done` para modificar.

**Conceito envolvido:**

`find()` é somente leitura; retorna o objeto, não o modifica.

**Vou lembrar que:**

`find` localiza, não transforma. São dois passos: achar e depois alterar.

---

## Erro 009

**Data:** 06/06/2026
**Versão:** V2

**O que tentei fazer:**

Fazer o `toggleTask` atualizar a tela depois de inverter o `done`.

**O que aconteceu:**

O objeto era alterado (confirmado no console), mas a lista visual e os contadores nunca mudavam.

**O que eu achei que era:**

Problema no `renderTasks` ou no `updateStats`.

**O que realmente era:**

Tinha um `return` antes das chamadas: `if(marktask) return marktask.done = !marktask.done`. O `return` encerrava a função antes de `renderTasks()` e `updateStats()` rodarem.

**Como resolvi:**

Removi o `return` — deixei só a atribuição e as chamadas depois.

**Conceito envolvido:**

`return` interrompe a execução da função imediatamente.

**Vou lembrar que:**

`return` antes do fim da função bloqueia tudo que vem depois. Só usar quando realmente quiser encerrar ali.

---

## Erro 010

**Data:** 06/06/2026
**Versão:** V2

**O que tentei fazer:**

Filtrar tarefas concluídas e pendentes dentro do `updateStats`.

**O que aconteceu:**

Os dois contadores mostravam o mesmo número.

**O que eu achei que era:**

Problema na lógica de exibição ou nas variáveis do DOM.

**O que realmente era:**

Usei o mesmo filtro para as duas variáveis: `const completed = tasks.fill(task => !task.done)`. Primeiro, `fill()` não aceita callback — é um método que preenche/substitui valores, não filtra. Segundo, mesmo depois de trocar para `filter()`, usei `!task.done` nas duas, então ambas contavam tarefas pendentes.

**Como resolvi:**

Troquei `fill()` por `filter()` e ajustei o segundo filtro para `task.done` (sem o `!`).

**Conceito envolvido:**

`fill()` vs `filter()`; lógica de condição booleana.

**Vou lembrar que:**

`fill()` não filtra — ela preenche. E prestar atenção se os dois filtros não estão iguais quando deveriam ser opostos.

---

## Erro 011

**Data:** 06/06/2026
**Versão:** V2

**O que tentei fazer:**

Atualizar o `textContent` dos spans de estatística no footer.

**O que aconteceu:**

Erro no console dizendo que a variável não existe ou nada era atualizado.

**O que eu achei que era:**

Problema no `updateStats` ou na ordem das chamadas.

**O que realmente era:**

Três causas: (1) os seletores `document.querySelector('[all]')` etc. não encontravam nada porque `[all]` busca um atributo `all` que não existe no HTML; (2) os IDs dos spans estavam duplicados (`id="taskCount"` repetido 3 vezes), então mesmo com `getElementById` só o primeiro era encontrado; (3) no `updateStats` eu usava nomes de variáveis (`totalTask`, `totalActivetask`, `totalCompletedTask`) que nunca foram declaradas.

**Como resolvi:**

Dei IDs únicos para cada span (`totalTask`, `activeTask`, `completedTask`), corrigi os seletores no topo para `getElementById` e ajustei os nomes no `updateStats` para bater com as declarações.

**Conceito envolvido:**

Seletores CSS vs seletores de ID; unicidade de IDs no HTML; correspondência entre declaração e uso de variáveis.

**Vou lembrar que:**

O nome da variável no JS não é mágico — ela precisa ser declarada antes. O seletor precisa existir no HTML. ID duplicado é inválido.

---

## Erro 012

**Data:** 06/06/2026
**Versão:** V2

**O que tentei fazer:**

Usar `querySelector` para selecionar elementos de estatística com `[all]`, `[active]`, `[completed]`.

**O que aconteceu:**

As variáveis `statTotal`, `statDone`, `statPending` ficavam `null`.

**O que eu achei que era:**

Sintaxe errada no `querySelector`.

**O que realmente era:**

`[all]` busca um elemento com atributo chamado `all`. Mas no HTML existem data-attributes como `data-filter="all"` — o atributo se chama `data-filter`, não `all`. A sintaxe correta seria `[data-filter="all"]`, mas mesmo assim não era o elemento certo para exibir os contadores (aqueles são botões de filtro, não os spans do footer).

**Como resolvi:**

Troquei para `getElementById('totalTask')`, `getElementById('activeTask')` e `getElementById('completedTask')`, e adicionei os IDs correspondentes no HTML.

**Conceito envolvido:**

Seletores de atributo CSS vs seletores de ID; diferença entre `[nome]` e `[nome="valor"]`.

**Vou lembrar que:**

`[all]` não seleciona `data-filter="all"`. O nome do atributo é completo. E escolher o elemento certo para cada finalidade (botão de filtro ≠ span de contador).

---

## Erro 013

**Data:** 08/06/2026
**Versão:** V3

**O que tentei fazer:**

Criar um `<input>` para o modo de edição dentro da função `editTask`.

**O que aconteceu:**

Erro no console — `document.createTaskElement is not a function`.

**O que eu achei que era:**

Problema de sintaxe ou parâmetro errado.

**O que realmente era:**

Escrevi `document.createTaskElement('input')`. `createTaskElement` é uma função que **eu criei** no escopo global — ela não é um método do `document`. Além disso, ela recebe um objeto `task` e devolve um `<li>` completo, não um input solto. O método nativo correto é `document.createElement('input')`.

**Como resolvi:**

Troquei `document.createTaskElement('input')` por `document.createElement('input')`.

**Conceito envolvido:**

Diferença entre funções personalizadas e métodos nativos do DOM; escopo de funções.

**Vou lembrar que:**

`createTaskElement` é minha função que monta um `<li>` inteiro. Para criar elementos simples, uso `document.createElement`.

---

## Erro 014

**Data:** 08/06/2026
**Versão:** V3

**O que tentei fazer:**

Passar o elemento de texto para `editTask` no listener do botão ✎.

**O que aconteceu:**

Ao editar, o checkmark sumia e o input aparecia no lugar errado.

**O que eu achei que era:**

Problema no `replaceChild` ou na ordem dos elementos no `<li>`.

**O que realmente era:**

Dentro de `createTaskElement`, eu tenho duas variáveis: `span` (o `.checkmark` do checkbox) e `textValue` (o `.task-text` que exibe o texto). No listener do ✎, eu passei `span` em vez de `textValue` como segundo argumento: `editTask(task.id, span)`. O nome curto `span` me confundiu — parecia que era o texto, mas era o quadradinho visual do checkbox.

**Como resolvi:**

Troquei para `editTask(task.id, textValue)` — passei o elemento correto que contém o texto da tarefa.

**Conceito envolvido:**

Nomenclatura de variáveis; atenção ao que cada variável representa no DOM.

**Vou lembrar que:**

Nome de variável importa. `span` era ambíguo — podia ser qualquer span. `textValue` é específico. Olhar a linha onde a variável foi declarada antes de usar.

---

## Erro 015

**Data:** 08/06/2026
**Versão:** V3

**O que tentei fazer:**

Pegar o texto atual da tarefa para colocar como valor inicial do input de edição.

**O que aconteceu:**

O input de edição aparecia vazio, sem o texto original.

**O que eu achei que era:**

Problema na criação do input ou no `value`.

**O que realmente era:**

Usei `span.value` para ler o texto do `<span>`. A propriedade `.value` existe em elementos de formulário (`<input>`, `<textarea>`, `<select>`), mas **não** em `<span>`. Para elementos genéricos, o correto é `.textContent`.

**Como resolvi:**

Troquei `span.value` por `textEl.textContent`.

**Conceito envolvido:**

Diferença entre `.value` (inputs de formulário) e `.textContent` (elementos de texto genéricos).

**Vou lembrar que:**

`.value` → `<input>`, `<textarea>`, `<select>`. `.textContent` → `<span>`, `<p>`, `<div>`, `<li>`. Não são intercambiáveis.

---

## Erro 016

**Data:** 08/06/2026
**Versão:** V3

**O que tentei fazer:**

Salvar a edição com Enter e depois editar outra tarefa.

**O que aconteceu:**

A primeira edição salvava corretamente. Mas o ✎ de qualquer outra tarefa não funcionava mais — clicar não abria o input de edição.

**O que eu achei que era:**

Problema no listener do ✎ ou na função `editTask`.

**O que realmente era:**

O `editingId` era setado para o `id` da tarefa no `editTask`, mas nunca voltava a ser `null` depois do `saveEdit`. A condição `if(editingId === null)` no início de `editTask` bloqueava qualquer nova edição porque o estado ainda dizia que alguém estava editando. O mesmo acontecia se o usuário adicionasse uma tarefa nova enquanto editava: o `addTask` chamava `renderTasks()` (destruindo o input), mas `editingId` continuava com o valor antigo.

**Como resolvi:**

Adicionei `editingId = null` em dois lugares: no final do `saveEdit` (após salvar com sucesso) e no final do `addTask` (após o render).

**Conceito envolvido:**

Estado compartilhado; reset de variável de controle em todos os caminhos de saída.

**Vou lembrar que:**

Toda variável de estado que controla um modo (edição, carregamento, etc.) precisa ser resetada em **todos** os caminhos de saída daquele modo. Se esquecer um, o estado "sujo" bloqueia a funcionalidade até o próximo reload.

---

## Erro 017

**Data:** 08/06/2026
**Versão:** V3

**O que tentei fazer:**

Impedir que o usuário abrisse duas edições ao mesmo tempo usando o `editingId`.

**O que aconteceu:**

Ao clicar no ✎ de qualquer tarefa, nada acontecia — o input de edição nunca abria.

**O que eu achei que era:**

Problema no `replaceChild`, no `focus()`, ou no listener do botão.

**O que realmente era:**

Escrevi a condição invertida: `if(editingId !== null)`. Isso significa "se **já tem** alguém editando, abra a edição". Como `editingId` começa como `null`, a condição era sempre `false` e a edição nunca iniciava. O correto era `if(editingId === null)` — "se **não tem** ninguém editando, abra a edição".

**Como resolvi:**

Troquei `!==` por `===` na condição da linha 256.

**Conceito envolvido:**

Lógica booleana; atenção ao sinal de negação em condições.

**Vou lembrar que:**

Ler a condição em voz alta antes de testar. `editingId === null` = "está livre"; `editingId !== null` = "está ocupado". São opostos e é fácil inverter sem perceber.

---