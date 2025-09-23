import { BoxSdkError } from '../box/errors.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export interface UserAvatarPicUrlsField {
  /**
   * The location of a small-sized avatar. */
  readonly small?: string;
  /**
   * The location of a large-sized avatar. */
  readonly large?: string;
  /**
   * The location of the avatar preview. */
  readonly preview?: string;
  readonly rawData?: SerializedData;
}
export interface UserAvatar {
  /**
   * Represents an object with user avatar URLs. */
  readonly picUrls?: UserAvatarPicUrlsField;
  readonly rawData?: SerializedData;
}
export function serializeUserAvatarPicUrlsField(
  val: UserAvatarPicUrlsField,
): SerializedData {
  return {
    ['small']: val.small,
    ['large']: val.large,
    ['preview']: val.preview,
  };
}
export function deserializeUserAvatarPicUrlsField(
  val: SerializedData,
): UserAvatarPicUrlsField {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UserAvatarPicUrlsField"',
    });
  }
  if (!(val.small == void 0) && !sdIsString(val.small)) {
    throw new BoxSdkError({
      message: 'Expecting string for "small" of type "UserAvatarPicUrlsField"',
    });
  }
  const small: undefined | string = val.small == void 0 ? void 0 : val.small;
  if (!(val.large == void 0) && !sdIsString(val.large)) {
    throw new BoxSdkError({
      message: 'Expecting string for "large" of type "UserAvatarPicUrlsField"',
    });
  }
  const large: undefined | string = val.large == void 0 ? void 0 : val.large;
  if (!(val.preview == void 0) && !sdIsString(val.preview)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "preview" of type "UserAvatarPicUrlsField"',
    });
  }
  const preview: undefined | string =
    val.preview == void 0 ? void 0 : val.preview;
  return {
    small: small,
    large: large,
    preview: preview,
  } satisfies UserAvatarPicUrlsField;
}
export function serializeUserAvatar(val: UserAvatar): SerializedData {
  return {
    ['pic_urls']:
      val.picUrls == void 0
        ? val.picUrls
        : serializeUserAvatarPicUrlsField(val.picUrls),
  };
}
export function deserializeUserAvatar(val: SerializedData): UserAvatar {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({ message: 'Expecting a map for "UserAvatar"' });
  }
  const picUrls: undefined | UserAvatarPicUrlsField =
    val.pic_urls == void 0
      ? void 0
      : deserializeUserAvatarPicUrlsField(val.pic_urls);
  return { picUrls: picUrls } satisfies UserAvatar;
}
