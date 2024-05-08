const cardItemTemplate = document.createElement('template');
cardItemTemplate.innerHTML = `
<style>
    :host{
        display:flex;
        flex-grow:1;
        flex-basis:600px;

        height:auto;
        user-select:none;
    }

    .card {
        display:flex;
        flex-grow:1;
        flex-wrap:wrap;

        background:var(--surfaceMediumSolid);
        border-radius:28px;
        
        inset:0;
        overflow:auto;
        transition:background 125ms;
    }
    .card:not(.open){cursor:pointer;overflow:hidden;}
    .card:not(.open):hover{
        background:var(--normal);
        box-shadow: 0px 0px 0px 1px rgba(var(--normalInverted), 0.08); 
        /* box-shadow: 0px 10px 32px -16px rgba(0, 0, 0, 0.16);*/
    }
    .card:not(.open):hover img{filter: brightness(1.03);}

    .content_divisor{
        position:relative;
        display:flex;
        flex-direction:column;
        flex-grow:1;
        flex-basis:400px;        
        gap:8px;
        box-sizing:border-box;
    }
    @media only screen and (min-width: 680px){
        .content_divisor{padding:8px;}
        img{border-radius:20px !important;}
    }
    .content_divisor:last-child{
        padding:24px;
    }
    ::-webkit-scrollbar {
        display: none;
    }


    img{
        width:100%;
        height:100%;
        border-radius:28px;
        object-fit: cover;
        aspect-ratio: 16/10;
        transition:filter 125ms, transform .3s cubic-bezier(0,0,0.5,1);
    }

    card-title{
        font-size:32px;
        font-weight:500;
        line-height:0.95;
        color:rgba(var(--normalInverted), 8);
        font-family: "Onest", sans-serif;
    }
    event-date{
        font-size:16px;
        font-weight:600;
        color:rgba(var(--normalInverted), 0.24);
    }

    card-description{
        line-height:1.5;
        font-size:16px;
        color:rgba(var(--normalInverted), 0.8);
    }

    hidden-content{
        flex-direction:column;
        align-items: flex-start;
        gap:8px;
        position:absolute;
        padding-bottom:48px;
        display:none;
        opacity:0;
        animation: fadeIn 500ms cubic-bezier(.56,.27,0,1) 300ms forwards;
    }
    @media only screen and (max-width: 680px){hidden-content{padding-bottom:120px;}
    }
    .hidden-content{position:relative;}

    card-shortdescription{
        font-size:24px;
        line-height:1;
        font-weight:500;
        color:rgba(var(--normalInverted), 0.6);
    }
    event-credits{
        font-size:24px;
        line-height:1;
        margin:8px 0;
        font-weight:500;
        color:rgba(var(--normalInverted), 0.6);
    }
    .simple_container{
        display:flex;
        flex-direction:column;
        gap:0px;
    }
    div.direction-row{
        flex-direction:row;
    }
    b-margin{margin-bottom:8px;}
    .add-gap{ gap:4px; }
    .flex-row{flex-direction:row;}

    .card.open{
        position:absolute;
        background:var(--normal);
    }

    event-description{
        height:100%;
        text-wrap:balance;
    }

    

    .transparent-cards{
        animation: transparentIn 300ms;
    }
    @keyframes transparentIn {
        from{
            background:rgba(var(--normalInverted), 0);
        }
        to{
            background:rgba(var(--normalInverted), 0.1);
        }
    }

    @media only screen and (min-width: 680px){
        card-title{margin-top:16px;}
      .card{inset:10% 5%;}
    }
    @media only screen and (max-width: 680px){
        .card.open img{
            animation: imgBorderRadius 500ms cubic-bezier(.56,.27,0,1);
            border-radius: 0 0 24px 24px;
        }
        .card.open{
            animation: cardBorderRadius 500ms cubic-bezier(.56,.27,0,1);
            border-radius: 0;
        }
        @keyframes imgBorderRadius {
            from{border-radius: 28px;}
            to{border-radius: 0 0 24px 24px;}
        }
        @keyframes cardBorderRadius {
            from{border-radius: 28px;}
            to{border-radius: 0;}
        }
    }

    /* Estilo de bonton de cerrar */
    .card.open close-button{display:flex; animation: buttonIn 500ms cubic-bezier(.56,.27,0,1)}
    @keyframes buttonIn {from {transform: scale(0);} to {transform: scale(1);}}
    close-button{
        display:none;
        position:absolute;
        width: 48px;
        height: 48px;
        max-height:48px;
        box-sizing: border-box;
        border-radius:50%;
        margin-top:  env(safe-area-inset-top);
        right: 16px;
        top: 16px;
        cursor:pointer;  
        opacity:0.95;
        z-index:2;
        
    }
    close-button svg{fill:var(--normal); filter: drop-shadow(0px 0px 4px rgba(var(--normalInverted), 0.24));transition:transform .3s cubic-bezier(0,0,0.5,1)}
    close-button:hover svg{transform: scale(1.1);}
    @media only screen and (min-width: 680px){
        #card-item-text-content{overflow:auto;padding:24px;}
        close-button{right:unset; left:16px;}
    }


    /* Estilos de fadeOut animation para cualqueir element */
    .element-visible{display:flex;}
    [closing]{animation: fadeOut 300ms;}
    @keyframes fadeOut {from{opacity:1}to{opacity:0;}}
    @keyframes fadeIn {from{opacity:0}to{opacity:1;}}


    /* Estilos de botones */
    button{
        display:flex;
        align-items: center;
        justify-content:center;
        font-size: 18px;
        font-weight: 500;
        line-height: 16px;
        padding:16px 24px;
        width:100%;
        
        border-radius:18px;
        border:none;
        cursor:pointer;
        background:var(--primaryContainer);
        color:var(--onPrimaryContainer);
        transition:all 125ms;
    }
    button:hover{
        background:var(--primary);
        color:var(--onPrimary);
    }

    button.icon{
        background:var(--surfaceLight);
        padding:8px;
    }
    button.icon:hover{background:var(--primary);}
    button.icon:hover svg{fill:var(--normal);}    
    button.icon svg{fill:rgba(var(--normalInverted), .8); transition:fill 125ms;}


    /* Estilos de contenedor de creditos y fecha */
    .content-box{
        display:flex;
        flex-grow:1;
        background:var(--surfaceLightClear);
        border-radius:16px;
        margin:8px 0;
        margin-bottom:4px;
        box-shadow: 0px 0px 0px 1px rgba(var(--normalInverted), 0.05) inset;
    }
    .content-box .divisor h1{
        font-size:16px;
        font-weight:500;
        margin:0;
        color:rgba(var(--normalInverted), 0.88);

    }
    .content-box .divisor{
        display:flex;
        flex-direction:column;
        flex-grow:1;
        padding:12px;
        gap:4px;
    }
    dataline{
        min-width:fit-content;
        width:fit-content;
        font-size:14px;
        font-weight:500;
        padding:4px 8px;
        border-radius:16px;
        background:var(--surfaceMedium);
        color:rgba(var(--normalInverted), 0.95);
    }
    .color-primary{
        background:var(--primary) !important;
        color:var(--onPrimary) !important;

    }

    span.interaction{
        position:absolute;
        width:100%;
        height:100%;
        
    }
</style>

<div class="transparent-cards" style="display:none; z-index:10; width:100%; height:100vh; inset:0; position:fixed; background:rgba(var(--normalInverted), 0.1)">

</div>


<div class="card">
    <div class="content_divisor" id="img-holder">
        <close-button>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m480-432 118 117q9 10 23 10.5t25-11.007q11-10.508 11-23.747T646-364L528-480l118-118q9-9 10-23t-10-25q-11.411-11-24.5-11T598-646L480-528 363-646q-10-9-23.5-10T316-646q-12 11.411-12 24.5t12 23.5l116 118-117 117q-10 10-10.5 23.5t11.007 23.5q10.508 12 23.747 12T364-316l116-116Zm.138 373Q393-59 316-91.5t-134.5-90Q124-239 91.5-315.862t-32.5-164Q59-567 91.5-644t89.843-134.553q57.343-57.552 134.278-90.5Q392.557-902 479.779-902q87.221 0 164.339 32.87 77.119 32.87 134.596 90.29 57.478 57.42 90.382 134.46T902-480q0 87.276-32.947 164.26-32.948 76.983-90.5 134.362Q721-124 644.138-91.5t-164 32.5Z"/></svg>
            

        </close-button>
        <img src="https://th.bing.com/th/id/OIG4.XV6v0uvvkYCVu2vehKOU?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="Lights" style="width:100%">
    </div>
    <div class="content_divisor" id='card-item-text-content'>
        <div class="simple_container add-gap b-margin">
            <card-title>-</card-title>
            <div class="content-box">
                <div class="divisor">
                    <h1>Fecha</h1>
                    <div class="simple_container direction-row add-gap">
                        <dataline id="data-date">00/00/0000</dataline>
                        <dataline id="data-time">-</dataline>
                    </div>
                </div>
                <div class="divisor">
                    <h1>Creditos</h1>
                    <dataline id="data-credits" class="color-primary">0</dataline>
                </div>
            </div>
                <dataline id="data-address">-</dataline>
            <card-shortdescription>
            </card-shortdescription>
            
            
        </div>

        <span class="hidden-content">
            <hidden-content>
                <card-description>
                    ...
                </card-description>

               

                <div id="response-holder-sub-button" class="simple_container" style="width:100%; align-items:flex-start; margin:16px 0;">
                    
                </div>

                

            </hidden-content>
        </span>

        

        
        
       
        
    </div>
</div>
`;


