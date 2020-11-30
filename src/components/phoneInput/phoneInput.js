import customSelector from '../customSelector/customSelector.vue'
import masks from './masks'

export default {
    props: {
        value: {
            type: Object,
            default: {}
        },
        id: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            countryCode: '',
            unmasked: '',
            dirty: false,
            phone: '',
            maskList : masks,
        }
    },

    components: {
        customSelector
    },

    computed: {
        mask() {
            let countryCode = this.countryCode ? this.countryCode : this.maskList[0].val;
            let mask = this.maskList.find(el => el.val === countryCode);

            if(this.unmasked.length > 0 && !this.dirty) {
                this.dirty = true;
            }

            if(this.dirty)  {
                this.$emit('input', {
                    unmasked: this.unmasked,
                    value: `${mask.val}${this.phone}`,
                    length: this.getMaskLength(mask.mask)
                });
            }

            return mask.mask;
        },

        placeholder() {
            let countryCode = this.countryCode ? this.countryCode : this.maskList[0].val;
            return this.maskList.find(el => el.val === countryCode).placeholder
        }
    },

    methods: {
        getMaskLength(mask) {
            return Array.from(mask).filter(el => el === '#').length
        },
        reset() {
            this.phone = '';
            this.countryCode = this.maskList[0].val
        }
    }
}
