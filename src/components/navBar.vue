<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('');

const router = useRouter()
const routeToCharacterView = () => {
	router.replace('/character/' + username.value);
}
</script>

<template>
  <!--Navbar-->
  <div class="block">

  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
	  <router-link class="navbar-item" :to="
	  {
		name: 'home'
	  }
	  "><img src="../assets/icon200.png"></img>
	  </router-link>
    
	  <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
		<span aria-hidden="true"></span>
		<span aria-hidden="true"></span>
		<span aria-hidden="true"></span>
		<span aria-hidden="true"></span>
	  </a>
    </div>
    <div id="navbarBasic" class="navbar-menu">
      <div class="navbar-start">
		<div class="navbar-item">
			<div class="control">
				<form @submit.stop.prevent="routeToCharacterView">
					<input class="input" type="text" placeholder="Zezima" v-model="username"></input>
				</form>
			</div>
		</div>
      </div>
    </div>
  </nav>

  </div>
</template>
