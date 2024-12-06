import { apiRequest } from '@/apis/apiClient';
import useAuthStore from '@/stores/authStore';

const APIURL_PROJECT = {
  GET_PROJECT_LIST: `/project`,
  CREATE_PROJECT: `/project`,
  MODIFY_PROJECT: `/project`,
  DELETE_PROJECT: (projectSeq: number) => `/project?proSeq=${projectSeq}`,
};

interface IProjectProps {
  projectSeq: number;
  projectName: string;
}

interface IProjectResponse {
  projectSeq: number;
  projectName: string;
  projectUpdateDate: string;
  projectDate: string;
}

export const getProjectList = async () => {
  try {
    const response = await apiRequest.get<IProjectResponse>(
      APIURL_PROJECT.GET_PROJECT_LIST
    );

    if (response.code !== 200)
      throw new Error(`${response.code}, ${response.message}`);

    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const createProject = async () => {
  try {
    const response = await apiRequest.post(APIURL_PROJECT.CREATE_PROJECT);
  } catch (err) {
    console.error(err);
  }
};

export const saveProject = async (props: IProjectProps) => {
  try {
    const { userData } = useAuthStore.getState();
    if (!!!userData) throw new Error('로그인 정보를 불러오는데 실패했습니다.');

    const response = await apiRequest.put(APIURL_PROJECT.MODIFY_PROJECT, {
      proSeq: props.projectSeq,
      projectName: props.projectName,
    });

    return response;
  } catch (err) {
    console.error(err);
  }
};

export const removeProject = async (projectSeq: number) => {
  try {
    const response = await apiRequest.delete(
      APIURL_PROJECT.DELETE_PROJECT(projectSeq)
    );
  } catch (err) {
    console.error(err);
  }
};
