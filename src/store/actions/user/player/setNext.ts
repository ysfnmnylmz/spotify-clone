import api from "libs/api";

const setNext = async (data: any) => {
    const {device_id, ...otherData} = data
    try {
        const response = await api.post('me/player/next', otherData, {params: device_id} );
        return response.data;
    } catch (e) {
        return (e);
    }
};

export default setNext;
