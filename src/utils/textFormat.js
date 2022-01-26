import numbro from 'numbro';

export function _currency(c) {
  let _c = c?.toString();
  return numbro(_c).formatCurrency({
    currencySymbol: '₦',
    thousandSeparated: true,
  });
}

export function _digitFormat(c) {
  let _c = c?.toString();
  return numbro(_c).format({
    thousandSeparated: true,
  });
}

export function _unformatNumbro(c) {
  let _c = c?.toString();
  return numbro.unformat(_c);
}
