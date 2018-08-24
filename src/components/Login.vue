<template>
    <section class="login hero is-fullheight">
        <div class="hero-body has-text-centered">
            <div class="container has-text-centered">
                    <div class="logo"></div>
                <div class="content">


                    <div
                        v-if="mensagem.visivel"
                        :class="'notification ' + mensagem.tipo">
                        {{ mensagem.texto }}
                    </div>
                    <form v-on:submit.prevent="login()">
                        <div class="field">
                            <p class="control has-icons-left">
                                <input
                                    type="text"
                                    v-model="usuario"
                                    class="input is-medium"
                                    autocomplete="off">
                                <span class="icon is-medium is-left">
                                <fa icon="user"></fa>
                                </span>
                            </p>
                        </div>

                        <div class="field">
                            <p class="control has-icons-left">
                                <input
                                    type="password"
                                    v-model="senha"
                                    class="input is-medium"
                                    autocomplete="off">
                                <span class="icon is-large is-left">
                                <fa icon="lock"></fa>
                                </span>
                            </p>
                        </div>

                        <button id="botaoConecta" class="button is-medium is-dark is-fullwidth">Conectar</button>
                    </form>

                </div>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
    .hero.login {
        background: url('../assets/login-bg.png') center center no-repeat fixed;
        background-size: cover;

        .hero-body {
            background: linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.6));
            .logo {
                    background: url('../assets/logo.png') no-repeat;
                    width: 664px;
                    height: 210px;
                    transform: scale(0.8);
                    margin: 0 auto;
                }


            .content {
                width: 40%;
                margin-left: auto;
                margin-right: auto;

                
                .field {

                    &:last-of-type {
                        margin-top: 30px;
                    }

                    .control {

                            & .icon {
                                color: #000000;
                                margin-left: -15px;
                                margin-top: -5px;
                                font-size: 25px;
                            }
                        .input {
                            background: transparent;
                            border: 0;
                            box-shadow: 0 3px 0 #363636;
                            border-radius: 0;
                        }
                    }
                }

                .button {
                    margin-top: 30px;
                }

                @media screen and (max-width: 600px){
                    width: 80%;
                }
            }
        }
    }
</style>

<script>
export default {
  name: 'Login',
  data: () => ({
    usuario: '',
    senha: '',
    mensagem: {
      visivel: false,
      texto: '',
      tipo: '', // is-danger para erro, is-success para sucesso, is-warning para advertência
    },
  }),
  methods: {
    login() {
			const toggleBotao = () => document.getElementById('botaoConecta').classList.toggle('is-loading');

      if (this.usuario === '' || this.senha === '') {
        this.mensagem = {
          visivel: true,
          texto: 'Por favor, preencha todos os campos!',
          tipo: 'is-danger',
        };
      } else {
				toggleBotao();
        this.$http.post(`${process.env.API}/publico/login/`, {
          login: this.usuario,
          senha: this.senha,
        }).then((res) => {
          this.$parent.USER_TOKEN = res.body.data.token;
          localStorage.setItem('USER_TOKEN', res.body.data.token);
          this.$router.replace('/');
        }, (err) => {
					toggleBotao();
          this.mensagem = {
            visivel: true,
            tipo: 'is-danger',
          };

          if (err.body.status === 401) this.mensagem.texto = 'Usuário ou senha incorretos!';
          else this.mensagem.texto = 'Erro interno, comunique um administrador!';
        });
      }
    },
  },
};
</script>
