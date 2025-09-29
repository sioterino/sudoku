import type Input from "./input"

class Cube {

    private cube: HTMLDivElement

    constructor(inputs: Input[]) {

        if (inputs.length != 9)
            throw Error('Cube has more inputs than it can bear.')

        this.cube = document.createElement('div')
        this.cube.classList.add('cube')

        inputs.forEach(inp => this.cube.append(inp.element))

    }

    public get element(): HTMLDivElement { return this.cube }

}

export default Cube