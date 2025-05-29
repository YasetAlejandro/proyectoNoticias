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

    /* Estilo de botón de cerrar */
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

    /* Estilos de animaciones */
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

    /* Estilos de contenedor de créditos y fecha */
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

    /* Nuevos estilos para TTS */
    .tts-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: var(--surfaceLight);
        color: rgba(var(--normalInverted), 0.8);
        padding: 12px 16px;
        border-radius: 18px;
        font-size: 14px;
        font-weight: 500;
        transition: all 125ms;
        width: 100%;
    }

    .tts-button:hover {
        background: var(--primary);
        color: var(--onPrimary);
    }

    .tts-icon {
        fill: currentColor;
        width: 18px;
        height: 18px;
        transition: fill 125ms;
    }

    .button-container {
        display: flex;
        gap: 8px;
        width: 100%;
        margin-top: 16px;
    }

    .tts-button.playing {
        background: var(--primary);
        color: var(--onPrimary);
    }
</style>

<div class="transparent-cards" style="display:none; z-index:10; width:100%; height:100vh; inset:0; position:fixed; background:rgba(var(--normalInverted), 0.1)"></div>

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
            <card-shortdescription></card-shortdescription>
        </div>

        <span class="hidden-content">
            <hidden-content>
                <card-description>...</card-description>

                <div class="button-container">
                    <button class="tts-button" id="tts-button">
                        <svg class="tts-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm420 48v-337q47 22 73.5 66t26.5 96q0 51-26.5 94.5T540-312Z"/>
                        </svg>
                        Escuchar noticia
                    </button>
                    
                    <button class="tts-button" id="subscribe-button">
                        <svg class="tts-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                        </svg>
                        Inscribirse
                    </button>
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
        this.audio = null;
        this.isPlaying = false;
    }

    connectedCallback() {
        const shadowRoot = this.shadowRoot;
        const cardElement = shadowRoot.querySelector('.card');  
        const hostElement = shadowRoot.host;  
        const transparentCards = shadowRoot.querySelector(".transparent-cards");
        const closeButton = shadowRoot.querySelector("close-button");
        const hiddenContent = shadowRoot.querySelector("hidden-content");

        function removeVisibility(element){
            if (element.hasAttribute("closing") && !(cardElement.classList.contains("open"))) {
                element.classList.remove("element-visible");
                element.removeAttribute("closing");
            }
        }
        
        // Configuración del botón de TTS
        const ttsButton = shadowRoot.getElementById('tts-button');
        ttsButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleTTS();
        });

        // Configuración del botón de inscripción
        const subButton = shadowRoot.getElementById('subscribe-button');
        subButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCard(); 
            if(typeof changeWindow === 'function') {
                changeWindow('#window-inscription');
            }
        });

        const interactionClose = document.createElement('span');
        interactionClose.classList.add("interaction");
        closeButton.appendChild(interactionClose);
        interactionClose.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleCard();
        });

        const toggleCard = () => {
            const resizeHeight = (hostElement) => {
                const hostHeight = hostElement.offsetHeight;
                hostElement.style.minHeight = hostHeight + "px";
            };

            const state = Flip.getState(cardElement);
            if (cardElement.classList.contains("open")) {
                // Cerrar tarjeta
                cardElement.classList.remove("open");
                shadowRoot.appendChild(cardElement);
                transparentCards.style.display = "none";
                cardElement.addEventListener('mouseup', () => { toggleCard(); }, {once: true});

                // Animación de cierre
                closeButton.setAttribute("closing", "");
                closeButton.addEventListener("animationend", () => { removeVisibility(closeButton); }, {once: true});
                hiddenContent.setAttribute("closing", "");
                hiddenContent.addEventListener("animationend", () => { removeVisibility(hiddenContent); }, {once: true});
                
                // Detener audio al cerrar
                if(this.audio) {
                    this.audio.pause();
                    this.audio = null;
                    this.isPlaying = false;
                    ttsButton.classList.remove('playing');
                    ttsButton.innerHTML = `
                        <svg class="tts-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                            <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm420 48v-337q47 22 73.5 66t26.5 96q0 51-26.5 94.5T540-312Z"/>
                        </svg>
                        Escuchar noticia`;
                }
            } else {
                // Abrir tarjeta
                transparentCards.style.display = "flex";
                cardElement.classList.add("open");
                transparentCards.appendChild(cardElement);
                closeButton.classList.add("element-visible");
                hiddenContent.classList.add("element-visible");
            }

            Flip.from(state, {
                duration: 0.5,
                scale: false,
                ease: CustomEase.create("custom", "M0,0 C0.308,0.19 0.107,0.633 0.288,0.866 0.382,0.987 0.656,1 1,1 "),
                absolute: true,
                zIndex: 1,
            });
        };

        shadowRoot.querySelector('.card').addEventListener('click', () => { toggleCard() }, {once: true});

        // Asignación de valores desde atributos
        if(this.hasAttribute('data-img')) {
            shadowRoot.querySelector('img').setAttribute("src", this.getAttribute('data-img'));
        }
        if(this.hasAttribute('data-title')) {
            shadowRoot.querySelector('card-title').textContent = this.getAttribute('data-title');
        }
        if(this.hasAttribute('data-shortdescription')) {
            shadowRoot.querySelector('card-shortdescription').textContent = this.getAttribute('data-shortdescription');
        }    
        if(this.hasAttribute('data-description')) {
            shadowRoot.querySelector('card-description').textContent = this.getAttribute('data-description');
        }
        if(this.hasAttribute('data-credits')) {
            shadowRoot.getElementById("data-credits").textContent = this.getAttribute('data-credits');
        }
        if(this.hasAttribute('data-date')) {
            shadowRoot.getElementById("data-date").textContent = this.getAttribute('data-date');
        }
        if(this.hasAttribute('data-time')) {
            shadowRoot.getElementById("data-time").textContent = this.getAttribute('data-time');
        }
        if(this.hasAttribute('data-address')) {
            shadowRoot.getElementById("data-address").textContent = this.getAttribute('data-address');
        }
        if(this.hasAttribute('data-id')) {
            this.newsId = this.getAttribute('data-id');
        } else {
            this.newsId = Math.random().toString(36).substring(2);
        }
    }

    toggleTTS() {
        const ttsButton = this.shadowRoot.getElementById('tts-button');
        
        if (this.audio) {
            // Si hay audio, pausarlo o reanudarlo
            if (this.isPlaying) {
                this.audio.pause();
                this.isPlaying = false;
                ttsButton.innerHTML = `
                    <svg class="tts-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm420 48v-337q47 22 73.5 66t26.5 96q0 51-26.5 94.5T540-312Z"/>
                    </svg>
                    Escuchar noticia`;
                ttsButton.classList.remove('playing');
            } else {
                this.audio.play();
                this.isPlaying = true;
                ttsButton.innerHTML = `
                    <svg class="tts-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q134 0 227 93t93 227q0 134-93 227t-227 93Zm0-320Zm-60 144h120v-328H420v328Z"/>
                    </svg>
                    Pausar`;
                ttsButton.classList.add('playing');
            }
            return;
        }

        // Si no hay audio, crearlo
        const newsText = this.getAttribute('data-description') || '';
        const newsTitle = this.getAttribute('data-title') || '';
        
        this.audio = new Audio(`/audio/${this.newsId}?text=${encodeURIComponent(newsTitle + '. ' + newsText)}`);
        
        ttsButton.innerHTML = `
            <svg class="tts-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q134 0 227 93t93 227q0 134-93 227t-227 93Zm0-320Zm-60 144h120v-328H420v328Z"/>
            </svg>
            Pausar`;
        ttsButton.classList.add('playing');
        this.isPlaying = true;

        this.audio.play().catch(e => {
            console.error("Error al reproducir audio:", e);
            ttsButton.innerHTML = `
                <svg class="tts-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="M480-280q83 0 141.5-58.5T680-480q0-83-58.5-141.5T480-680q-83 0-141.5 58.5T280-480q0 83 58.5 141.5T480-280Zm0-80q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM240-80l-56-56 200-200H80v-80h304L184-616l56-56 240 240-240 240Zm240-320Z"/>
                </svg>
                Error al reproducir`;
            ttsButton.classList.remove('playing');
            this.isPlaying = false;
        });

        this.audio.onended = () => {
            ttsButton.innerHTML = `
                <svg class="tts-icon" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm420 48v-337q47 22 73.5 66t26.5 96q0 51-26.5 94.5T540-312Z"/>
                </svg>
                Escuchar noticia`;
            ttsButton.classList.remove('playing');
            this.isPlaying = false;
            this.audio = null;
        };
    }
}

customElements.define('card-item', cardItem);