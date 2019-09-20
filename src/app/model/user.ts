/**
 * 用户信息
 */
export class User {
  network: number; // 1：有网，0：无网
  uid: string; // 有值-已登录，无值-未登录
  avatar: string;
  nickname: string;
  province: string;
  city: string;
  county: string;
  area: string;
  title: string;
  personal: string;
  schoolId: string;
  constructor() {

  }
}
