yum.define([
    PiUrl.create("components/Calculator.html"),
    PiUrl.create("components/Calculator.css"),
    PiUrl.create("components/button.css"),
    PiUrl.create("components/display.css")
    ],
    function(html) {
        const initialstate = {
            displayValue: "0",
            clearDisplay: false,
            operation: null,
            values: [0, 0],
            current: 0
        }

        PiExport("Calculator", class extends PiComponent {
            
            state = {...initialstate}
            

            setstate(state) {
                Object.assign(this.state, state)
            }
            
            instances() {
                this.view = html;
            }

            clearMemory() {
                this.setstate({...initialstate});
            }

            setOperation(operation) {
                if(this.state.current === 0) {
                    this.setstate({operation, current: 1, clearDisplay: true})
                } else {
                    const equals = operation === "="
                    const currentOperation = this.state.operation
        
                    const values = [...this.state.values];
                    try {
                        values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`);
        
                    } catch(e) {
                        values[0] = this.state.values[0]
                    }
                    values[1] = 0;
        
                    this.setstate({
                        displayValue: values[0],
                        operation: equals ? null : operation,
                        current: equals ? 0 : 1,
                        clearDisplay: !equals,
                        values
                    })
                }
            }

            addDigit(n) {
                if(n === "." && this.state.displayValue.includes(".")) {
                    return;
                }
                const clearDisplay = this.state.displayValue === "0"
                    || this.state.clearDisplay;
                const currentValue = clearDisplay ? "" : this.state.displayValue;
                const displayValue = currentValue + n;
                this.setstate({displayValue, clearDisplay: false});
        
                if(n !== ".") {
                    const index = this.state.current;
                    const newValue = parseFloat(displayValue);
                    console.log(this.state)
                    const values = [...this.state.values];
                    values[index] = newValue;
                    this.setstate({values});
                }
            }
        })
})