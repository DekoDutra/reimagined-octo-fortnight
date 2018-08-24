<template>
    <div class="dashboard">
        <aside class="menu">
            <a class="logo">
                Somar<strong>ADMIN</strong>
            </a>
            <ul class="menu-list">
                <li>
                    <router-link
                        :class="{'is-active': (this.$route.path === '/'),}"
                        :to="{ path: '/' }">
                        <fa icon="home"></fa>
                        <span>Dashboard</span>
                    </router-link>
                </li>

                <li>
                    <a
                    :class="{
                            'is-active': (this.$route.meta.menu === 'Usuário'),
                            'has-submenu': (true)
                        }"
                    id="usuario"
                    @click="toggleSubmenu('usuario')">
                        <fa icon="users"></fa>
                        <span>Usuário</span>
                        <fa icon="angle-down" class="submenu-icon"></fa>
                    </a>
                    <ul class="submenu" id="usuario">
                        <li>
                            <router-link
                                :class="{'is-active': (this.$route.meta.menu === 'Usuário' && this.$route.meta.submenu === 'Registrar'),}"
                                :to="{ path: '/usuario/registrar' }">
                                <span>Registrar usuário</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                :class="{'is-active': (this.$route.meta.menu === 'Usuário' && this.$route.meta.submenu === 'Gerenciar'),}"
                                :to="{ path: '/usuario/gerenciar' }">
                                <span>Gerenciar usuários</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                :class="{'is-active': (this.$route.meta.menu === 'Usuário' && this.$route.meta.submenu === 'Lembretes'),}"
                                :to="{ path: '/usuario/lembretes' }">
                                <span>Histórico</span>
                            </router-link>
                        </li>
                    </ul>
                </li>

                <li>
                    <a
                    :class="{
                            'is-active': (this.$route.meta.menu === 'Fornecedor'),
                            'has-submenu': (true)
                        }"
                    id="fornecedor"
                    @click="toggleSubmenu('fornecedor')">
                        <fa icon="truck-moving"></fa>
                        <span>Fornecedor</span>
                        <fa icon="angle-down" class="submenu-icon"></fa>
                    </a>
                    <ul class="submenu" id="fornecedor">
                        <li>
                            <router-link
                                :class="{'is-active': (this.$route.meta.menu === 'Fornecedor' && this.$route.meta.submenu === 'Adicionar')}"
                                :to="{ path: '/fornecedor/adicionar' }">
                            Adicionar fornecedor
                            </router-link>
                        </li>
                        <li>
                            <router-link
                            :class="{'is-active': (this.$route.meta.menu === 'Fornecedor' && this.$route.meta.submenu === 'Gerenciar')}"
                            :to="{ path: '/fornecedor/gerenciar' }">
                            Gerenciar fornecedores
                            </router-link>
                        </li>
                    </ul>
                </li>

                <li>
                    <a
                    :class="{
                            'is-active':
                                ['Estatisticas','Produto','Estoque']
                                .includes(this.$route.meta.menu),
                            'has-submenu': (true)
                            }"
                    id="estoque"
                    @click="toggleSubmenu('estoque')">
                        <fa icon="shopping-cart"></fa>
                        <span>Estoque</span>
                        <fa icon="angle-down" class="submenu-icon"></fa>
                    </a>
                    <ul class="submenu" id="estoque">
                        <li>
                            <router-link
                            :class="{'is-active': (this.$route.meta.menu === 'Estatisticas')}"
                            :to="{ path: '/estatisticas' }">
                            Estatisticas
                            </router-link>
                        </li>
                        <li>
                            <router-link
                            :class="{'is-active': (this.$route.meta.menu === 'Produto')}"
                            :to="{ path: '/produto' }">
                            Modelo de produto
                            </router-link>
                        </li>
                        <li>
                            <router-link
                            :class="{'is-active': (this.$route.meta.menu === 'Estoque')}"
                            :to="{ path: '/estoque' }">
                            Estoque
                            </router-link>
                        </li>
                    </ul>
                </li>
                <li>
                    <a @click="sair">
                        <fa icon="sign-in-alt"></fa>
                        <span>Sair</span>
                    </a>
                </li>
            </ul>

            <div class="CloudForest">
                <a href="https://somar.ads.cloudforest.com.br/">2018 - Desenvolvido por CloudForest</a>
            </div>
        </aside>

        <div class="container">
            <div class="top"> <!-- Topo da aplicação com data, notificações e dados do usuário -->
                {{ dataAtual }}

                <div class="right-side">
                    <span>{{ user.nome }}</span>

                    <div
                        class="dropdown is-right notifications"
                        :class="{ 'is-active': lembrete.aberto }" v-click-outside="hideLembrete">
                        <div class="dropdown-trigger">
                            <a
                                :class="{ 'has-notification': lembrete.temNova }"
                                @click="lembrete.aberto = !lembrete.aberto, verificarLembretes()">
                                <fa icon="bell"></fa>
                            </a>
                        </div>
                        <div class="dropdown-menu" role="menu" >
                            <div class="dropdown-content">
                                <div
                                  v-if="lembretes.length === 0"
                                  class="dropdown-item">
                                  Nenhum lembrete
                                </div>

                                <div v-else v-for="lembrete in lembretes" :key="lembrete.id">
                                  <div class="dropdown-item">
                                      <p>{{ lembrete.texto }}</p>
                                      <small>{{ tempoIntervalo(lembrete.dataHora) }}</small>
									  <span class="tag is-light">Adicionado por {{ lembrete.usuarioExecutor.nome }}</span>
                                  </div>
                                  <hr class="dropdown-divider">
                                </div>

                                <div class="dropdown-item">
                                    <router-link :to="{ path: '/usuario/lembretes' }">
                                        <div
                                            @click="lembrete.aberto = false"
                                            class="is-size-7 has-text-link is-fullwidth has-text-centered">Ver todos lembretes</div>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="user-photo">
                        <img :src="(user.fotoUrl !== null) ? user.fotoUrl : 'https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_960_720.png'" alt="Foto do usuário">
                    </div>
                </div>
            </div>

            <router-view class="router"></router-view>
            <!-- Conteudo a ser carregado da aplicação -->
        </div>
    </div>
