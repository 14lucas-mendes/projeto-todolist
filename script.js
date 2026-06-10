// ============================================================
// Projeto 1: Todo List — script.js
// Roadmap: Reabilitação de Fundamentos JavaScript
//
// REGRAS:
// ✅ Consultar documentação (MDN, javascript.info)
// ✅ Usar console.log e debugger
// ✅ Pesquisar conceitos
// ❌ IA gerar funcionalidades completas
// ❌ Colar código sem entender
// ❌ Pular versões
//
// Implemente uma versão por vez.
// Só avance quando a versão atual funcionar completamente.
// ============================================================


// ── SELEÇÃO DO DOM ───────────────────────────────────────────
// Selecione todos os elementos que o JS vai precisar tocar.
// Dica: olhe o index.html e identifique os ids de cada elemento.

const taskInput   = document.getElementById('new-task');
const addBtn      = document.getElementById('addBtn')
const taskList    = document.getElementById('taskList')
const formError   = document.getElementById('formError')
const statTotal   = document.getElementById('totalTask')
const statCompleted = document.getElementById('completedTask')
const statActive = document.getElementById('activeTask')
const filters = document.querySelector('.filters')



// ── ESTADO ───────────────────────────────────────────────────
// Tudo que o programa precisa lembrar fica aqui.
// Não espalhe estado pelo código — centralize.

let tasks = [] // array principal de tarefas
let currentFilter = 'all' // filtro ativo: 'all' | 'active' | 'completed'
let editingId = null


// ============================================================
// VERSÃO 1 — Adicionar e remover tarefas
// ============================================================
//
// O que implementar:
//   addTask()     → lê input, valida, cria objeto, chama render
//   removeTask()  → recebe id, filtra array, chama render
//   renderTasks() → limpa lista, percorre array, cria <li>
//
// Estrutura do objeto tarefa:
//   { id: Date.now(), text: 'minha tarefa', done: false }
//
// Ordem sugerida:
//   1. renderTasks() — teste com array fixo primeiro
//   2. addTask()
//   3. removeTask()
//   4. Event listeners
// ============================================================

function renderTasks() {
  // Dica: comece limpando a lista
  // Dica: use currentFilter para decidir quais tarefas mostrar
  // Dica: se lista vazia, mostre emptyState
  // Dica: para cada tarefa, chame createTaskElement()

  // seu código aqui
  taskList.replaceChildren()
  const tasksFiltradas = getFilteredTasks()

  if(tasksFiltradas.length === 0){
    const mensage = document.createElement('div')
    mensage.setAttribute('id', 'emptyState')

    const textMensage = document.createElement('p')
    textMensage.innerHTML = 'Nenhuma tarefa encontrada'

    mensage.appendChild(textMensage)
    taskList.appendChild(mensage)
  } else {
    tasksFiltradas.forEach(task => {
        const li = createTaskElement(task)
        taskList.appendChild(li)  
    })
  }
}


function createTaskElement(task) {
  // Dica: crie um <li> com className 'task-item'
  // Dica: se task.done, adicione também a classe 'completed' com classList.toggle
  // Dica: dentro do <li>, crie:
  //   - label checkbox (.task-checkbox) → input[type=checkbox] + .checkmark
  //   - span texto     (.task-text)
  //   - div ações      (.task-actions)
  //   - botão deletar  (.action-btn.delete)
  // Dica: o botão deletar chama removeTask(task.id) no click

  // seu código aqui
  const li = document.createElement('li')
  li.className = 'task-item'
  li.classList.toggle('completed', task.done)

  const label = document.createElement('label')
  label.className = 'task-checkbox'

  const input = document.createElement('input')
  input.type ='checkbox'
  input.checked = task.done

  const span = document.createElement('span')
  span.className = 'checkmark'

  const textValue = document.createElement('span')
  textValue.className = 'task-text'
  textValue.textContent = task.text

  const actions = document.createElement('div')
  actions.className = 'task-actions'


  const btnEdit = document.createElement('button')
  btnEdit.className = 'action-btn edit'
  btnEdit.setAttribute('aria-label', 'Editar tarefa')
  btnEdit.setAttribute('title', 'Editar')
  btnEdit.innerHTML = '✎'

  const btnDelete = document.createElement('button')
  btnDelete.className = 'action-btn delete'
  btnDelete.setAttribute('aria-label', 'Excluir tarefa')
  btnDelete.setAttribute('title', 'Excluir')
  btnDelete.innerHTML = '✕'

  label.appendChild(input)
  label.appendChild(span)

  actions.appendChild(btnEdit)
  actions.appendChild(btnDelete)

  li.appendChild(label)
  li.appendChild(textValue)
  li.appendChild(actions)

  btnDelete.addEventListener('click', () => {
    removeTask(task.id)
  })

  input.addEventListener('click', () => {
    toggleTask(task.id)
  })

  btnEdit.addEventListener('click', () => {
    editTask(task.id, textValue)
  })

  return li
}


