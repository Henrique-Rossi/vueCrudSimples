<template>
  <div id="app" class="container">
    <h1>HTTP com Axios</h1>
    <b-alert
      show
      dismissible
      v-for="mensagem in mensagens"
      :key="mensagem.texto"
      :variant="mensagem.tipo"
      >{{ mensagem.texto }}</b-alert
    >
    <b-card>
      <b-form-group label="Nome:">
        <b-form-input
          type="text"
          size="lg"
          v-model="usuario.nome"
          placeholder="Informe o Nome"
        ></b-form-input>
      </b-form-group>

      <b-form-group label="E-mail:">
        <b-form-input
          type="email"
          size="lg"
          v-model="usuario.email"
          placeholder="Informe o E-mail"
        ></b-form-input>
      </b-form-group>
      <hr />
      <b-button
        @click="salvar"
        size="lg"
        variant="primary"
        :class="{ success: id }"
        >Salvar</b-button
      >
      <b-button @click="Consultar" size="lg" variant="success" class="ml-2"
        >Consultar Dados</b-button
      >
    </b-card>
    <hr />
    <b-list-group>
      <b-list-group-item v-for="(usuario, id) in usuarios" :key="id">
        <strong>Nome:</strong>{{ usuario.nome }} <br />
        <strong>Email:</strong>{{ usuario.email }} <br />
        <strong>ID:</strong>{{ id }} <br />
        <b-button variant="warning" size="lg" @click="Update(id)"
          >Atualizar</b-button
        >
        <b-button variant="danger" size="lg" class="ml-2" @click="Excluir(id)"
          >Excluir</b-button
        >
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mensagens: [],
      usuarios: [],
      id: null,
      usuario: {
        nome: "",
        email: "",
      },
    };
  },
  methods: {
    Clear() {
      this.usuario.nome = "";
      this.usuario.email = "";
      this.id = null;
      this.mensagens = [];
    },
    salvar() {
      const metodo = this.id ? "patch" : "post";
      const finalUrl = this.id ? `/${this.id}.json` : ".json";
      this.$http[metodo](`/usuarios${finalUrl}`, this.usuario).then(() => {
        this.Clear();
        this.mensagens.push({
          texto: "Operação realizada com sucesso",
          tipo: "success",
        });
      });
    },
    Consultar() {
      this.$http("usuarios.json", this.usuario).then((res) => {
        this.usuarios = res.data;
      });
    },
    Update(id) {
      this.id = id;
      this.usuario = { ...this.usuarios[id] };
    },

    Excluir(id) {
      this.$http
        .delete(`/usuarios/${id}.json`)
        .then(() => {
          this.Clear(),
            this.Consultar(),
            this.mensagens.push({
              texto: "Operação realizada com sucesso",
              tipo: "danger",
            });
        })
        .catch((err) => {
          this.mensagens.push({
            texto: "Ocorreu algum erro ao excluir" + err,
            tipo: "danger",
          });
        });
    },
  },
  // created(){
  // 	this.$http.post('usuario.json',{
  // 		nome:'henriquesds',
  // 		email:'dsdsdds'

  // 	}
  // 	).then()
  // }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1.5rem;
}

#app h1 {
  text-align: center;
  margin: 50px;
}
.save {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
.att {
  color: #212529;
  background-color: #ffc107;
  border-color: #ffc107;
}
</style>
