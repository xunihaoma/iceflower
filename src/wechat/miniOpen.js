var miniOpen = function(Vue, object) {
    if (!object) {
        var object = {};
    }

    if(object.username == undefined) throw '请传入参数 username';
    if(object.path == undefined) throw '请传入参数 path';

    Vue.directive('mini-open', {
        inserted: function(el) {
            if(!el.style.position) {
                el.style.position = 'relative';
            }

            var div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.top = '0';
            div.style.bottom = '0';
            div.style.left = '0';
            div.style.right = '0';
            div.style.zIndex = '1600';
            div.style.overflow = 'hidden';
            div.style.background = 'transparent';
            div.innerHTML = `
                <wx-open-launch-weapp username="${object.username}" path="${object.path}">
                    <template>
                        <div style="background: transparent; padding:5000px"></div> 
                    </template>
                </wx-open-launch-weapp>
            `;
            el.appendChild(div);

        }
    })
}



module.exports = miniOpen;