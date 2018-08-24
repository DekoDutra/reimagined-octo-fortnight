import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';

import Error from '@/components/Error';

import Dashboard from '@/components/Dashboard/Dashboard';
// import Configuracoes from '@/components/Dashboard/Filhos/Configuracoes';
import RegistrarUsuario from '@/components/Dashboard/Filhos/Usuario/Registrar';
import GerenciarUsuario from '@/components/Dashboard/Filhos/Usuario/Gerenciar';
import TodosLembretes from '@/components/Dashboard/Filhos/Usuario/Lembretes';

// Imports de estoque
import Estoque from '@/components/Dashboard/Filhos/Estoque/Estoque/Estoque';
import AdicionarEstoque from '@/components/Dashboard/Filhos/Estoque/Estoque/Adicionar';
import GerenciarEstoque from '@/components/Dashboard/Filhos/Estoque/Estoque/Gerenciar';
import Estatisticas from '@/components/Dashboard/Filhos/Estoque/Estatisticas/Estatisticas';
import EstatisticasCompletas from '@/components/Dashboard/Filhos/Estoque/Estatisticas/EstatisticasCompletas';

import Produto from '@/components/Dashboard/Filhos/Estoque/Produto/Produto';
import NovoProduto from '@/components/Dashboard/Filhos/Estoque/Produto/Novo';
import GerenciarProdutos from '@/components/Dashboard/Filhos/Estoque/Produto/Gerenciar';

import Fornecedor from '@/components/Dashboard/Filhos/Estoque/Fornecedor/Fornecedor';
import AdicionarFornecedor from '@/components/Dashboard/Filhos/Estoque/Fornecedor/Adicionar';
import GerenciarFornecedores from '@/components/Dashboard/Filhos/Estoque/Fornecedor/Gerenciar';

// Imports de RH
import Funcionarios from '@/components/Dashboard/Filhos/RecursosHumanos/Funcionarios/Funcionarios';
import AdicionarFuncionario from '@/components/Dashboard/Filhos/RecursosHumanos/Funcionarios/Adicionar';
import GerenciarFuncionarios from '@/components/Dashboard/Filhos/RecursosHumanos/Funcionarios/Gerenciar';