</template>


<style lang="scss" scoped>
    $top-height: auto;
    $white: #e2e2e2;
    $dark: #666;
    $menu-color: #dddddd;
    $menu-second-color: #26759B;

    .dashboard {
        display: flex;
        // flex-wrap: nowrap;
        // justify-content: center;
        min-height: 100vh;
        position: relative;
        // min-width: 100vw;

        .menu {
            flex: 1 0 20%;
            max-width: 20%;
            min-height: 100vh;
            background: $menu-color;

            ul.menu-list {
                li {
                    a {
                        color: $dark !important;
                        padding: 15px 10px;
                        border-radius: 0;
                        position: relative;

                        span {
                            margin-left: 10px;
                        }

                        &:hover {
                            background: $menu-color - 5;
                        }

                        &.is-active {
                            background: $menu-color - 20;
                        }

                        &.has-submenu {
                            .submenu-icon {
                                position: absolute;
                                right: 15px;
                                font-size: 20px;
                                transition: all 0.2s;
                                color: $dark;
                            }
                        }

                        &.is-opened {
                            .submenu-icon {
                                transform: rotate(-180deg);
                                color: $dark;
                            }
                        }
                    }

                    ul.submenu {
                        font-size: 12px;
                        border-color: $menu-color - 20;
                        display: none;
                        &.is-opened {
                            display: block;
                        }

                        a {
                            border-radius: 3px;
                        }
                    }
                }
            }

            .logo {
                background: $menu-second-color;
                display: block;
                padding: 15px;
                text-align: center;
                color: $white;
                min-height: 50px;
                max-height: 50px;
            }
        }

        .container {
            flex: 1 0 80%;
            max-width: 100vw;
            margin: 0;

            .top {
                background: $menu-second-color + 20;
                padding: 15px;
                width: 100%;
                color: $white;
                min-height: 50px;
                max-height: 50px;
                position: relative;


                .right-side {
                    position: absolute;
                    right: 10px;
                    top: 5px;

                    span {
                        display: inline-block;
                        vertical-align: middle;
                        padding-right: 15px;
                    }

                    .dropdown {
                        display: inline-block;
                        vertical-align: middle;
                        margin-right: 15px;

                        &.is-active {
                            a {
                                color: $white;
                            }
                        }
                        a {
                            color: #333;
                            font-size: 20px;

                            &.has-notification {
                                &::after {
                                    content: ' ';
                                    width: 10px;
                                    height: 10px;
                                    background: #cd3d3d;
                                    position: absolute;
                                    border-radius: 50%;
                                    top: 5px;
                                    right: -5px;
                                }
                            }
                        }

                        .dropdown-menu {
                            margin-top: 10px;
                            min-width: 20rem;

                            &:after{
                                content: "";
                                width: 0;
                                height: 0;
                                position: absolute;
                                top: -15px;
                                right: 2px;
                                $border: 10px;
                                border-top: $border solid transparent;
                                border-right: $border solid transparent;
                                border-bottom: $border solid #fff;
                                border-left: $border solid transparent;
                            }

                            &:before{
                                content: "";
                                width: 0;
                                height: 0;
                                position: absolute;
                                top: -18px;
                                right: 1px;
                                $border: 11px;
                                border-top: $border solid transparent;
                                border-right: $border solid transparent;
                                border-bottom: $border solid #ddd;
                                border-left: $border solid transparent;
                            }

                            .dropdown-item {
                                font-size: 12px;
                            }
                        }
                    }

                    .user-photo {
                        display: inline-block;
                        vertical-align: middle;

                        img {
                            width: 40px;
                            height: 40px;
                            border-radius: 50%;
                        }
                    }
                }
            }

            .router {
                margin: 30px;
            }
        }
    }

    .CloudForest{
        width: 20%;
        text-align: center;
        position: absolute;
        bottom: 10px;
        font-size: 12px;

        a {
            color: #666666;

            &:hover {
                color: $menu-second-color;
            }
        }
    }
