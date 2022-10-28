//Traduz parea português brasileiro a autenticação do Firebase
firebase.auth().languageCode = 'pt-BR'

//Função que trata a submissão do formulário de autenticação
authForm.onsubmit = function (evento) {
  showItem(loading);
  event.preventDefault();
  if (authForm.submitAuthForm.innerHTML == 'Acessar') {
    firebase
      .auth()
      .signInWithEmailAndPassword(authForm.email.value, authForm.password.value)
      .catch(function (error) {
        console.log('Falha no acesso');
        console.log(error);
        hideItem(loading);
      });
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        authForm.email.value,
        authForm.password.value
      )
      .catch(function (error) {
        console.log('Falha no cadastro');
        console.log(error);
        hideItem(loading);
      });
  }
};

//Função que centraliza e trata a autenticação
firebase.auth().onAuthStateChanged(function (user) {
  hideItem(loading);
  if (user) {
    showUserContent(user);
  } else {
    showAuth();
  }
});

//Função que permite ao usuário sair de sua conta
function signOut() {
  firebase
    .auth()
    .signOut()
    .catch(function (error) {
      console.log('Falha ao sair da conta');
      console.log(error);
    });
}

//Função que permite ao usuário fazer a verificação do e-mail dele
function sendEmailVerification() {
  showItem(loading);
  var user = firebase.auth().currentUser;
  user
    .sendEmailVerification(actionCodeSettings)
    .then(function () {
      alert(
        'E-mail de verificação foi enviado para ' +
          user.email +
          'Verifique a sua caixa de entrada!'
      );
    })
    .catch(function (error) {
      alert('Houve um erro ao enviar o e-mail de verificação');
      console.log(error);
    })
    .finally(function () {
      hideItem(loading);
    });
}

//Função que permite o usuário redefinir a senha dele
function sendPasswordResetEmail(){
  var email = prompt('Redefinir senha! Informe o seu endereço de E-mail.', authForm.email.value)
  if(email) {
    showItem(loading)
    firebase.auth().sendPasswordResetEmail(email, actionCodeSettings).then(function (){
      alert('E-mail de redefinição de senha foi enviado para: ' + email + '.' )
    }).catch(function(error){
      alert('Houve um erro ao enviar o E-mail de redefinição de senha!!!')
      console.log(error)
    }).finally(function () {
      hideItem(loading)
    })
  }else {
    alert('É preciso preencher o campo de E-mail para redefinir a senha!')
  }
}

//Função que permite a autenticação pelo Google
function singInWithGoogle() {
  showItem(loading)
  firebase.auth().signInWithPopup( new firebase.auth.GoogleAuthProvider()).catch(function (error) { //ou
  //firebase.auth().signInWithRedirect( new firebase.auth.GoogleAuthProvider()).catch(function (error) { 
    alert('Houve um erro ao autenticar usando o Google')
    console.log(error)
    hideItem(loading)
  })
}

//Função que permite a autenticação pelo GitHub
function singInWithGitHub() {
  showItem(loading)
  firebase.auth().signInWithPopup( new firebase.auth.GithubAuthProvider()).catch(function (error) { 
    alert('Houve um erro ao autenticar usando o GitHub')
    console.log(error)
    hideItem(loading)
  })
}

//Função que permite a autenticação pelo Facebook
function singInWithFacebook() {
  showItem(loading)
  firebase.auth().signInWithPopup( new firebase.auth.FacebookAuthProvider()).catch(function (error) { 
    alert('Houve um erro ao autenticar usando o Facebook')
    console.log(error)
    hideItem(loading)
  })
}