function addTask() {
  // Dica: leia taskInput.value e use .trim()
  // Dica: valide — se vazio, mostre erro em formError e retorne
  // Dica: crie o objeto { id: Date.now(), text: '...', done: false }
  // Dica: push no array tasks
  // Dica: limpe o input e o erro
  // Dica: chame renderTasks() e updateStats()

  // seu código aqui
  const task = taskInput.value.trim()

  if(task === '') return formError.innerHTML = 'Por favor, digite uma tarefa'

  const newTask = {
    id: Date.now(),
    text: task,
    done: false
  }

  tasks.push(newTask)
  renderTasks()
  updateStats()
  saveTasks()
  taskInput.value = ''
  formError.innerHTML = ''
  editingId = null
}

function removeTask(id) {
  // Dica: use filter() para criar novo array sem o id recebido
  // Dica: reatribua tasks
  // Dica: chame renderTasks() e updateStats()

  // seu código aqui
  tasks = tasks.filter(task => task.id !== id)
  updateStats()
  renderTasks()
  saveTasks()

}


// ============================================================
// VERSÃO 2 — Marcar como concluída + contador
// ============================================================
//
// O que implementar:
//   toggleTask()    → inverte task.done, chama render
//   updateStats()   → conta total, done, pending e atualiza DOM
//
// Dica: o checkbox é o input[type=checkbox] dentro de .task-checkbox
// Dica: ao criar o <li>, defina input.checked = task.done
// Dica: no event listener do checkbox, chame toggleTask(task.id)
// ============================================================

function toggleTask(id) {
  // Dica: use find() para achar a tarefa pelo id
  // Dica: inverta o .done com !task.done
  // Dica: chame renderTasks() e updateStats()

  // seu código aqui
  const marktask = tasks.find(task => task.id === id)

  if(marktask) marktask.done = !marktask.done

  renderTasks()
  updateStats()
  saveTasks()
}

function updateStats() {
  // Dica: tasks.length → total
  // Dica: tasks.filter(t => t.done).length → done
  // Dica: total - done → pending
  // Dica: atualize o textContent de cada stat

  // seu código aqui
 const actives = tasks.filter(task => !task.done)
 const completed = tasks.filter(task => task.done)

 statTotal.innerText = `${tasks.length} total de tarefas`
 statActive.innerText = `${actives.length} tarefas pendentes`
 statCompleted.innerText = `${completed.length} tarefas concluidas`

}


// === =========================================================
// VERSÃO 3 — Editar tarefa + validação
// ============================================================
//
// O que implementar:
//   editTask()   → transforma span em input para edição
//   saveEdit()   → salva o novo texto, volta para span
//
// Dica: ao clicar em editar, substitua .task-text por um input
// Dica: ao salvar, valide que o novo texto não está vazio
// Dica: atualize o texto no array e chame renderTasks()
// ============================================================

function editTask(id, textEl) {
  // seu código aqui
  if(editingId === null) {
    editingId = id

    const editar = tasks.find(task => task.id === id)
    const listaPai = textEl.parentNode
  
    if(editar) {
      const newInput = document.createElement('input')
      newInput.type = 'text'
      newInput.className = 'todo-input'
      newInput.value = textEl.textContent
      listaPai.replaceChild(newInput, textEl)
      newInput.focus()
  
      newInput.addEventListener('keydown', (e) => {
        if(e.key === 'Enter') saveEdit(editar.id, newInput)
        formError.innerHTML = ''
        if(e.key === 'Escape') {
          listaPai.replaceChild(textEl, newInput)
          editingId = null
        }
      })
    }
  }
}


function saveEdit(id, input) {
  // seu código aqui
  if(editingId === id) {
    const novoTexto = input.value
    if(novoTexto.trim() === '') return formError.innerHTML = 'Por favor, digite uma tarefa'
  
    tasks = tasks.map(task => task.id === id ? {...task, text: novoTexto} : task)
  }

  renderTasks()
  updateStats()
  saveTasks()
  formError.innerHTML = ''
  editingId = null
}