// import TestarPdf from '@/components/TesteGerarPdf';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        // {
        //   path: '/asd',
        //   component: TestarPdf,
        // },
        {
          path: '/',
          name: 'Dashboard',
          component: Estatisticas,
        },
        {
          path: '/usuario/registrar',
          name: 'Registrar usuário',
          component: RegistrarUsuario,
          meta: { menu: 'Usuário', submenu: 'Registrar' },
        },
        {
          path: '/usuario/gerenciar',
          name: 'Gerenciar usuarios',
          component: GerenciarUsuario,
          meta: { menu: 'Usuário', submenu: 'Gerenciar' },
        },
        {
          path: '/usuario/lembretes',
          name: 'Todos os lembrestes',
          component: TodosLembretes,
          meta: { menu: 'Usuário', submenu: 'Lembretes' },
        },
        {
          path: '/usuario/gerenciar/excluir/:id',
          name: 'Gerenciar usuarios',
          component: GerenciarUsuario,
          meta: { menu: 'Usuário', submenu: 'Gerenciar' },
        },
        {
          path: '/estatisticas',
          name: 'Estatisticas',
          component: EstatisticasCompletas,
          meta: { menu: 'Estatisticas' },
        },
        {
          path: '/fornecedor',
          name: 'Fornecedor',
          component: Fornecedor,
          meta: { menu: 'Fornecedor' },
          children: [
            {
              path: '/fornecedor/adicionar/',
              name: 'Adicionar Fornecedor',
              component: AdicionarFornecedor,
              meta: { menu: 'Fornecedor', submenu: 'Adicionar' },
            },
            {
              path: '/fornecedor/gerenciar',
              name: 'Gerenciar Fornecedores',
              component: GerenciarFornecedores,
              meta: { menu: 'Fornecedor', submenu: 'Gerenciar' },
            },
            {
              path: '/fornecedor/gerenciar/editar/:id',
              name: 'Editar fornecedor',
              component: GerenciarFornecedores,
              meta: { menu: 'Fornecedor', submenu: 'Gerenciar' },
            },
            {
              path: '/fornecedor/gerenciar/excluir/:id',
              name: 'Excluir fornecedor',
              component: GerenciarFornecedores,
              meta: { menu: 'Fornecedor', submenu: 'Gerenciar' },
            },
            {
              path: '/fornecedor/gerenciar/ver/:id',
              name: 'Ver fornecedor',
              component: GerenciarFornecedores,
              meta: { menu: 'Fornecedor', submenu: 'Gerenciar' },
            },
          ],
        },
        {
          path: '/rh',
          name: 'Recursos Humanos',
          component: Funcionarios,
          meta: { menu: 'Funcionarios' },
          children: [
            {
              path: '/rh/funcionarios',
              name: 'Funcionarios',
              component: Funcionarios,
              meta: { menu: 'RH', submenu: 'Funcionarios' },
              children: [
                {
                  path: '/rh/funcionarios/adicionar',
                  name: 'Adicionar Funcionário',
                  component: AdicionarFuncionario,
                  meta: { menu: 'RH', submenu: 'Funcionarios' },
                },
                {
                  path: '/rh/funcionarios/gerenciar',
                  name: 'Gerenciar Funcionarios',
                  component: GerenciarFuncionarios,
                  meta: { menu: 'RH', submenu: 'Funcionarios' },
                },
                {
                  path: '/rh/funcionarios/gerenciar/:acao/:id',
                  name: 'Ação Funcionarios',
                  component: GerenciarFuncionarios,
                  meta: { menu: 'RH', submenu: 'Funcionarios' },
                },
              ],

            },
          ],
        },
        {
          path: '/estoque',
          name: 'Estoque',
          component: Estoque,
          meta: { menu: 'Estoque' },
          children: [
            {
              path: '/estoque/adicionar/',
              name: 'Adicionar ao Estoque',
              component: AdicionarEstoque,
              meta: { menu: 'Estoque' },
            },
            {
              path: '/estoque/gerenciar',
              name: 'Gerenciar Estoque',
              component: GerenciarEstoque,
              meta: { menu: 'Estoque' },
            },
            {
              path: '/estoque/gerenciar/inserir/:id',
              name: 'Inserir mais',
              component: GerenciarEstoque,
              meta: { menu: 'Estoque' },
            },
            {
              path: '/estoque/gerenciar/baixa/:id',
              name: 'Dar baixa',
              component: GerenciarEstoque,
              meta: { menu: 'Estoque' },
            },
            {
              path: '/estoque/gerenciar/perdido/:id',
              name: 'Declarar perdido',
              component: GerenciarEstoque,
              meta: { menu: 'Estoque' },
            },
          ],
        },
        {
          path: '/produto',
          name: 'Produto',
          component: Produto,
          meta: { menu: 'Produto' },
          children: [
            {
              path: '/produto/novo/',
              name: 'Novo Produto',
              component: NovoProduto,
              meta: { menu: 'Produto' },
            },
            {
              path: '/produto/gerenciar',
              name: 'Gerenciar Produtos',
              component: GerenciarProdutos,
              meta: { menu: 'Produto' },
            },
            {
              path: '/produto/gerenciar/editar/:tipo/:id',
              name: 'Editar produto',
              component: GerenciarProdutos,
              meta: { menu: 'Produto' },
            },
            {
              path: '/produto/gerenciar/excluir/:tipo/:id',
              name: 'Excluir produto',
              component: GerenciarProdutos,
              meta: { menu: 'Produto' },
            },
          ],
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '*',
      name: 'Error',
      component: Error,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('USER_TOKEN');
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !token) next('/login');
  else if (!requiresAuth && token) next('/');
  else next();
});

export default router;
