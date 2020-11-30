<template>
    <div class="custom-selector" :class="isOpened ? 'custom-selector--opened' : ''">
        <!-- элемент для открытия селекта через tab -->
        <div class="custom-selector__filler" contentEditable @focus="onFocus" @blur="onBlur"></div>

        <div class="custom-selector__single-wrapper">
            <input :id="id" readonly tabindex="-1" class="custom-selector__single" ref="input"
                   v-model="currentSelected"
                   @click="onClick">
        </div>

        <div class="custom-selector__dropdown" v-if="isOpened">
            <div class="custom-selector__list" @click="itemsClick">
                <div class="custom-selector__item"
                     :class="item.active ? 'custom-selector__item--active' : ''"
                     :data-id="item.id" :key="item.id" v-for="item in optionsArr">
                    {{ item.selectedVal ? item.selectedVal : item.val }}
                </div>
            </div>
        </div>
    </div>
</template>

<style src="./customSelector.sass" lang="sass"></style>
<script src="./customSelector.js"></script>
