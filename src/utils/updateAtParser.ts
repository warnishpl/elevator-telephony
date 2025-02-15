  export function updateAtParser(stringDate: string) {
    const date = new Date(stringDate);
    const lastUpdateMinutes = Math.floor(
      (new Date().getTime() - date.getTime()) / (60 * 1000)
    );
    return lastUpdateMinutes < 60
      ? `${lastUpdateMinutes} min temu`
      : date.toLocaleString();
  }