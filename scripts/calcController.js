class CalcController {
  /*
@Author: Israel Gomes da Lapa
@nome: Calculadora windows 10     
    
*/
  constructor() {
    this._lastOperator = "";
    this._lastOperatorRepeated = "";
    this._displayCalc = document.querySelector("#display");
    this._displayCalcHeader = document.querySelector("#display-header");
    this._operation = [];
    this._lastNumber = "";
    this.lastNumberHaveSignal = "";
    this.initialize();
    console.log("Potencia", Math.pow(5, 2));
  }

  initialize() {
    this.initButtons();
  }

  addEventListennerAll() {}

  clearAll() {
    this._operation = [];
    this.displayCalc = 0;
    this.displayCalcHeader = this.joinOperation();
  }

  joinOperation() {
    return this._operation.join("");
  }

  cancelEntry() {
    const index = this._operation.indexOf(
      this._operation[this._operation.length - 1]
    );
    if (
      !this.isOperator(this._operation[index]) &&
      this._operation.length > 2
    ) {
      this._operation.pop();
      this.displayCalc = this._operation[this._operation.length - 2];
      this.displayCalcHeader = this.joinOperation();
    } else {
      this.clearAll();
    }
  }

  initButtons() {
    let buttons = document.querySelectorAll(".row > button");
    buttons.forEach(i => {
      i.addEventListener("click", e => {
        let textBtn = i.id;
        this.executaBtn(textBtn);
      });
    });
  }
  isOperator(param) {
    return ["+", "-", "*", "/", "%"].indexOf(param) > -1;
  }

  getLastValue() {
    return this._operation[this._operation.length - 1];
  }

  defineOperation(param) {
    console.log(param);
    let last;
    last = this._operation[this._operation.length - 1];
    if (this._operation.length == 0) {
      this._operation.push(param);
      this.displayCalc = param;
    } else {
      if (isNaN(param)) {
        if (param === ".") {
          let lastOperation = this.getLastValue().toString();
          if (lastOperation.split("").indexOf(".") > -1) return;
          this.lastValue = this.getLastValue().toString() + param.toString();
        } else {
          //verifica se o ultimo item é um operador, se for não dá o push novamente
          if (!this.isOperator(this.getLastValue())) {
            this._lastOperatorRepeated = this.getLastValue();
            this._operation.push(param);
          }
        }
        //se o operador for diferente é feita a substituição
        if (this._lastOperatorRepeated != this.getLastValue() && param != ".")
          this.lastValue = param;
      } else {
        if (this.isOperator(last)) {
          this.displayCalc = param;
          this._operation.push(param);
        } else {
          this.displayCalc = param;
          let newValue = last.toString() + param.toString();
          const index = this._operation.indexOf(last);
          this._operation.splice(index, 1);
          this._operation.push(parseFloat(newValue));
          this.displayCalc = newValue;
        }
      }
    }

    //this.displayCalc = this._operation.join("");
    this.displayCalcHeader = this.joinOperation();
  }

  getLastItem(isOperator = true) {
    let lastItem;
    //criando um for para pegar sempre o ultimo numero do array e colocar no display
    for (let i = this._operation.length - 1; i >= 0; i--) {
      //verifica se o ultimo numero do array é um operador
      if (this.isOperator(this._operation[i]) == isOperator) {
        lastItem = this._operation[i];
        break;
      } else {
      }
    }

    if (!lastItem) {
      lastItem = isOperator ? this._lastOperator : this.lastNumber;
    }
    return lastItem;
  }

  calc() {
    let last = "";
    this._lastOperator = this.getLastItem();
    let lastItem = this.getLastValue();
    if (this._operation.length < 3) {
      let firstName = this._operation[0];
      this._operation = [firstName, this._lastOperator, this._lastNumber];
    }

    if (lastItem == "%") {
      const index = this._operation.indexOf(lastItem);
      this._operation.splice(index, 1);

      let result = eval(this._operation.join(""));
      console.log("resultado", result);
      result = result / 100;
      this._operation = [result];
      this.displayCalc = this._operation;
    } else {
      this._lastNumber = this.getLastValue();
      console.log(this._operation.toString());
      let result = eval(this._operation.join(""));
      result = result == undefined ? 0 : result;
      this.displayCalc = result;
      this._operation = [];
      this._operation.push(result);
      this.displayCalcHeader = this.joinOperation();
    }
  }

  backOperation() {
    let parts;
    console.log(this._operation.length);
    if (this._operation.length < 3 || this._operation.length == undefined) {
      parts = this._operation.toString().split("");
    } else {
      parts = this.getLastValue()
        .toString()
        .split("");
    }
    let lastOfParts = parts[parts.length - 1];
    const index = parts.indexOf(lastOfParts);
    parts.splice(index, 1);
    let result = parseInt(parts.join(""));
    console.log("Resultado", result);
    if (isNaN(result)) {
      this._operation.pop();
      this.displayCalc = this._operation[0];
      this.displayCalcHeader = this.joinOperation();
    } else {
      this._operation[this._operation.length - 1] = [parseInt(result)];

      this.displayCalcHeader = this.joinOperation();
      this.displayCalc = result;
    }
  }

  inverteSinal() {
    if (this._operation.length > 0) {
      if (
        this.getLastValue()
          .toString()
          .indexOf("-") == -1
      ) {
        this.lastNumberHaveSignal = "-" + this.getLastValue().toString();
      } else {
        this.lastNumberHaveSignal = this.lastNumberHaveSignal
          .toString()
          .split("");
        this.lastNumberHaveSignal.splice("-", 1);
        this.lastNumberHaveSignal = parseInt(
          this.lastNumberHaveSignal.join("")
        );
      }
      this.lastValue = this.lastNumberHaveSignal;

      this.displayCalc = this.lastNumberHaveSignal;
    }
  }

  calcRaizQuadrada() {
    if (this._operation.length > 0) {
      let result = Math.sqrt(this.getLastValue());
      let last = this.getLastValue();
      const index = this._operation.indexOf(this.getLastValue());
      console.log("Ultimo", index);
      this._operation.splice(index, 1);
      console.log(this._operation);
      let showHeader = this.joinOperation() + "√(" + last + ")";
      this.displayCalcHeader = showHeader;
      this.displayCalc = result;
      this._operation.push(result);
    }
  }

  calcPotencia() {
    let lastValue = this.getLastValue();
    let result = Math.pow(lastValue, 2);
    this.displayCalcHeader = this.joinOperation() + "²";
    this.displayCalc = Math.pow(lastValue, 2);
    this.lastValue = result;
  }

  calcDivOne() {
    let lastValue = this.getLastValue();
    let result = 1 / lastValue;
    this.displayCalcHeader = "1(" + this.joinOperation() + ")";
    this.displayCalc = result;
    this.lastValue = result;
  }

  executaBtn(param) {
    switch (param) {
      case "ce":
        this.clearAll();
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        this.defineOperation(param);
        break;
      case "=":
        this.calc();
        break;
      case "c":
        this.cancelEntry(param);
        break;
      case ",":
        this.defineOperation(".");
        break;
      case "porcento":
        this.defineOperation("%");
        break;
      case "back":
        this.backOperation();
        break;
      case "+/-":
        this.inverteSinal();
        break;
      case "raizQuadrada":
        this.calcRaizQuadrada();
        break;
      case "potencia":
        this.calcPotencia();
        break;
      case "div1":
        this.calcDivOne();
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.defineOperation(param);
        break;
      default:
          this.setError();
    }
  }


setError(){
    this.displayCalc = 'ERROR'
}
  
  set lastValue(value) {
    this._operation[this._operation.length - 1] = value;
  }

  get displayCalc() {
    return this._displayCalc.innerHTML;
  }

  set displayCalc(value) {
    this._displayCalc.innerHTML = value;
  }

  get displayCalcHeader() {
    return this._displayCalcHeader.innerHTML;
  }

  set displayCalcHeader(value) {
    this._displayCalcHeader.innerHTML = value;
  }
}
