import type SudokuController from "../controller/sudokuController"

class Input {

    private input: HTMLInputElement
    private id: number
    private val!: number
    private answer: number | null
    private hide: boolean = false

    constructor(id: number, controller: SudokuController) {

        this.answer = null
        this.id = id

        this.input = document.createElement('input')
        this.input.id = id.toString()
        
        // this.input.disabled = true
        this.input.spellcheck = false
        this.input.autocomplete = 'off'

        this.input.classList.add('square')

        this.input.addEventListener('focus', () => controller.selectFamily(id))
        this.input.addEventListener('input', (e) => {
            const value = this.input.value.match(/\d+/g)?.join('').slice(-1)
            this.input.value = value || ''

            controller.change(e)
            controller.selectFamily(id)
        })

    }

    public set value(int: number) {
        this.val = int
        if (this.answer === null) this.answer = int
        if (int > 0)
            this.input.value = int.toString()
        else
            this.input.value = ""
    }


    public get secret(): number { return this.secret }

    public get uid(): number { return this.id }

    public get value(): number { return this.val }

    public get element(): HTMLInputElement { return this.input }

    public get isShown(): boolean { return !this.hide }

    public toggleHide(): void {
        this.hide = !this.hide
        this.value = 0
    }

    public toString(): string {
        return `[id (number)]: ${this.id},\n[secret (number | null)]: ${this.answer},\n[isShown (boolean)]: ${!this.hide},\n[value (number)]: ${this.val}`
    }

    public get isRight(): boolean { return this.val === this.answer }

}

export default Input