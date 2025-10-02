import { BoxSdkError } from '../box/errors';
import { SerializedData } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export class BaseUrls {
  readonly baseUrl: string = 'https://api.box.com';
  readonly uploadUrl: string = 'https://upload.box.com/api';
  readonly oauth2Url: string = 'https://account.box.com/api/oauth2';
  readonly rawData?: SerializedData;
  constructor(
    fields: Omit<BaseUrls, 'baseUrl' | 'uploadUrl' | 'oauth2Url'> &
      Partial<Pick<BaseUrls, 'baseUrl' | 'uploadUrl' | 'oauth2Url'>>,
  ) {
    if (fields.baseUrl !== undefined) {
      this.baseUrl = fields.baseUrl;
    }
    if (fields.uploadUrl !== undefined) {
      this.uploadUrl = fields.uploadUrl;
    }
    if (fields.oauth2Url !== undefined) {
      this.oauth2Url = fields.oauth2Url;
    }
    if (fields.rawData !== undefined) {
      this.rawData = fields.rawData;
    }
  }
}
export interface BaseUrlsInput {
  readonly baseUrl?: string;
  readonly uploadUrl?: string;
  readonly oauth2Url?: string;
  readonly rawData?: SerializedData;
}
export function serializeBaseUrls(val: BaseUrls): SerializedData {
  return {
    ['base_url']: val.baseUrl,
    ['upload_url']: val.uploadUrl,
    ['oauth2_url']: val.oauth2Url,
  };
}
export function deserializeBaseUrls(val: SerializedData): BaseUrls {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "BaseUrls"' });
  }
  if (val.base_url == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "base_url" of type "BaseUrls" to be defined',
    });
  }
  if (!sdIsString(val.base_url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "base_url" of type "BaseUrls"',
    });
  }
  const baseUrl: string = val.base_url;
  if (val.upload_url == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "upload_url" of type "BaseUrls" to be defined',
    });
  }
  if (!sdIsString(val.upload_url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "upload_url" of type "BaseUrls"',
    });
  }
  const uploadUrl: string = val.upload_url;
  if (val.oauth2_url == void 0) {
    throw new BoxSdkError({
      message: 'Expecting "oauth2_url" of type "BaseUrls" to be defined',
    });
  }
  if (!sdIsString(val.oauth2_url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "oauth2_url" of type "BaseUrls"',
    });
  }
  const oauth2Url: string = val.oauth2_url;
  return new BaseUrls({
    baseUrl: baseUrl,
    uploadUrl: uploadUrl,
    oauth2Url: oauth2Url,
  });
}
export function serializeBaseUrlsInput(val: BaseUrlsInput): SerializedData {
  return {
    ['baseUrl']: val.baseUrl,
    ['uploadUrl']: val.uploadUrl,
    ['oauth2Url']: val.oauth2Url,
  };
}
export function deserializeBaseUrlsInput(val: SerializedData): BaseUrlsInput {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "BaseUrlsInput"' });
  }
  if (!(val.baseUrl == void 0) && !sdIsString(val.baseUrl)) {
    throw new BoxSdkError({
      message: 'Expecting string for "baseUrl" of type "BaseUrlsInput"',
    });
  }
  const baseUrl: undefined | string =
    val.baseUrl == void 0 ? void 0 : val.baseUrl;
  if (!(val.uploadUrl == void 0) && !sdIsString(val.uploadUrl)) {
    throw new BoxSdkError({
      message: 'Expecting string for "uploadUrl" of type "BaseUrlsInput"',
    });
  }
  const uploadUrl: undefined | string =
    val.uploadUrl == void 0 ? void 0 : val.uploadUrl;
  if (!(val.oauth2Url == void 0) && !sdIsString(val.oauth2Url)) {
    throw new BoxSdkError({
      message: 'Expecting string for "oauth2Url" of type "BaseUrlsInput"',
    });
  }
  const oauth2Url: undefined | string =
    val.oauth2Url == void 0 ? void 0 : val.oauth2Url;
  return {
    baseUrl: baseUrl,
    uploadUrl: uploadUrl,
    oauth2Url: oauth2Url,
  } satisfies BaseUrlsInput;
}