class cardItem extends HTMLElement {
    
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    shadow.append(cardItemTemplate.content.cloneNode(true)); 
  }
  

  connectedCallback() {

    const shadowRoot = this.shadowRoot;
    const cardElement = this.shadowRoot.querySelector('.card');  
    const hostElement = this.shadowRoot.host;  
    const transparentCards = this.shadowRoot.querySelector(".transparent-cards");

    const closeButton = this.shadowRoot.querySelector("close-button");
    const hiddenContent = this.shadowRoot.querySelector("hidden-content");

    function removeVisibility(element){
        if (element.hasAttribute("closing") && !(cardElement.classList.contains("open"))) {
            element.classList.remove("element-visible");
            element.removeAttribute("closing");
        }
    }
    
    // Create sub button
    const subButton = document.createElement('button');
    subButton.textContent = 'Inscribirse';
    subButton.onclick = function() {toggleCard(); changeWindow('#window-inscription')};
    var buttonHolder = this.shadowRoot.getElementById("response-holder-sub-button");
    buttonHolder.appendChild(subButton);

    const interactionClose = document.createElement('span');
    interactionClose.classList.add("interaction");
    closeButton.appendChild(interactionClose);
    interactionClose.onclick = function() {toggleCard()};


    function toggleCard(){
        

        resizeHeight(hostElement)
        function resizeHeight(hostElement){
            var hostHeight = hostElement.offsetHeight;
            hostElement.style.minHeight=hostHeight+"px";
            // console.log("ajustando tamaño");
        }

        function resetSize(element){
            element.style.width = "auto";
        }
        


        let state = Flip.getState(cardElement);
        if (cardElement.classList.contains("open")) {
            // Close card
            cardElement.classList.remove("open");
            shadowRoot.appendChild(cardElement);
            transparentCards.style.display = "none";
            cardElement.addEventListener('mouseup', () => { toggleCard(); }, {once: true});

            // closing animation
            closeButton.setAttribute("closing", "");
            closeButton.addEventListener("animationend", () =>{ removeVisibility(closeButton);}, {once: true})
            hiddenContent.setAttribute("closing", "");
            hiddenContent.addEventListener("animationend", () =>{ removeVisibility(hiddenContent); }, {once: true})
            
            

        }else{
            // Open card
            transparentCards.style.display = "flex";
            cardElement.classList.add("open");
            transparentCards.appendChild(cardElement);
            // closeButton.addEventListener('click', () => { toggleCard(); }, {once: true});

            // closing animations
            // if (cardElement.classList.contains("open")) {
                closeButton.classList.add("element-visible");
                hiddenContent.classList.add("element-visible");

                // var hiddenContentWidth = hiddenContent.offsetWidth;
                // hiddenContent.style.width = hiddenContentWidth + "px";
            // }

        }
        Flip.from(state, {
            duration: 0.5,
            scale: false,
            ease: CustomEase.create("custom", "M0,0 C0.308,0.19 0.107,0.633 0.288,0.866 0.382,0.987 0.656,1 1,1 "),
            // ease: CustomEase.create("emphasized", "0.2, 0, 0, 1"),
            // ease: CustomEase.create("classic", "0.1, 0.8, 0, 1"),
            // ease: "expo.out",
            absolute: true,
            zIndex: 1,
        });
    }

    this.shadowRoot.querySelector('.card').addEventListener('click', () => { toggleCard(cardElement) }, {once: true});

    // Values asignation from attributes
    if(this.hasAttribute('data-img')) {
        this.shadowRoot.querySelector('img').setAttribute("src", this.getAttribute('data-img'));
    }
    if(this.hasAttribute('data-title')) {
        this.shadowRoot.querySelector('card-title').textContent = this.getAttribute('data-title');
    }
    if(this.hasAttribute('data-shortdescription')) {
        this.shadowRoot.querySelector('card-shortdescription').textContent = this.getAttribute('data-shortdescription');
    }    
    if(this.hasAttribute('data-description')) {
        this.shadowRoot.querySelector('card-description').textContent = this.getAttribute('data-description');
    }
    if(this.hasAttribute('data-credits')) {
        this.shadowRoot.getElementById("data-credits").textContent = this.getAttribute('data-credits');
    }
    if(this.hasAttribute('data-date')) {
        this.shadowRoot.getElementById("data-date").textContent = this.getAttribute('data-date');
    }
    if(this.hasAttribute('data-time')) {
        this.shadowRoot.getElementById("data-time").textContent = this.getAttribute('data-time');
    }
    if(this.hasAttribute('data-address')) {
        this.shadowRoot.getElementById("data-address").textContent = this.getAttribute('data-address');
    }
  }
}






customElements.define('card-item', cardItem);