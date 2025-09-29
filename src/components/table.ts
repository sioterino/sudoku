import type Cube from "./cube"

class Table {

    private table: HTMLDivElement

    constructor(cubes: Cube[]) {

        if (cubes.length < 9)
            throw Error('Cube has more inputs than it can bear.')

        this.table = document.createElement('div')
        this.table.classList.add('table')

        cubes.forEach(cub => this.table.append(cub.element()))

    }

    public get element(): HTMLDivElement { return this.table }

}

export default Table