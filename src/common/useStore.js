import { commonStore } from './stores/commonStore';
import { userStore } from './stores/userStore';

const useStore = () => {
    return { commonStore, userStore };
};

export default useStore;