import { serializeUserFull } from '@/schemas/userFull';
import { deserializeUserFull } from '@/schemas/userFull';
import { serializeUserAvatar } from '@/schemas/userAvatar';
import { deserializeUserAvatar } from '@/schemas/userAvatar';
import { BoxClient } from '@/client';
import { UserFull } from '@/schemas/userFull';
import { UserAvatar } from '@/schemas/userAvatar';
import { CreateUserAvatarRequestBody } from '@/managers/avatars';
import { ByteStream } from '@/internal/utils';
import { decodeBase64 } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { getUuid } from '@/internal/utils';
import { bufferEquals } from '@/internal/utils';
import { readByteStream } from '@/internal/utils';
import { generateByteBuffer } from '@/internal/utils';
import { decodeBase64ByteStream } from '@/internal/utils';
import { getDefaultClient } from './commons';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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
