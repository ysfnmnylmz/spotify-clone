import api from "libs/api";

const setPlay = async (data: any) => {
    const {device_id, ...otherData} = data
    try {
        const response = await api.put('me/player/play', otherData, {params: {device_id}} );
        return response.data;
    } catch (e) {
        return (e);
    }
};

export default setPlay;
