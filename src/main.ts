import Cube from './components/cube'
import Input from './components/input'
import Table from './components/table'

const body = document.querySelector('body')!

let inputs: Input[] = []
let cubes: Cube[] = []

for (let i = 0; i < 81; i++) {
  inputs.push(new Input(i.toString()))

  if (inputs.length === 9) {
    cubes.push(new Cube(inputs))
    inputs = []
  }

  if (cubes.length === 9) {
    body.append(new Table(cubes).element)
  }
}
