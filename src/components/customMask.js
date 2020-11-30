function format(value, mask) {
    let output = {
        unmasked: '',
        masked: '',
    };

    let valueIndex = 0;
    let maskIndex = 0;
    let accumulator = '';

    while (maskIndex < mask.length) {
        const maskChar = mask[maskIndex];
        let char = value[valueIndex];

        //если вводимые символы кончились
        if (!char) break;


        if (maskChar === '#') {
            if (/\d/.test(char)) {
                output.unmasked += char;
                output.masked += accumulator + char;

                accumulator = '';
                maskIndex++
            }
            valueIndex++
        } else {
            accumulator += maskChar;
            if (char === maskChar) {
                valueIndex++
            }

            maskIndex++
        }
    }

    return output
}

function updateValue(el, value, vnode, arg) {
    let formatted = format(el.value, value);
    vnode.context[arg] = formatted.unmasked;
    el.value = formatted.masked;
}

export default {
    bind(el, {value, arg}, vnode) {
        updateValue(el, value, vnode, arg);
    },
    update(el, {value, arg}, vnode) {
        let event = new Event("input", { bubbles: true });
        updateValue(el, value, vnode, arg);
        el.dispatchEvent(event);

        if(vnode.context.$v != null) {
            if (el.value.length > 0
                && !vnode.context.$v[arg].$dirty) {
                vnode.context.$v[arg].$touch();
            }
        }
    }
};
