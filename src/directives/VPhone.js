//https://gist.github.com/Maxim-Kolmogorov/d867767c976532fea60ee4a1abd725e7 - источник маски для телефона

export default {
    mounted(el) {
        function replaceNumberForInput(value) {
            let val = ''
            const x = value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)

            if (x[1] === '7' || x[1] === '8') {
                x[1] = '+7'
            } else {
                x[2] = x[1]
                x[1] = '+7'
            }

            val = !x[3] ? x[1] + ' (' + x[2] : x[1] + ' (' + x[2] + ') ' + x[3] + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '')

            return val
        }

        function replaceNumberForPaste(value) {
            const r = value.replace(/\D/g, '')
            let val = r
            if (val.charAt(0) === '7') {
                val = '8' + val.slice(1)
            }
            return replaceNumberForInput(val)
        }

        el.oninput = function (e) {
            if (!e.isTrusted) {
                return
            }
            this.value = replaceNumberForInput(this.value)
        }

        el.onpaste = function () {
            setTimeout(() => {
                const pasteVal = el.value
                this.value = replaceNumberForPaste(pasteVal)
            })
        }
    },
    name: 'phone'
}