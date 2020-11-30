<template>
    <div id="app" class="site-wrapper">
        <custom-toast></custom-toast>
        <user-form></user-form>
    </div>
</template>

<style src="./assets/sass/base.sass" lang="sass"></style>

<script>
import UserForm from './components/userForm/userForm.vue'

export default {
  name: 'App',
  components: {
      'user-form': UserForm
  }
}
</script>


