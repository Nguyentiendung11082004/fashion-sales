export function generateGUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
export const FormatMoney = (price: number) => {
  return price?.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export function formatDateString(datestring: any) {
  const day = new Date(new Date(datestring).getTime() + (7 * 60 * 60 * 1000));
  const yyyy = day.getFullYear();
  let mm = day.getMonth() + 1;
  let dd = day.getDate();
  const formattedDd = dd < 10 ? "0" + dd : dd.toString();
  const formattedMm = mm < 10 ? "0" + mm : mm.toString();
  return datestring ? `${formattedDd}/${formattedMm}/${yyyy}` : '';
}
