import { AxiosResponse } from 'axios';
import { API } from './API.util';

export interface IAPICpu {
    id: number;
    name: string;
    options: { cores: number; flows: number; frequency: number; coef: number };
}

export type TAPIGetAllCpuResponse = Array<IAPICpu>;

export const APIGetAllCpu = async () => {
    const r: AxiosResponse<TAPIGetAllCpuResponse> = await API.get('/cpu');
    return r.data;
};

export const APICreateCpu = async (body: IAPICpu) => {
    await API.post('/cpu', body);
};

export const APIUpdateCpu = async (body: IAPICpu) => {
    await API.put(`/cpu/${body.id}`, body);
};

export const APIRemoveCpu = async (id: number) => {
    await API.delete(`/cpu/${id}`);
};
