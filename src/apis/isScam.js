import axiosInstance from "./axios";

export const getIsScams = async (isscam_id) => {
    try{
        const res = await axiosInstance.get(
            `/api/isscam/${isscam_id}?`
        );
        return res.data;
    } catch(err) {
        console.log('isScam_id 조회 실패', err);
    }
}

export const createIsScams = async