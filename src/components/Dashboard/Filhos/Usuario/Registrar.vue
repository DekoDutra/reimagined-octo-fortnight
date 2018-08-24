    <template>
  <div class="registrarUsuario box">
    <h1 class="title is-5">Registrar usuário</h1>

    <form v-on:submit.prevent="registrarUsuario">
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label>Nome</label>
                    <div class="control">
                        <input
                            type="text"
                            class="input is-fullwidth"
                            v-model="usuario.nome"
                            placeholder="Digite um nome"
                            required
                        />
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="field">
                    <label>E-mail</label>
                    <div class="control">
                        <input
                            type="email"
                            class="input is-fullwidth"
                            v-model="usuario.email"
                            placeholder="Digite um email"
                            required
                        />
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="field">
                    <label>Usuário</label>
                    <div class="control">
                        <input
                            type="text"
                            class="input is-fullwidth"
                            v-model="usuario.login"
                            placeholder="Digite um usuário"
                            required
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <div class="field">
                    <label>Senha</label>
                    <div class="control">
                        <input
                            type="password"
                            class="input is-fullwidth"
                            v-model="usuario.senha"
                            placeholder="Digite uma senha"
                            required
                        />
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="field">
                    <label>Repita a senha</label>
                    <div class="control">
                        <input
                            type="password"
                            class="input is-fullwidth"
                            v-model="usuario.repitaSenha"
                            placeholder="Repita a senha digitada"
                            required
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <div class="field">
                    <label>Telefone</label>
                    <div class="control">
                        <the-mask
                            type="text"
                            class="input is-fullwidth"
                            v-model="usuario.telefone"
                            pattern=".{14,15}"
                            title="O número de telefone deve conter 10 ou 11 dígitos (com DDD)"
                            :mask="['(##) ####-####', '(##) #####-####']"
                            placeholder="Digite um telefone"
                            required
                        />
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="field">
                    <label>RG</label>
                    <div class="control">
                        <input
                            type="text"
                            class="input is-fullwidth"
                            v-model="usuario.rg"
                            placeholder="Digite um RG"
                            required
                        />
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="field">
                    <label>CPF</label>
                    <div class="control">
                        <the-mask
                            class="input is-fullwidth"
                            pattern=".{14}"
                            title="O número de CPF deve conter 11 dígitos"
                            :mask="['###.###.###-##']"
                            v-model="usuario.cpf"
                            placeholder="Digite um CPF"
                            required
                        />
                    </div>
                </div>
            </div>

            <div class="column">
                <div class="field">
                    <label>Tipo</label>
                    <div class="control">
                        <div class="select is-fullwidth">
                            <select v-model="usuario.tipo">
                                <option value="ADM">Administrador</option>
                                <option value="FIN">Financeiro</option>
                                <option value="COM">Comercial</option>
                                <option value="RH">RH</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <button type="submit" class="button is-warning">Enviar</button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'AdicionarFornecedor',

  data: () => ({
    usuario: {
      nome: '',
      login: '',
      senha: '',
      repitaSenha: '',
      email: '',
      fotoUrl: null,
      telefone: '',
      rg: '',
      cpf: '',
      tipo: 'ADM',
    },
  }),

  methods: {
    registrarUsuario() {
      let erros = 0;

      const vm = this;
      const usuario = vm.usuario;

      Object.keys(usuario).map(function verificarCampos(chave) {
       if (usuario[chave] === '') {
          this.openToast('Preencha todos os campos!');
          erros += 1;
        }
      });

      if(usuario.senha.length < 6) {
        this.openToast('Digite uma senha com seis caracteres ou mais!');
        erros += 1;
      } else if (usuario.senha !== usuario.repitaSenha){
        this.openToast('Digite senhas iguais!')
        erros += 1;
      }

      if (erros === 0) {
        this.toggleLoad();

        delete usuario.repitaSenha;

        this.$http.post(`${process.env.API}/usuarios/novo-usuario`, usuario, {
          headers: { Authorization: localStorage.getItem('USER_TOKEN') }
        })
        .then((res) => {
          this.toggleLoad();
          this.openToast('Usuário registrado com sucesso!');
        }, () => {
          this.toggleLoad();
          this.openToast();
        });
      }
    },

    processarFoto(e) {
      this.usuario.fotoUrl = e.target.files[0];
    },
  },
};
</script>
