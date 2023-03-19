import api from "libs/api";

const setPrev = async (data: any) => {
    const {device_id, ...otherData} = data
    try {
        const response = await api.post('me/player/previous', otherData, {params: device_id} );
        return response.data;
    } catch (e) {
        console.log(e);
        return (e);
    }
};

export default setPrev;