// ============================================================
// VERSÃO 4 — Filtros: todas | pendentes | concluídas
// ============================================================
//
// O que implementar:
//   setFilter()  → atualiza currentFilter, atualiza botões ativos
//
// Dica: currentFilter já existe no estado
// Dica: renderTasks() já usa currentFilter — implemente o filtro lá
// Dica: o filtro muda qual parte do array é renderizada, não o array
// Dica: use data-filter nos botões para saber qual foi clicado
// ============================================================

function setFilter(filter) {
  // Dica: atualize currentFilter
  // Dica: remova a classe 'active' de todos os .filter-btn
  // Dica: adicione a classe 'active' no botão clicado
  // Dica: chame renderTasks()

  // seu código aqui
  currentFilter = filter

  const btnFilters = filters.querySelectorAll('.filter-btn')

  btnFilters.forEach(btn => {
    btn.classList.remove('active')

    if(btn.dataset.filter === filter) btn.classList.add('active')
    })

  renderTasks()
}

function getFilteredTasks() {
  // Dica: retorne tasks filtrado de acordo com currentFilter
  // 'all'       → todos
  // 'active'    → somente done === false
  // 'completed' → somente done === true

  // seu código aqui
  if(currentFilter === 'all') return tasks

  const filtersActive = tasks.filter(task => task.done === false)
  const filterCompleted = tasks.filter(task => task.done === true)

  if(currentFilter === 'active') return filtersActive
  if(currentFilter === 'completed') return filterCompleted

}


// ============================================================
// VERSÃO 5 — Persistência com localStorage
// ============================================================
//
// O que implementar:
//   saveTasks()   → salva tasks no localStorage
//   loadTasks()   → carrega tasks do localStorage ao abrir
//
// Dica: localStorage.setItem('tasks', JSON.stringify(tasks))
// Dica: JSON.parse(localStorage.getItem('tasks')) || []
// Dica: chame saveTasks() ao final de addTask, removeTask,
//        toggleTask e saveEdit
// Dica: chame loadTasks() no início — antes de renderTasks()
// ============================================================

