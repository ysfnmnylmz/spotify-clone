import api from "libs/api";

const setPlay = async (data: any) => {
    const {device_id, ...otherData} = data
    console.log({device_id})
    try {
        const response = await api.put('me/player/play', otherData, {params: {device_id}} );
        return response.data;
    } catch (e) {
        console.log(e);
        return (e);
    }
};

export default setPlay;
