
import store from '@/store';
import router from '@/router';
const ISLOGON = 'ISLOGON'

export function SET_ISLOGON(params) {
  return localStorage.setItem(ISLOGON, params);
}
export function GET_ISLOGON(params) {
  return localStorage.getItem(ISLOGON);
}
export function REMOVE_ISLOGON(params) {
  return localStorage.removeItem(ISLOGON, params);
}