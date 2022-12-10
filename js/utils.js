//Definindo referências para elementos da página
var authForm = document.getElementById('authForm')
var authFormTitle = document.getElementById('authFormTitle')
var register = document.getElementById('register')
var access = document.getElementById('access')
var loading = document.getElementById('loading')
var auth = document.getElementById('auth')
var userContent = document.getElementById('userContent')
var userEmail = document.getElementById('userEmail')
var sendEmailVerificationDiv = document.getElementById('sendEmailVerificationDiv')
var emailVerified = document.getElementById('emailVerified')
var passwordReset = document.getElementById('passwordReset')
var userName = document.getElementById('userName')
var userImg = document.getElementById('userImg') 

var todoForm = document.getElementById('todoForm')
var todoCount = document.getElementById('todoCount')
var ulTodoList = document.getElementById('ulTodoList')

//Alterar o formulário de autenticação para o cadastro de novas contas
function toggleToRegister() {
  authForm.submitAuthForm.innerHTML = 'Cadastrar conta'
  authFormTitle.innerHTML = 'Isira seus dados para se cadastrar'
  hideItem(register) // Esconder atalho para cadastrar conta
  hideItem(passwordReset) // Esconder opção de redefinição de senha
  showItem(access) // Mostrar atalho pra acessar conta
}

//Alterar o formulário de autenticação para o acesso de contas já existentes
function toggleToAccess() {
  authForm.submitAuthForm.innerHTML = 'Acessar'
  authFormTitle.innerHTML = 'Acesse sua conta para continuar'
  hideItem(access)  // Esconder atalho para acessar conta
  showItem(passwordReset) // mostrar opção de redefinição de senha
  showItem(register) // Mostrar atalho para cadastrar conta
}

//Simplifica a exibição de elementos da página
function showItem(element) {
  element.style.display = 'block'
}

//Simplifica a remoção de elementos da página
function hideItem(element) {
  element.style.display = 'none'
}

//Mostrar conteúdo para usuários autenticados
function showUserContent(user){
  console.log(user)
  if (user.providerData[0].providerId != 'password') {
    emailVerified.innerHTML = 'Autenticação por provedor confiável, não é necessário verificar E-mail'
    hideItem(sendEmailVerificationDiv)
  }else {
    if(user.emailVerified){
      emailVerified.innerHTML = 'E-mail verificado'
      hideItem(sendEmailVerificationDiv)
    }else {
      emailVerified.innerHTML = 'E-mail não verificado'
      showItem(sendEmailVerificationDiv)
    }
  }

  userImg.src = user.photoURL ? user.photoURL : 'img/unknownUser.png'
  userName.innerHTML = user.displayName
  userEmail.innerHTML = user.email
  hideItem(auth)

  dbRefUsers.child(firebase.auth().currentUser.uid).on('value', function (dataSnapshot) {
    fillTodoList(dataSnapshot)
  })

  showItem(userContent)
}

//Mostrar conteúdo para usuário não autenticado
function showAuth(){
  authForm.email.value = ''
  authForm.password.value = ''
  hideItem(userContent)
  showItem(auth)
}

//Centralizar e traduzir erros
function showError(prefix, error) {
  console.log(error.code)
  hideItem(loading)
  switch (error.code) {
    case 'auth/invalid-email': 
    case 'auth/wrong-password': alert(prefix + ' ' + 'E-mail ou senha inválidos!')
    break;
    case 'auth/weak-password': alert(prefix + ' ' + 'Senha deve conter no mínimo 6 caracteres!')
    break;
    case 'auth/email-already-in-use': alert(prefix + ' ' + 'E-mail já cadastrado por outra conta!')
    break;
    case 'auth/popup-closed-by-user': alert(prefix + ' ' + 'Popup fechado pelo usuário antes de finalizar operação!')
    break;

    default: alert(prefix + ' ' + error.message)
  }
}
//Atributos extras de configuração de e-mail
var actionCodeSettings = {
  url: 'https://todolist-df89e.web.app'
}


var database = firebase.database()
var dbRefUsers = database.ref('users')