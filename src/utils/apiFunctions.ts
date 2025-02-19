import { requestApi } from "./requestApi";

export function deleteRecord(
  uuid: string,
  path: string,
  refreshFunction: () => void
) {
  requestApi({
    path: `/${path}/${uuid}`,
    method: "DELETE",
  }).then(() => {
    refreshFunction();
  });
}

export function addRecord(
  data: any,
  path: string,
  refreshFunction: () => void
) {
  requestApi({
    path: `/${path}`,
    method: "POST",
    data,
  }).then(() => {
    refreshFunction();
  });
}

export async function refreshRecords<T>(
  path: string,
  updateFunction?: (data: T[]) => void
) {
  requestApi({
    path: `/${path}`,
    method: "GET",
  }).then((res) => {
    const data = res.data as T[];
    if (updateFunction) {
      updateFunction(data);
    }
  });
}
