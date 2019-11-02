
let tools = {
    throllte(fn,delay){
        let canRun = true;
        return function(){
            if(!canRun) return;
            let ctx = this,
            args = arguments;
            if(typeof fn === "function"){
                canRun = false;
                setTimeout(function(){
                    fn.call(ctx,args);
                    canRun = true;
                },delay);
            }
        }
    },
    debounce(fn,delay){
        var timer = null;
        return function(){
            var context = this,
                arg = arguments;
            clearTimeout(timer);
            timer = setTimeout(function(){
                fn.apply(context,arg);
                timer = null;
            },delay);
        }
    },
    queryString(name,str){
        /* eslint-disable-next-line */
        var pattern = new RegExp(`[\?&]${name}=([^&]+)`, 'g');
        str = str || window.location.search;
        var arr, match = '';
        while ((arr = pattern.exec(str)) !== null) {
            match = arr[1];
        }

        return match;
    }
}



export default tools