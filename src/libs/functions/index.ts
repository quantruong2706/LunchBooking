export const formatMoney = (v?: string | number) => String(v || '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ'
