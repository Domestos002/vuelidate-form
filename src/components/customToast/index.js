import CustomToast from './customToast.vue'
import { EventBus } from "./event-bus.js";

const CustomToasts = {
    install(Vue) {
        // attach these methods with Vue instance
        Vue.prototype.$toast = {
            success(message) {
                EventBus.$emit("toast-message", {
                    message: message,
                    type: 'success'
                });
            },

            error(message) {
                EventBus.$emit("toast-message", {
                    message: message,
                    type: 'error'
                });
            }
        };

        // register the component
        Vue.component("CustomToast", CustomToast);
    }
};

export default CustomToasts;