</style>

<script>
import jwt from 'jsonwebtoken';
import Vue from 'vue'
import vClickOutside from 'v-click-outside'

Vue.use(vClickOutside)

export default {
  name: 'Dashboard',

  data: () => ({
    lembrete: {
      aberto: false,
      temNova: false,
    },
    user: {},
    dataAtual: '...',
    lembretes: [],
  }),

  beforeMount() {
    const id = jwt.decode(localStorage.getItem('USER_TOKEN')).id_usuario;

    this.$http.get(`${process.env.API}/usuarios/buscar-usuario-por-id?idUsuario=${id}`,{
        headers: { Authorization: localStorage.getItem('USER_TOKEN') }
    }).then((res) => {
      this.user = res.body;
    }, () => {
      this.sair();
    });
  },

  mounted() {
    this.data();
    this.verificarLembretes();
  },

  watch: {
    lembretes: function(novoLembrete) {
      if(novoLembrete) {
        this.lembrete.temNova = true;
      }
    },
  },

  methods: {
    hideLembrete() {
      this.lembrete.aberto = false;
    },

    data(){
      setInterval(() => {
      let data = new Date();

      let dia = data.getDate();
      dia = (dia < 10) ? `0${dia}` : dia;
      let mes = data.getMonth()+1;
      mes = (mes < 10) ? `0${mes}` : mes;
      let ano = data.getFullYear();

      let hora = data.getHours();
      hora = (hora < 10) ? `0${hora}` : hora;
      let minuto = data.getMinutes();
      minuto = (minuto < 10) ? `0${minuto}` : minuto;

      this.dataAtual = `${dia}/${mes}/${ano} ${hora}:${minuto}`;
      }, 3000)

    },

    verificarLembretes() {
      setInterval(() => {
        this.$http.get(`/servidor/lembrete`, {
          headers: { Authorization: localStorage.getItem('USER_TOKEN') }
        })
        .then((res) => {
          if(res.body){
            this.$http.get(`${process.env.API}/lembrete/listar-novos`, {
              headers: { Authorization: localStorage.getItem('USER_TOKEN') },
            })
            .then((resp) => {
              this.lembretes = this.lembretes.concat(resp.body.data);
            })
          }
        });
        clearInterval();
      }, 10000);
    },

    toggleSubmenu(id) {
      const menus = document.querySelectorAll(`#${id}`);
      menus.forEach((menu) => {
        menu.classList.toggle('is-opened');
      });
    },

    sair() {
      localStorage.removeItem('USER_TOKEN');
      this.$router.replace('/login');
    },
  },
};
</script>
