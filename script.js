'use strict';
(() => {
    document.addEventListener("DOMContentLoaded", () => {
        class Calculator {
            static {
                console.info("Calculator running...")
            }
            constructor (str) {
                this.str = str;
                if (this.str) {
                    console.log(this.str)
                } else {
                    console.warn("TypeScript won't like this!")
                }
                this.display = document.querySelector("#display");
                this.clear_btn = document.querySelector("#clear-btn");
                this.clear_last_input_btn = document.querySelector("#clear-last-input-btn");
                this.equal_sign_btn = document.querySelector("#equal-sign-btn");
                this.target_buttons = document.querySelectorAll(".target-btn");
                this.append_to_display();
                this.clear_display();
                this.clear_last_input();
                this.calculate()
            }

            append_to_display() {
                let debounce_target_btn = false;
                this.target_buttons.forEach(btn => {
                    if (btn) {
                        console.log("target btn found")
                        btn.addEventListener("click", () => {
                            if (debounce_target_btn) {
                                return
                            }
                            debounce_target_btn = true;

                            if (this.display.textContent === "" && ["+", "*", "/", ".", "="].includes(btn.textContent.trim())) {
                                return
                            }
                            if (["+", "-", "*", "/", ".", "="].includes(this.display.textContent.slice(-1)) && ["+", "-", "*", "/", ".", "="].includes(btn.textContent.trim())) {
                                return
                            }
                            this.display.textContent += btn.textContent

                            setTimeout(() => {
                                debounce_target_btn = false
                            }, 100)
                        }, { passive: true })
                    } else {
                        console.warn("No target btn found!")
                    }
                })
            }
            clear_display() {
                let debounce_clear_btn = false;
                this.clear_btn.addEventListener("click", () => {
                    if (debounce_clear_btn) {
                        return
                    }
                    debounce_clear_btn = true;

                    this.display.textContent = ""
                    
                    setTimeout(() => {
                        debounce_clear_btn = false
                    }, 100)
                }, { passive: true })
            }
            clear_last_input() {
                let debounce_last_input_btn = false;
                this.clear_last_input_btn.addEventListener("click", () => {
                    if (debounce_last_input_btn) {
                        return
                    }
                    debounce_last_input_btn = true;

                    this.display.textContent = this.display.textContent.slice(0, -1)

                    setTimeout(() => {
                        debounce_last_input_btn = false
                    }, 100)
                }, {passive: true })
            }
            calculate() {
                let debounce_equal_sign_btn = false;
                this.equal_sign_btn.addEventListener("click", () => {
                    if (debounce_equal_sign_btn) {
                        return
                    }
                    debounce_equal_sign_btn = true;

                    if (this.display.textContent.endsWith("=")) {
                        this.display.textContent = this.display.textContent.slice(0, -1)
                    }
                    
                    try {
                        if (this.display.textContent !== "") {
                            this.display.textContent = math.evaluate(this.display.textContent)
                        }
                    } catch (err) {
                        this.display.textContent = "error";
                        console.error(err)
                    }

                    setTimeout(() => {
                        debounce_equal_sign_btn = false
                    }, 100)
                }, { passive: true })
            }
        }
        const calculator_instance = new Calculator("new instance")
    })
})();