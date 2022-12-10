// Trata a submissão do formulário de tarefas
todoForm.onsubmit = function (event) {
  event.preventDefault(); // Evita o redirecionamento da página
  if (todoForm.name.value != '') {
    var data = {
      name: todoForm.name.value,
    };

    dbRefUsers
      .child(firebase.auth().currentUser.uid)
      .push(data)
      .then(function () {
        console.log('Tarefa "' + data.name + '" adicionada com sucesso')
      })
      .catch(function (error) {
        showError('Falha ao adicionar tarefa: ', error)
      })

      todoForm.name.value = ''
  } else {
    alert('O nome da tarefa não pode estar vazio')
  }
}

//Exibir a lista de tarefas do usuário
function fillTodoList(dataSnapshot) {
  ulTodoList.innerHTML = ''
  var num = dataSnapshot.numChildren()
  todoCount.innerHTML = num + (num > 1 ? ' tarefas' : ' tarefa') + ':' //Exibir na interface o número de tarefas
  dataSnapshot.forEach(function (item) {//Percorre todos os elementos
    var value = item.val()
    var ulList = document.createElement('li') // Cria um elemento do tipo lista
    var spanLi = document.createElement('span') //Cria um elemento do tipo span
    spanLi.appendChild(document.createTextNode(value.name)) // Adiciona o elemento de texto dentro da span
    spanLi.id = item.key //Define o id para o span
    ulList.appendChild(spanLi) // Adiciona o span dentro do lista
    ulTodoList.appendChild(ulList)

    var ulListRemoveBtn = document.createElement('button') // Cria um botão para a remoção da tarefa
    ulListRemoveBtn.appendChild(document.createTextNode('Excluir')) //Define o texto do botão
    ulListRemoveBtn.setAttribute('onclick', 'removeTodo("' + item.key + '")') // Configura o onclick do btn remoção de tarefas
    ulListRemoveBtn.setAttribute('class', 'danger todoBtn') // define classes de estilização para btn de remoção
    ulList.appendChild(ulListRemoveBtn) //Adiciona o btn de remação no ulList

    var ulListUpdateBtn = document.createElement('button') // Cria um botão para a atualização da tarefa
    ulListUpdateBtn.appendChild(document.createTextNode('Editar')) //Define o texto do botão
    ulListUpdateBtn.setAttribute('onclick', 'updateTodo("' + item.key + '")') // Configura o onclick do btn atualização de tarefas
    ulListUpdateBtn.setAttribute('class', 'alternative todoBtn') // define classes de estilização para btn de atualização
    ulList.appendChild(ulListUpdateBtn) //Adiciona o btn de atualização no ulList

    ulTodoList.appendChild(ulList) // Adiciona o li dentro da listra de tarefas
  })
}

//Remover tarefas
function removeTodo(key) {
  var selectedItem = document.getElementById(key)
  var confirmation = confirm(
    'Realmente deseja remover a tarefa "' + selectedItem.innerHTML + '"?'
  )
  if (confirmation) {
    dbRefUsers
      .child(firebase.auth().currentUser.uid)
      .child(key)
      .remove()
      .then(function () {
        console.log('Tarefa "' + selectedItem.innerHTML + '" removida com sucesso')
      })
      .catch(function (error) {
        showError('Falha ao remover tarefa: ', error)
      })
  }
}

//Atualiza tarefas
function updateTodo(key) {
  var selectedItem = document.getElementById(key)
  var newTodoName = prompt(
    'Escolha um novo nome para a tarefa!"' + selectedItem.innerHTML + '"!',
    selectedItem.innerHTML
  )
  if (newTodoName != '') {
    var data = {
      name: newTodoName,
    }

    dbRefUsers
      .child(firebase.auth().currentUser.uid)
      .child(key)
      .update(data)
      .then(function () {
        console.log('Tarefa "' + data.name + '" atualizada com sucesso')
      })
      .catch(function (error) {
        showError('Falha ao atualizar tarefa: ', error)
      })
  } else {
    alert('O nome da tarefa não pode ser em branco para atualizar a tarefa!!')
  }
}