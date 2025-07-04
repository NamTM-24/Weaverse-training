import './css/style.css'
import { setupButtonHandlers } from './handlers/buttonHandler'

const display = document.getElementById('display') as HTMLDivElement;

const buttons = document.querySelectorAll<HTMLButtonElement>('.btn');

setupButtonHandlers(display,buttons);



