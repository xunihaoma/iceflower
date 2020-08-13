var miniComp = function(Vue) {
    class IceComponent extends HTMLElement {
        constructor() {
            super();
            let shadow = this.attachShadow({mode: 'open'});
            let username = this.getAttribute('username');
            let path = this.getAttribute('path');
            shadow.innerHTML = `
                <div style="position:relative;height:100%;width:100%;">
                    <wx-open-launch-weapp style="position:absolute;top:0;right:0;left:0;bottom:0;z-index:29;overflow:hidden;" username="${username}" path="${path}">
                        <template>
                            <div style="background: transparent; padding:5000px"></div> 
                        </template>
                    </wx-open-launch-weapp>
                    <div style="position:relative;height:100%;width:100%;z-index:1;"><slot></slot></div>
                </div>
            `
        }

        connectedCallback() {
           
        }
    }


    customElements.define('ice-wx-open-mini-program', IceComponent);
}



module.exports = miniComp;