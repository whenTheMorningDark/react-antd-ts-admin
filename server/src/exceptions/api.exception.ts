import { HttpException } from '@nestjs/common';
// import {
//   ErrorCodeMap,
//   ErrorCodeMapType,
// } from '../contants/error-code.contants';
/**
 * 统一错误代码定义
 */
export const ErrorCodeMap = {
  // 10000 - 99999 业务操作错误
  10000: '参数校验异常',
  10001: '系统用户已存在',
  10002: '填写验证码有误',
  10003: '用户名密码有误',
  10004: '节点路由已存在',
  10005: '权限必须包含父节点',
  10006: '非法操作：该节点仅支持目录类型父节点',
  10007: '非法操作：节点类型无法直接转换',
  10008: '该角色存在关联用户，请先删除关联用户',
  10009: '该部门存在关联用户，请先删除关联用户',
  10010: '该部门存在关联角色，请先删除关联角色',
  10015: '该部门存在子部门，请先删除子部门',
  10011: '旧密码与原密码不一致',
  10012: '如想下线自身可右上角退出',
  10013: '不允许下线该用户',
  10014: '父级菜单不存在',
  10016: '系统内置功能不允许操作',
  10017: '用户不存在',
  10018: '无法查找当前用户所属部门',
  10019: '部门不存在',
  10020: '任务不存在',
  10021: '参数配置键值对已存在',
  10101: '不安全的任务，确保执行的加入@Mission注解',
  10102: '所执行的任务不存在',

  // token相关
  11001: '登录无效或无权限访问',
  11002: '登录身份已过期',
  11003: '无权限，请联系管理员申请权限',

  // OSS相关
  20001: '当前创建的文件或目录已存在',
  20002: '无需操作',
  20003: '已超出支持的最大处理数量',
} as const;

export type ErrorCodeMapType = keyof typeof ErrorCodeMap;

/**
 * Api业务异常均抛出该异常
 */
export class ApiException extends HttpException {
  /**
   * 业务类型错误代码，非Http code
   */
  private errorCode: ErrorCodeMapType;

  constructor(errorCode: ErrorCodeMapType) {
    super(ErrorCodeMap[errorCode], 200);
    this.errorCode = errorCode;
  }

  getErrorCode(): ErrorCodeMapType {
    return this.errorCode;
  }
}
