import type SudokuController from "../controller/sudokuController"

class Input {

    private input: HTMLInputElement
    private id: number
    private val: number

    constructor(id: number, controller: SudokuController) {

        this.id = id

        this.input = document.createElement('input')
        this.input.id = id.toString()
        
        // this.input.disabled = true
        this.input.spellcheck = false
        this.input.autocomplete = 'off'

        this.input.classList.add('square')

        this.input.addEventListener('focus', () => controller.selectFamily(id))
        this.input.addEventListener('input', () => {
            const value = this.input.value.match(/\d+/g)?.join('').slice(-1)
            this.input.value = value || ''
        })

    }

    public set value(int: number) {
        this.val = int
        this.input.value = int.toString()
    }

    public get uid(): number { return this.id }

    public get value(): number { return this.val }

    public get element(): HTMLInputElement { return this.input }

}

export default Input