import {arrayEquals} from "../helper";

export default {
    props: {
        value: {
            type: String | Array,
            default: '' | []
        },

        options: {
            type: Array,
            default: []
        },

        id: {
            type: String,
            default: ''
        },

        multiple: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            isOpened: false,
            isFocused: false,
            optionsArr: [{id: 0, val: '', active: true}],
            currentSelected: ''
        }
    },

    mounted() {
        //если произошел клик вне селекта
        document.addEventListener('click', e => {
            if(!e.target.matches('.custom-selector__single') && !e.target.matches('.custom-selector__item')) {
                this.close()
            }
        });

        this.updateSelected(true);
    },

    watch: {
        options: {
            handler() {
                this.updateOptions()
            },
            immediate: true
        },

        value: {
            handler(newVal) {
                this.selectOption({ val: newVal }, true);
                this.updateSelected()
            },
        }
    },

    computed: {
      active() {
          return this.multiple ? this.optionsArr.filter(el => el.active) : this.optionsArr.find(el => el.active)
      }
    },

    methods: {
        /**
         *  обновляет локальные опции
         */

        updateOptions() {
            let isValEmpty = !(this.value && this.value.length > 0);

            this.optionsArr = this.options.map((el,index) => {
                let result = {
                    id: index,
                    active: isValEmpty ? index === 0 : this.value === el
                };
                if(typeof el === 'object') {
                    Object.assign(result, {
                        val: el.val, //значение в поле выбора
                        selectedVal: el.selectedVal, //значение в выпадающем списке
                    });
                } else {
                    Object.assign(result, {
                        val: el
                    });
                }

                return result
            })
        },

        /**
         * обновляет локальное значение селекта,
         * инициирует событие к родителю
         * @param emitEvent
         */

        updateSelected(emitEvent = false) {
            let selected = this.multiple
                ? this.active.map(el => el.val)
                : this.active.val;

            this.currentSelected  = this.multiple ? selected.join(', ') : selected;

            if(emitEvent) {
                this.$emit('input', selected);
            }
        },

        /**
         * отмечает в списке опций активные
         * @param num
         * @param val
         * @param force
         * @return {boolean}
         */

        selectOption({ num, val}, force = false){
            let el;

            if(num != null) {
                el = this.optionsArr.find(el => el.id === num)
            } else {
                el = this.optionsArr.find(el => el.val === val)
            }

            if(el == null) {
                return false;
            }

            if(!this.multiple) {
                if(this.active.id !== el.id) {
                    this.active.active = false;
                    el.active = true;
                }
            } else {
                if(force) {
                    this.optionsArr = this.optionsArr.map(el => {
                        el.active = false;
                        return el;
                    })
                }

                //должна остаться хотя бы 1 выбранная опция
                if(!(el.active && this.active.length <= 1)) {
                    el.active = !el.active;
                }
            }
        },

        onFocus() {
            this.isFocused = true;
            this.toggleOpened();
        },

        onClick() {
            //предупреждение повторного открытия и закрытия,
            // в случае активации селекта через tab
            if(!this.isFocused) {
                this.toggleOpened();
            }
            this.isFocused = false
        },

        onBlur(e) {
            if(e.relatedTarget != null) {
                this.close();
            }
        },

        toggleOpened() {
            this.$refs.input.selectionEnd = 0;
            this.isOpened = !this.isOpened;
        },

        close() {
            this.$refs.input.selectionEnd = 0;
            if(this.isOpened) {
                this.isOpened = false
            }
        },

        itemsClick(e) {
            if(!e.target.matches('.custom-selector__item')) {
                return false;
            }

            this.isFocused = false;

            this.selectOption({num: parseInt(e.target.dataset.id)});

            this.updateSelected(true);


            this.close();
        }
    }
};
