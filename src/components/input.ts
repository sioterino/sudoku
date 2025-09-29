class Input {

    private input: HTMLInputElement

    constructor(value: string) {

        this.input = document.createElement('input')
        this.input.value = value
        
        this.input.disabled = true
        this.input.spellcheck = false
        this.input.autocomplete = 'off'

        this.input.classList.add('square')

    }

    public element(): HTMLInputElement { return this.input }

}

export default Input