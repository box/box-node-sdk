import { serializeNotesConvertResponseV2026R0 } from '@/schemas/v2026R0/notesConvertResponseV2026R0';
import { deserializeNotesConvertResponseV2026R0 } from '@/schemas/v2026R0/notesConvertResponseV2026R0';
import { serializeNotesConvertRequestBodyV2026R0 } from '@/schemas/v2026R0/notesConvertRequestBodyV2026R0';
import { deserializeNotesConvertRequestBodyV2026R0 } from '@/schemas/v2026R0/notesConvertRequestBodyV2026R0';
import { serializeNotesConvertRequestBodyV2026R0ContentFormatField } from '@/schemas/v2026R0/notesConvertRequestBodyV2026R0';
import { deserializeNotesConvertRequestBodyV2026R0ContentFormatField } from '@/schemas/v2026R0/notesConvertRequestBodyV2026R0';
import { serializeFolderReferenceV2026R0 } from '@/schemas/v2026R0/folderReferenceV2026R0';
import { deserializeFolderReferenceV2026R0 } from '@/schemas/v2026R0/folderReferenceV2026R0';
import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { NotesConvertRequestBodyV2026R0Input } from '@/schemas/v2026R0/notesConvertRequestBodyV2026R0';
import { AccessToken } from '@/schemas/accessToken';
import { NotesConvertResponseV2026R0 } from '@/schemas/v2026R0/notesConvertResponseV2026R0';
import { NotesConvertRequestBodyV2026R0 } from '@/schemas/v2026R0/notesConvertRequestBodyV2026R0';
import { NotesConvertRequestBodyV2026R0ContentFormatField } from '@/schemas/v2026R0/notesConvertRequestBodyV2026R0';
import { FolderReferenceV2026R0 } from '@/schemas/v2026R0/folderReferenceV2026R0';
import { FileFull } from '@/schemas/fileFull';
import { getUuid } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { BoxClient } from '@/client';
import { BoxDeveloperTokenAuth } from '@/box/developerTokenAuth';
import { getDefaultClientWithUserSubject } from './commons';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClientWithUserSubject(
  getEnvVar('USER_ID'),
);
test('testConvertMarkdownToBoxNote', async function testConvertMarkdownToBoxNote(): Promise<any> {
  const noteName: string = getUuid();
  const markdownContent: string = '# Heading\\n\\nSome text';
  const downscopedToken: AccessToken = await client.auth.downscopeToken(
    ['item_upload'],
    void 0,
    void 0,
    void 0,
  );
  const downscopedClient: BoxClient = new BoxClient({
    auth: new BoxDeveloperTokenAuth({ token: downscopedToken.accessToken! }),
  });
  const response: NotesConvertResponseV2026R0 =
    await downscopedClient.notes.createNoteConvertV2026R0({
      content: markdownContent,
      contentFormat:
        'markdown' as NotesConvertRequestBodyV2026R0ContentFormatField,
      parent: new FolderReferenceV2026R0({ id: '0' }),
      name: noteName,
    } satisfies NotesConvertRequestBodyV2026R0Input);
  if (!!(response.id == '')) {
    throw new Error('Assertion failed');
  }
  if (!((toString(response.type) as string) == 'file')) {
    throw new Error('Assertion failed');
  }
  const file: FileFull = await client.files.getFileById(response.id);
  if (!(file.name == (''.concat(noteName, '.boxnote') as string))) {
    throw new Error('Assertion failed');
  }
  if (!(file.parent!.id == '0')) {
    throw new Error('Assertion failed');
  }
  await client.files.deleteFileById(response.id);
});
export {};
