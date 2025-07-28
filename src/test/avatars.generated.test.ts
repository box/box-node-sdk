import { serializeUserFull } from '../schemas/userFull.generated.js';
import { deserializeUserFull } from '../schemas/userFull.generated.js';
import { serializeUserAvatar } from '../schemas/userAvatar.generated.js';
import { deserializeUserAvatar } from '../schemas/userAvatar.generated.js';
import { BoxClient } from '../client.generated.js';
import { UserFull } from '../schemas/userFull.generated.js';
import { UserAvatar } from '../schemas/userAvatar.generated.js';
import { CreateUserAvatarRequestBody } from '../managers/avatars.generated.js';
import { ByteStream } from '../internal/utils.js';
import { decodeBase64 } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { getUuid } from '../internal/utils.js';
import { bufferEquals } from '../internal/utils.js';
import { readByteStream } from '../internal/utils.js';
import { generateByteBuffer } from '../internal/utils.js';
import { decodeBase64ByteStream } from '../internal/utils.js';
import { getDefaultClient } from './commons.generated.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
test('testAvatars', async function testAvatars(): Promise<any> {
  const user: UserFull = await client.users.getUserMe();
  const createdAvatar: UserAvatar = await client.avatars.createUserAvatar(
    user.id,
    {
      pic: decodeBase64ByteStream(
        'iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEW10NBjBBbqAAAAH0lEQVRoge3BAQ0AAADCoPdPbQ43oAAAAAAAAAAAvg0hAAABmmDh1QAAAABJRU5ErkJggg==',
      ),
      picContentType: 'image/png',
      picFileName: 'avatar.png',
    } satisfies CreateUserAvatarRequestBody,
  );
  if (!!(createdAvatar.picUrls!.small == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!!(createdAvatar.picUrls!.large == void 0)) {
    throw new Error('Assertion failed');
  }
  if (!!(createdAvatar.picUrls!.preview == void 0)) {
    throw new Error('Assertion failed');
  }
  const response: ByteStream = await client.avatars.getUserAvatar(user.id);
  if (
    !(
      bufferEquals(await readByteStream(response), generateByteBuffer(0)) ==
      false
    )
  ) {
    throw new Error('Assertion failed');
  }
  await client.avatars.deleteUserAvatar(user.id);
  await expect(async () => {
    await client.avatars.getUserAvatar(user.id);
  }).rejects.toThrow();
});
export {};
