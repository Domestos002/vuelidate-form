import { required, minLength } from 'vuelidate/lib/validators'
import customSelector from '../customSelector/customSelector.vue'
import phoneInput from '../phoneInput/phoneInput.vue'

const formData = {
    surname: '',
    name: '',
    patronymic: '',
    birthday: '',
    phone: {},
    gender: 'Жен',
    genderOptions: ['Муж', 'Жен'],
    group: 'VIP',
    groupOptions: ['VIP', 'Проблемные', 'ОМС'],
    doctor: 'Иванов',
    doctorOptions: ['Иванов', 'Захаров', 'Чернышева'],
    sendSms: false,
};

export default {
    data() {
        return Object.assign({}, formData, {
            phoneLength: 0,
            unmaskedBirthday: '',
        })
    },

    components: {
      customSelector, phoneInput
    },

    mounted() {
        for (let key in formData) {
            if (formData.hasOwnProperty(key)) {
                this[key] = formData[key];
            }
        }
    },

    validations() {
        return {
            surname: {
                required,
            },
            name: {
                required,
            },
            unmaskedBirthday: {
                required,
                minLength: minLength(8)
            },
            phone: {
                unmasked: {
                    required,
                    minLength: minLength(this.phoneLength)
                }
            }
        }
    },

    methods: {
        resetForm() {
            for (let key in formData) {
                if (formData.hasOwnProperty(key)) {
                    if(this[key] !== undefined) {
                        this[key] = formData[key];
                    }
                }
            }

            this.$refs.userPhone.reset();

            this.$nextTick(() => {
                this.$v.$reset();
            })
        },

        onSubmit() {
            this.$v.$touch();

            if (this.$v.$invalid) {
                this.$toast.error('Пожалуйста, проверьте введенные данные');
            } else {
                this.$toast.success('Новый клиент успешно создан');
                this.resetForm();
            }
        },
    }
}
