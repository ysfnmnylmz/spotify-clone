import api from "libs/api";

const setPause = async (data: any) => {
    const {device_id, ...otherData} = data
    try {
        const response = await api.put('me/player/pause', otherData, {params: device_id} );
        return response.data;
    } catch (e) {
        console.log(e);
        return (e);
    }
};

export default setPause;
