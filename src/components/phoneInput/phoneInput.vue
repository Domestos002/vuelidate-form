<template>
    <div class="phone-input">
        <custom-selector
                class="phone-input__select"
                v-model="countryCode"
                :options="maskList">
        </custom-selector>
        <input :id="id" type="text" class="phone-input__input input" v-custom-mask:unmasked="mask"
               :placeholder="placeholder"
               v-model="phone">
    </div>
</template>

<script src="./phoneInput.js"></script>
<style src="./phoneInput.sass" lang="sass"></style>
