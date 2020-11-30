<template>
    <div @click="toastCloseClick">
        <TransitionGroup class="custom-toast" name="custom-toast" tag="div" appear>
            <div class="custom-toast__message custom-toast__message--show"
                 :class="'custom-toast__message--' + item.type"
                 v-for="item in messages" :key="item.id">
                <div class="custom-toast__head">
                    <span class="custom-toast__icon"></span>
                    <span class="custom-toast__close" :data-id="item.id"></span>
                </div>
                <div class="custom-toast__body">
                    {{ item.message }}
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<style src="./customToast.sass" lang="sass"></style>
<script src="./customToast.js"></script>
