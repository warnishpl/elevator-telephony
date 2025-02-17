import { requestApi } from "./requestApi";
import { updateAtParser } from "./updateAtParser";

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

export async function refreshRecords<T extends { updatedAt?: string }>(
  path: string,
  updateFunction: (data: T[]) => void,
  parseUpdatedAt: boolean = false
) {
  requestApi({
    path: `/${path}`,
    method: "GET",
  }).then((res) => {
    const data = res.data as T[];
    const processedData = parseUpdatedAt
      ? data.map((item) => ({
          ...item,
          updatedAt: item.updatedAt
            ? updateAtParser(item.updatedAt)
            : undefined,
        }))
      : data;

    updateFunction(processedData);
  });
}
