class ProgressBar extends HTMLElement {

    static observedAttributes = ['primary-color', 'secondary-color', 'value', "max", "rounded", "height", "steps", "cirlcle-radius"]; 
    
    #rounded = "false";
    #max = 100;
    #value = 0;
    #primaryColor = 'blue';
    #secondaryColor = 'grey';
    #height = '20px';
    #steps = {};
    #root;
    #circleRadius = 100;
    #circonference = 2 * Math.PI * this.#circleRadius;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        let styles = document.createElement('link');
        styles.setAttribute('rel', 'stylesheet');
        styles.setAttribute('href', 'progress-bar.css');
        this.shadow.innerHTML += this.#setHtml();
        this.#root = this.shadow.querySelector('#progress-container');
        this.#customStyle();
        this.shadow.appendChild(styles);
    }



    #setHtml(){
        let html = `
        <div id='progress-container' aria-hidden=true>
            <div class="progress-bar">`;

        if(this.#rounded ==='false'){
            console.log(Object.keys(this.#steps).length);

            if(Object.keys(this.#steps).length > 0){
                for (const [key, value] of Object.entries(this.#steps)) {
                    html += this.#addStep(value, key);
                }
            }
        }
        else{
            html+=this.#displayRoundedProgressBar();
        }

        
        html += `</div> </div>`;
        return html;
        
    }

    #addStep(step, rank){
        return `<div class="step step${rank}"><p>${step.name}</p></div>`;
    }

    #displayRoundedProgressBar(){
        return `
        <div class="rounded-progress-bar">
        <svg width="250" height="250">
            <circle r="${this.#circleRadius}" cx="125" cy="125" class="track" fill="none"></circle>
        </svg>
            <span id='rounded-value'>value</span> 
        </div>`;
    }

    #customStyle(){
        this.#root.style.setProperty('--progress-bar-primary-color', this.#primaryColor);
        this.#root.style.setProperty('--progress-bar-secondary-color', this.#secondaryColor);
        this.#root.style.setProperty('--progress-bar-height', this.#height);
        this.#root.style.setProperty('--progress-bar-value', (this.#value/this.#max)*100);
        this.#root.style.setProperty('--progress-bar-nb-steps', Object.keys(this.#steps).length);
        this.#root.style.setProperty('--progress-bar-circle-radius', parseInt(this.#circleRadius));
        this.#root.style.setProperty('--progress-bar-circonference', this.#circonference);
        this.#root.style.setProperty('--progress-bar-circle-status', parseInt(this.#value)/parseInt(this.#max) * parseInt(this.#circonference));

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

        case 'circle-radius':
            this.#setCircleRadius(newValue);
            break;
        }

        this.#root.innerHTML = this.#setHtml();
        this.#customStyle();
    }

    #setPrimaryColor(color){
        this.#primaryColor = color;
    }
   
    #setSecondaryColor(color){
        this.#secondaryColor = color;
    }

    #setValue(value){
        this.#value = this.#max - value;
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

    #setCircleRadius(radius){
        this.#circleRadius = radius;
        this.#circonference = 2 * Math.PI * this.#circleRadius;
    }



}

customElements.define('progress-bar', ProgressBar);