//Traduz parea português brasileiro a autenticação do Firebase
firebase.auth().languageCode = "pt-BR";

//Função que trata a submissão do formulário de autenticação
authForm.onsubmit = function (evento) {
  showItem(loading);
  event.preventDefault();
  if (authForm.submitAuthForm.innerHTML == "Acessar") {
    firebase
      .auth()
      .signInWithEmailAndPassword(authForm.email.value, authForm.password.value)
      .catch(function (error) {
        showError("Falha no acesso: ", error);
      });
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        authForm.email.value,
        authForm.password.value
      )
      .catch(function (error) {
        showError("Falha no cadastro: ", error);
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
      showError("Falha ao sair da conta: ", error);
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
        "E-mail de verificação foi enviado para " +
          user.email +
          "Verifique a sua caixa de entrada!"
      );
    })
    .catch(function (error) {
      showError("Falha ao enviar mensagem de verificação de e-mail: ", error);
    })
    .finally(function () {
      hideItem(loading);
    });
}

//Função que permite o usuário redefinir a senha dele
function sendPasswordResetEmail() {
  var email = prompt(
    "Redefinir senha! Informe o seu endereço de E-mail.",
    authForm.email.value
  );
  if (email) {
    showItem(loading);
    firebase
      .auth()
      .sendPasswordResetEmail(email, actionCodeSettings)
      .then(function () {
        alert(
          "E-mail de redefinição de senha foi enviado para: " + email + "."
        );
      })
      .catch(function (error) {
        showError("Falha ao enviar e-mail de redefinição de senha: ", error);
      })
      .finally(function () {
        hideItem(loading);
      });
  } else {
    alert("É preciso preencher o campo de E-mail para redefinir a senha!");
  }
}

//Função que permite a autenticação pelo Google
function singInWithGoogle() {
  showItem(loading);
  firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .catch(function (error) {
      //ou
      //firebase.auth().signInWithRedirect( new firebase.auth.GoogleAuthProvider()).catch(function (error) {
      showError("Falha ao autenticar usando o Google: ", error)
    });
}

//Função que permite a autenticação pelo GitHub
function singInWithGitHub() {
  showItem(loading);
  firebase
    .auth()
    .signInWithPopup(new firebase.auth.GithubAuthProvider())
    .catch(function (error) {
      showError("Falha ao autenticar usando o GitHub: ", error)
    });
}

//Função que permite a autenticação pelo Facebook
function singInWithFacebook() {
  showItem(loading);
  firebase
    .auth()
    .signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .catch(function (error) {
      showError("Falha ao autenticar usando o Facebook: ", error)
    });
}

//Função que permite atualizar nomes de usuários
function updateUserName() {
  var newUserName = prompt(
    "Informe um novo nome de usuário",
    userName.innerHTML
  );
  if (newUserName && newUserName != "") {
    userName.innerHTML = newUserName;
    showItem(loading);
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: newUserName,
      })
      .catch(function (error) {
        showError("Falha ao atualizar o nome do usuário: ", error)
      })
      .finally(function () {
        hideItem(loading);
      });
  } else {
    alert("O nome do usuário não pode está em branco");
  }
}

//Função que permite remover contas de usuário
function deleteUserAccount() {
  var confirmation = confirm("Realmente deseja excluir sua conta?");
  if (confirmation) {
    showItem(loading);
    firebase
      .auth()
      .currentUser.delete()
      .then(function () {
        alert("Conta foi removida com sucesso!");
      })
      .catch(function (error) {
        showError("Falha ao remover a sua conta!: ", error)
      })
      .finally(function () {
        hideItem(loading);
      });
  }
}
