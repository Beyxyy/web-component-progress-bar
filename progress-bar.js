class ProgressBar extends HTMLElement {

    static observedAttributes = ['primary-color', 'secondary-color', 'value', "max", "rounded", "height", "steps"]; 
    
    #rounded = false;
    #max = 100;
    #value = 0;
    #primaryColor = 'blue';
    #secondaryColor = 'grey';
    #height = '20px';
    #steps = {};

    #root = this.shadow.querySelector(':root');


    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        document.createElement('style').setAttribute('href','./progress-bar.css');
        this.shadow.appendChild(document.createElement('style'));
        this.#setHtml();
    }



    #setHtml(){
        let html = `
        <div id='progress-container' aria-hidden=true>
            <div class="progress-bar">`;

        if(this.#rounded ==='false'){
            if(this.#steps > 0){
                for(let i=0; i<this.#steps.length; i++){
                    html += this.#addStep(this.#steps[i]);
                }
            }
        }
        else{
            this.#displayRoundedProgressBar();
        }

        
        html += `</div> </div>`;
        this.shadow.innerHTML = html;
        this.#customStyle();
    }

    #addStep(step, rank){
        return `<div class="step${rank}"><p>${step.name}</p></div>`;
    }

    #displayRoundedProgressBar(){
        let html = `
        <div class="rounded-progress-bar">
            <span id='rounded-value'>value</span> 
        </div>`;
    
        return html;
    }

    #customStyle(){
        this.#root.style.setProperty('--progress-bar-primary-color', this.#primaryColor);
        this.#root.style.setProperty('--progress-bar-secondary-color', this.#secondaryColor);
        this.#root.style.setProperty('--progress-bar-height', this.#height);
        this.#root.style.setProperty('--progress-bar-value', (this.#value/this.#max)*100);

        if(this.#rounded === 'true'){
            this.#root.style.setProperty('--rounded', '100%');
        }
        else{
            this.#root.style.setProperty('--rounded', '0%');
        }

    }


    attributeChangedCallback(name , oldValue, newValue) {
        switch (name) {
        case 'primaryColor':
            this.#setPrimaryColor(newValue);
            break;
        case 'secondaryColor':
            this.#setSecondaryColor(newValue);
            break;
        case 'value':
            this.#setValue(newValue);
            break;
        case 'max':
            this.#setMax(newValue);
            break;
        case 'rounded':
            if(newValue === 'true' || newValue === 'false'){
                this.#setRounded(newValue);
            }
        break;
        case 'height':
            this.#setHeight(newValue.toInteger());
        break;
        case 'steps':
            this.#setSteps(newValue);
        break;
        }

        this.#customStyle();
    }

    #setPrimaryColor(color){
        this.#primaryColor = color;
    }
   
    #setSecondaryColor(color){
        this.#secondaryColor = color;
    }

    #setValue(value){
        this.#value = value;
    }

    #setMax(max){
        this.#max = max;
    }

    #setRounded(rounded){
        this.#rounded = rounded;
    }

    #setHeight(height){
        this.#height = height;
    }

    #setSteps(steps){
        this.#steps = JSON.parse(steps) ?? {};
    }

}