function saveTasks() {
  // seu código aqui
  return localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks() {
  // seu código aqui
  return JSON.parse(localStorage.getItem('tasks')) || []
}


// ============================================================
// EXTRA 1 — Limpar concluídas (clearCompleted)
// ============================================================
//
// O que implementar:
//   clearCompleted() → filtra tasks removendo done===true, chama render + save
//
// Dica: use filter() para criar array só com pendentes
// Dica: reatribua tasks = tasks.filter(t => !t.done)
// Dica: chame renderTasks(), updateStats() e saveTasks()
// Dica: o botão #clearCompleted já existe no HTML
// Dica: adicione o listener no bloco EVENT LISTENERS
// Dica: conecte com o EXTRA 5 — desabilitar botão quando 0 concluídas


// ============================================================
// EXTRA 5 — Botão clearCompleted dinâmico (disabled)
// ============================================================
//
// O que implementar:
//   Modificar updateStats() para habilitar/desabilitar o botão
//
// Dica: selecione o botão: const clearBtn = document.getElementById('clearCompleted')
// Dica: adicione no bloco SELEÇÃO DO DOM
// Dica: se completed.length === 0 → clearBtn.disabled = true
// Dica: se completed.length > 0  → clearBtn.disabled = false
// Dica: o CSS .clear-completed:disabled já existe no style.css
// Dica: chame essa lógica dentro de updateStats(), que já conta concluídas


// ============================================================
// EXTRA 2 — Empty state contextual
// ============================================================
//
// O que implementar:
//   getEmptyMessage() → retorna mensagem diferente conforme currentFilter
//
// Dica: 'all'       → "Nenhuma tarefa cadastrada"
// Dica: 'active'    → "Nenhuma tarefa pendente 🎉"
// Dica: 'completed' → "Nenhuma tarefa concluída ainda"
// Dica: chame getEmptyMessage() dentro de renderTasks() ao criar o #emptyState
// Dica: use if/else ou switch — é só leitura, não modifica estado
// Dica: substitua o innerHTML fixo 'Nenhuma tarefa encontrada' pela chamada


// ============================================================
// EXTRA 3 — Confirmação antes de excluir
// ============================================================
//
// O que implementar:
//   Modificar removeTask() para pedir confirmação antes de excluir
//
// Dica: no INÍCIO de removeTask(), chame window.confirm('Deseja excluir esta tarefa?')
// Dica: se confirm retornar false, encerre com return (não faça nada)
// Dica: se retornar true, continue o fluxo normal (filter + render + save)
// Dica: faça DENTRO de removeTask() — mais seguro que no listener
// Dica: isso cobre exclusão por qualquer caminho (btnDelete + possível futuro atalho)
// Dica: teste: ✕ → diálogo → Cancelar → tarefa permanece


// ============================================================
// EXTRA 4 — Toast de feedback
// ============================================================
//
// O que implementar:
//   showToast(mensagem) → cria elemento toast, anima, remove após 2s
//
// Estrutura do toast:
//   Um <div> fixo no canto inferior, que aparece com fade-in e some com fade-out
//
// Dica: crie o elemento com createElement('div')
// Dica: adicione classe 'toast'
// Dica: se já existir um toast (.toast), remova-o antes de criar novo
// Dica: atribua textContent = mensagem
// Dica: anexe em document.body (fora do <main>)
// Dica: use setTimeout(() => toast.remove(), 2000) para sumir
// Dica: CSS da animação (já adicionado no style.css):
//         .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
//           background: var(--color-surface); border: var(--border-thin);
//           padding: var(--space-2) var(--space-3); font-size: 13px;
//           animation: toastIn 0.3s ease; z-index: 100; }
//         @keyframes toastIn { from { opacity:0; transform: translateX(-50%) translateY(12px); }
//           to { opacity:1; transform: translateX(-50%) translateY(0); } }
//
// Onde chamar:
//   showToast('Tarefa adicionada ✓')  → no final de addTask()
//   showToast('Tarefa removida')      → no final de removeTask() (depois do confirm)
//   showToast('Tarefa atualizada')    → no final de saveEdit()
//   showToast('Todas concluídas removidas') → no final de clearCompleted()


// ============================================================
// EXTRA 6 — Keyboard shortcuts + Undo
// ============================================================
//
// O que implementar:
//   Ctrl+N        → foca o input #new-task
//   Ctrl+Z        → desfaz a última ação (undo)
//   Escape        → se estiver editando, cancela; senão, limpa filtro para 'all'
//
// Estado necessário (adicione no bloco ESTADO):
//   let history = []       → pilha de snapshots do array tasks
//   let historyIndex = -1  → posição atual (-1 = sem histórico ainda)
//
// Funções:
//   pushHistory()              → salva snapshot antes de cada mudança
//   undo()                     → volta 1 estado na pilha
//   handleGlobalKeydown(e)     → dispatcher que decide qual ação executar
//
//   pushHistory():
//     - só execute se NÃO estiver no meio de um undo
//     - use structuredClone(tasks) para clone profundo (JS moderno)
//       fallback: JSON.parse(JSON.stringify(tasks))
//     - descarte futuros: history = history.slice(0, historyIndex + 1)
//     - adicione o clone: history.push(clone)
//     - historyIndex = history.length - 1
//     - limite a 50 entradas: if(history.length > 50){ history.shift(); historyIndex-- }
//     - NÃO persista no localStorage (histórico é volátil)
//     - chame pushHistory() no INÍCIO de addTask, removeTask, toggleTask,
//       saveEdit e clearCompleted (ANTES de modificar tasks)
//
//   undo():
//     - se historyIndex > 0: historyIndex--
//     - tasks = structuredClone(history[historyIndex])
//     - renderTasks(), updateStats(), saveTasks()
//     - NÃO chame pushHistory() aqui
//
//   handleGlobalKeydown(e):
//     - Ctrl+N       → e.preventDefault(); taskInput.focus()
//     - Ctrl+Z       → se não estiver editando: e.preventDefault(); undo()
//                      se estiver editando: deixa o navegador desfazer texto
//     - Escape       → se editingId !== null: cancela edição
//                      senão: setFilter('all')
//
// Dica: o listener fica em document.addEventListener('keydown', handleGlobalKeydown)
// Dica: adicione no bloco EVENT LISTENERS
// Dica: não capture Ctrl+Z quando o foco estiver num input de edição
//       (use document.activeElement para verificar)
// Dica: pesquise 'structuredClone mdn' para clone profundo nativo
// Dica: pesquise 'stack data structure javascript' para entender pilha


// ============================================================
// DESAFIO FINAL — Drag and Drop (reordenar tarefas)
// ============================================================
//
// Objetivo: permitir que o usuário arraste tarefas para reordená-las,
//           salvando a nova ordem no localStorage.
//
// O que implementar:
//   Adicionar draggable="true" nos <li> em createTaskElement()
//   Guardar qual tarefa está sendo arrastada (dragstart)
//   Permitir soltar sobre outra tarefa (dragover + drop)
//   Reordenar o array tasks com base na posição de soltura
//
// Estado necessário (adicione no bloco ESTADO):
//   let draggedId = null  → id da tarefa sendo arrastada
//
// Eventos (adicione listeners nos <li> dentro de createTaskElement):
//
//   dragstart (no <li>):
//     - guarde o id: draggedId = task.id
//     - adicione classe 'dragging' no <li> para feedback visual
//     - configure dataTransfer: e.dataTransfer.effectAllowed = 'move'
//     - Dica: use setTimeout(() => li.classList.add('dragging'), 0)
//       para o navegador renderizar o drag fantasma antes da classe
//
//   dragend (no <li>):
//     - remova classe 'dragging' do <li>
//     - remova classe 'drag-over' de todos os <li>
//     - reset: draggedId = null
//
//   dragover (no <li>):
//     - e.preventDefault() → necessário para permitir o drop
//     - e.dataTransfer.dropEffect = 'move'
//     - adicione classe 'drag-over' visual no <li> alvo
//
//   dragleave (no <li>):
//     - remova classe 'drag-over' do <li>
//
//   drop (no <li>):
//     - e.preventDefault()
//     - e.stopPropagation() → evita que o evento suba para o pai
//     - remova classe 'drag-over' do <li>
//     - se draggedId === task.id → retorne (mesma tarefa)
//     - reordene o array:
//         const fromIndex = tasks.findIndex(t => t.id === draggedId)
//         const toIndex = tasks.findIndex(t => t.id === task.id)
//         const [moved] = tasks.splice(fromIndex, 1)
//         tasks.splice(toIndex, 0, moved)
//     - renderTasks(), updateStats(), saveTasks()
//
// CSS necessário (já adicionado no style.css):
//   .task-item.dragging { opacity: 0.4; }
//   .task-item.drag-over { border-top: 2px solid var(--color-accent); }
//   .task-item { cursor: grab; }
//   .task-item:active { cursor: grabbing; }
//
// Dica: pesquise 'html drag and drop api mdn' para referência completa
// Dica: pesquise 'array splice mdn' para reordenar arrays
// Dica: teste em ordem: dragstart → dragover → drop → reordenação → persistência
// Dica: se o drop não funcionar, verifique se dragover tem preventDefault()
// Dica: o drag só funciona com mouse, não com touch — é esperado


// ── EVENT LISTENERS ──────────────────────────────────────────
// Monte todos os listeners aqui, no final.
// Ordem: botão adicionar → input enter → filtros

// Botão adicionar
addBtn.addEventListener('click', (e) => {
  // seu código aqui
  addTask()
  e.preventDefault()
  console.log(tasks)
})

// Enter no input
taskInput.addEventListener('keydown', (e) => {
  // Dica: verifique se e.key === 'Enter'
  // seu código aqui
  if(e.key === 'Enter') return addTask()
})

// Filtros — use event delegation no container
filters.addEventListener('click', (e) => {
  // Dica: verifique e.target.dataset.filter
  // Dica: só execute se tiver data-filter
  // seu código aqui
  if(e.target.dataset.filter === undefined) return

  setFilter(e.target.dataset.filter)
  
})


// ── INICIALIZAÇÃO ────────────────────────────────────────────
// Tudo que precisa rodar quando a página abre.

function init() {
  tasks = loadTasks()    // versão 5 — carrega do localStorage
  renderTasks()  // renderiza o estado inicial
  updateStats()  // atualiza contadores
}

init()


// ============================================================
// DICAS GERAIS
//
// console.log() é seu melhor amigo. Use muito.
// Exemplo útil:
//
//   function addTask() {
//     const text = taskInput.value.trim()
//     console.log('texto lido:', text)
//     console.log('tasks antes:', tasks)
//     // seu código
//     console.log('tasks depois:', tasks)
//   }
//
// Se algo não funciona:
//   1. Abra o DevTools (F12)
//   2. Vá na aba Console
//   3. Leia o erro — ele diz a linha exata
//   4. Antes de pesquisar: tente entender o erro
//   5. Só pesquise o conceito, não a solução pronta
// ============================================================