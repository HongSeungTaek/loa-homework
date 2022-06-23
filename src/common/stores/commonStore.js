import { observable } from 'mobx';

import Const from '../Const';

const commonStore = observable({
    isLoadingOpen: 0,

    isMobile() {
        return Const.MOBILE_VIWE_WIDTH >= window.innerWidth;
    },

});


export { commonStore };