import Cube from "../components/cube"
import Input from "../components/input"
import Table from "../components/table"

type Difficulty = 'EASY' | 'MEDIUM' | 'HARD'

class SudokuController {

    private body: HTMLBodyElement

    private inputs!: Input[]
    private cubes!: Cube[]
    private table!: Table
    private difficulty: Difficulty
    
    constructor(body: HTMLBodyElement, difficulty: Difficulty) {
        this.body = body
        this.difficulty = difficulty
    }

    private generateInputs(): Input[] {
        const aux: Input[] = []
        for (let i = 0; i < 81; i++)
          aux.push(new Input(i, this))
        return aux
    }

    private generateCubes(): Cube[] {
        const aux: Cube[] = []

        for (let blockRow = 0; blockRow < 3; blockRow++) {
            for (let blockCol = 0; blockCol < 3; blockCol++) {
                const chunk: Input[] = []

                for (let r = 0; r < 3; r++) {
                    for (let c = 0; c < 3; c++) {
                        const row = blockRow * 3 + r
                        const col = blockCol * 3 + c
                        const idx = row * 9 + col
                        chunk.push(this.inputs[idx])
                    }
                }

                aux.push(new Cube(chunk))
            }
        }

        return aux
    }


    private generateTable(): Table {
        if (this.cubes.length === 0) 
            throw new Error("The amount of inputs and cubes is wrong and the table couldn't be created.")
        return new Table(this.cubes)
    }

    private createSudoku(): void {
        const canPlace = (value: number, idx: number): boolean => {
            const row = Math.floor(idx / 9);
            const col = idx % 9;
            const cube = Math.floor(row / 3) * 3 + Math.floor(col / 3);

            for (const input of this.inputs) {
                const r = Math.floor(input.uid / 9);
                const c = input.uid % 9;
                const q = Math.floor(r / 3) * 3 + Math.floor(c / 3);

                const isLine = r === row;
                const isCol = c === col;
                const isCube = q === cube;

                if ((isLine || isCol || isCube) && input.value === value) {
                    return false;
                }
            }

            return true;
        };

        const shuffle = (array: number[]): number[] => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const fillCell = (idx: number): boolean => {
            if (idx === 81) return true; // all cells filled

            const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

            for (const n of numbers) {
                if (canPlace(n, idx)) {
                    this.inputs[idx].value = n;
                    if (fillCell(idx + 1)) return true;
                    this.inputs[idx].value = 0; // reset on backtrack
                }
            }

            return false; // trigger backtracking
        };

        fillCell(0);
    }

    public hideCells(): void {
        
        let shownCells: number = this.difficulty === 'HARD' ? 28 : this.difficulty === 'MEDIUM' ? 32 : 36
        shownCells = 81 - shownCells

        while (shownCells > 0) {

            const inp = this.inputs[Math.floor(Math.random() * this.inputs.length)]

            if (inp.isShown)
                inp.toggleHide()
            else continue

            shownCells--
        }
    }

    public renderTable(): void {
        this.inputs = this.generateInputs()
        this.cubes = this.generateCubes()
        this.table = this.generateTable()
        this.createSudoku()

        this.body.innerHTML = ''
        this.body.append(this.table.element)
        this.body.addEventListener('click', (e) => this.unselect(e))

        this.hideCells()
    }

    public selectFamily(id: number) {

        const row = Math.floor(id / 9)
        const col = id % 9
        const cube = Math.floor(row / 3) * 3 + Math.floor(col / 3)
        const inp = this.inputs[id]

        this.inputs.forEach((input: Input) => {
            const idx = input.uid
            const r = Math.floor(idx / 9)
            const c = idx % 9
            const q = Math.floor(r / 3) * 3 + Math.floor(c / 3)

            const isLine = r === row
            const isCol = c === col
            const isCube = q === cube

            input.element.classList.remove('family-squares', 'selected-square')

            if (isLine || isCol || isCube) input.element.classList.add('family-squares')
            if (idx === id) input.element.classList.add('selected-square')

            if (inp.isShown && input.value === inp.value) input.element.classList.add('selected-square')
        })
    }


    private unselect(e: Event): void {
        const target = e.target as HTMLElement

        if (this.table.element.contains(target)) return

        this.inputs.forEach((input: Input) => {
            input.element.classList.remove('family-squares', 'selected-square')
        })
    }

    public change(e: Event): void {
        e.stopPropagation()

        const target = e.target as HTMLInputElement;

        const inp: Input = this.inputs.filter((i: Input) => i.uid === Number(target.id))[0]
        inp.value = Number(target.value)

        console.log(inp.toString())

        if (!inp.isRight)
            inp.element.classList.add('wrong')
        else inp.element.classList.remove('wrong')

        this.inputs.forEach((input: Input) => {
            if (input.isShown && input.value === inp.value) {
                console.log(input.toString())
                input.element.classList.add('selected-square')
            }
        })
    }

}

export default SudokuController