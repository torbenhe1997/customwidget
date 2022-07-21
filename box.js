
(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
    
    <style>
 
body{
    margin: 0; 
}

.header{
    background-color: grey;
    display: flex;
    align-items: baseline;
    padding: .5rem;
    gap: 1rem;
}

.link{
    background: none;
    border: none;
    text-decoration: none;
    color: azure;
    font-size: inherit;
    cursor: pointer;
    padding: 0;
    
    }

.link:hover{
    color: black;
}

.dropdown + .link:focus,
.link:hover{
    color: black;
}

.dropdown{
    position: relative;

}
.dropdown-menu:hover{
    position:absolute;
    left: 0;
    top: calc(100% + .80rem);
    background-color: white;
    padding: 75.rem;
    border-radius: .25rem;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1);
    opacity: 0.0;
    pointer-events: none;
    transform: translateY(-10px);
    transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;

}
.dropdown-menu{
    position:absolute;
    left: 0;
    top: calc(100% + .80rem);
    background-color: white;
    padding: 75.rem;
    border-radius: .25rem;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1);
    opacity: 0.0;
    pointer-events: none;
    transform: translateY(-10px);
    transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;

}

.dropdown > .link:focus + .dropdown-menu {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;

}
    
    </style>
    <html>
        <body>
            <div class="header">
                <div class ="dropdown">
                    <button class="link">information</button>
                    <div class ="dropdown-menu">
                        Dropdown Content
                    </div>
                </div>    
                <a href="#" class = "link">Pricing</a>
                <button class ="link"> Login</button>
            </div>
        </body>
    </html>
    `;
	class Box extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.appendChild(template.content.cloneNode(true));
			
			this.$style = shadowRoot.querySelector('style');			
			this.$svg = shadowRoot.querySelector('svg');
			
			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			
			this._props = {};
		}
		
		render(val, info, color) {
			var val1 = val * 0.01;
			var x = this.svg_circle_arc_path(500, 500, 450, -90, val1 * 180.0 - 90);
			var rounded = Math.round( val * 10 ) / 10;

			
			if(rounded >=0 && rounded <=100) {
				this.$style.innerHTML = ':host {border-radius: 10px;border-width: 2px;border-color: black;border-style: solid;display: block;}.body {background: #fff;}.metric {padding: 10%;}.metric svg {max-width: 100%;}.metric path {stroke-width: 75;stroke: #ecf0f1;fill: none;}.metric text {font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;}.metric.participation path.data-arc {stroke: ' + color + ';}.metric.participation text {fill: ' + color + ';}';
				this.$svg.innerHTML = '<path d="M 950 500 A 450 450 0 0 0 50 500"></path><text class="percentage" text-anchor="middle" alignment-baseline="middle" x="500" y="300" font-size="140" font-weight="bold">' + rounded + '%</text><text class="title" text-anchor="middle" alignment-baseline="middle" x="500" y="450" font-size="90" font-weight="normal">' + info + '</text><path d="' + x + '" class="data-arc"></path>"';
			}
		}
		  
		polar_to_cartesian(cx, cy, radius, angle) {
		    var radians;
		    radians = (angle - 90) * Math.PI / 180.0;
		    return [Math.round((cx + radius * Math.cos(radians)) * 100) / 100, Math.round((cy + radius * Math.sin(radians)) * 100) / 100];
		}
		
		svg_circle_arc_path(x, y, radius, start_angle, end_angle) {
		    var end_xy, start_xy;
		    start_xy = this.polar_to_cartesian(x, y, radius, end_angle);
		    end_xy = this.polar_to_cartesian(x, y, radius, start_angle);
		    return "M " + start_xy[0] + " " + start_xy[1] + " A " + radius + " " + radius + " 0 0 0 " + end_xy[0] + " " + end_xy[1];
		  };
		  

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("value" in changedProperties) {
				this.$value = changedProperties["value"];
			}
			
			if ("info" in changedProperties) {
				this.$info = changedProperties["info"];
			}
			
			if ("color" in changedProperties) {
				this.$color = changedProperties["color"];
			}
			
			this.render(this.$value, this.$info, this.$color);
		}
	}	
	customElements.define("com-demo-gauge", Box);
})();