import { AxiosResponse } from 'axios';
import { API } from './API.util';

export interface IAPIRam {
    id: number;
    name: string;
    options: {
        memorySize: number;
        throughput: number;
        frequency: number;
        coef: number;
    };
}

export type TAPIGetAllRamResponse = Array<IAPIRam>;

export const APIGetAllRam = async () => {
    const r: AxiosResponse<TAPIGetAllRamResponse> = await API.get('/ram');
    return r.data;
};

export const APICreateRam = async (body: IAPIRam) => {
    await API.post('/ram', body);
};

export const APIUpdateRam = async (body: IAPIRam) => {
    await API.put(`/ram/${body.id}`, body);
};

export const APIRemoveRam = async (id: number) => {
    await API.delete(`/ram/${id}`);
};
