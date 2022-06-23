const Util = {
    setCookie: function(name, value) {
        document.cookie = name + '=' + value + ';path=/';
    },
    getCookie: function(name) {
        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return value? value[2] : null;
    },
    priceFormat: function(price){
        return price.toString().replace(/\B(?=(\S{3})+(?!\S))/g, ',');
    },

    indexOf: function(datas, data, id) {
        for(var i=0; i<datas.length; i++) {
            if(id) {
                console.log(id);
                if(datas[i][id] === data[id]) return i;
            }
            else {
                if(datas[i].id === data.id) return i;
            }
        }
        return -1;
    },
    stck: function(str, limit) {
        var o, d, p, n = 0, l = limit == null ? 4 : limit;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            if (i > 0 && (p = o - c) > -2 && p < 2 && (n = p == d ? n + 1 : 0) > l - 3)
                return false;
            d = p;
            o = c;
        }
        return true;
    }
}
export default Util;
