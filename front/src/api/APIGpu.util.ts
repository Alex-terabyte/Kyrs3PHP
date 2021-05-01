import { AxiosResponse } from 'axios';
import { API } from './API.util';

export interface IAPIGpu {
    id: number;
    name: string;
    options: {
        frequency: number;
        memorySize: number;
        tireWidth: number;
        coef: number;
    };
}

export type TAPIGetAllGpuResponse = Array<IAPIGpu>;

export const APIGetAllGpu = async () => {
    const r: AxiosResponse<TAPIGetAllGpuResponse> = await API.get('/gpu');
    return r.data;
};

export const APICreateGpu = async (body: IAPIGpu) => {
    await API.post('/gpu', body);
};

export const APIUpdateGpu = async (body: IAPIGpu) => {
    await API.put(`/gpu/${body.id}`, body);
};

export const APIRemoveGpu = async (id: number) => {
    await API.delete(`/gpu/${id}`);
};
