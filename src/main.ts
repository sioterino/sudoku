import SudokuController from './controller/sudokuController'

const body = document.querySelector('body') as HTMLBodyElement
const controller = new SudokuController(body, 'EASY')
controller.renderTable()
