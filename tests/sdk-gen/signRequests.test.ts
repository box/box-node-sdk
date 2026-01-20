import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeSignRequest } from '@/schemas/signRequest';
import { deserializeSignRequest } from '@/schemas/signRequest';
import { serializeSignRequestCreateRequest } from '@/schemas/signRequestCreateRequest';
import { deserializeSignRequestCreateRequest } from '@/schemas/signRequestCreateRequest';
import { serializeSignRequestCreateSigner } from '@/schemas/signRequestCreateSigner';
import { deserializeSignRequestCreateSigner } from '@/schemas/signRequestCreateSigner';
import { serializeSignRequestCreateSignerRoleField } from '@/schemas/signRequestCreateSigner';
import { deserializeSignRequestCreateSignerRoleField } from '@/schemas/signRequestCreateSigner';
import { serializeFolderMini } from '@/schemas/folderMini';
import { deserializeFolderMini } from '@/schemas/folderMini';
import { serializeSignRequestPrefillTag } from '@/schemas/signRequestPrefillTag';
import { deserializeSignRequestPrefillTag } from '@/schemas/signRequestPrefillTag';
import { serializeFileBase } from '@/schemas/fileBase';
import { deserializeFileBase } from '@/schemas/fileBase';
import { serializeSignRequests } from '@/schemas/signRequests';
import { deserializeSignRequests } from '@/schemas/signRequests';
import { DeleteFolderByIdOptionalsInput } from '@/managers/folders';
import { DeleteFolderByIdOptionals } from '@/managers/folders';
import { BoxClient } from '@/client';
import { FileFull } from '@/schemas/fileFull';
import { FolderFull } from '@/schemas/folderFull';
import { SignRequest } from '@/schemas/signRequest';
import { SignRequestCreateRequest } from '@/schemas/signRequestCreateRequest';
import { SignRequestCreateSigner } from '@/schemas/signRequestCreateSigner';
import { SignRequestCreateSignerRoleField } from '@/schemas/signRequestCreateSigner';
import { FolderMini } from '@/schemas/folderMini';
import { SignRequestPrefillTag } from '@/schemas/signRequestPrefillTag';
import { FileBase } from '@/schemas/fileBase';
import { SignRequests } from '@/schemas/signRequests';
import { DeleteFolderByIdQueryParams } from '@/managers/folders';
import { getUuid } from '@/internal/utils';
import { dateFromString } from '@/internal/utils';
import { dateToString } from '@/internal/utils';
import { uploadNewFile } from './commons';
import { createNewFolder } from './commons';
import { getDefaultClient } from './commons';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { Date } from '@/internal/utils';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
export const client: BoxClient = getDefaultClient();
test('testCreateGetCancelAndListSignRequest', async function testCreateGetCancelAndListSignRequest(): Promise<any> {
  const signerEmail: string = ''.concat(getUuid(), '@boxdemo.com') as string;
  const fileToSign: FileFull = await uploadNewFile();
  const destinationFolder: FolderFull = await createNewFolder();
  const createdSignRequest: SignRequest =
    await client.signRequests.createSignRequest({
      signers: [
        {
          email: signerEmail,
          suppressNotifications: true,
          declinedRedirectUrl: 'https://www.box.com',
          embedUrlExternalUserId: '123',
          isInPerson: false,
          loginRequired: false,
          password: 'password',
          role: 'signer' as SignRequestCreateSignerRoleField,
        } satisfies SignRequestCreateSigner,
      ],
      areRemindersEnabled: true,
      areTextSignaturesEnabled: true,
      daysValid: 30,
      declinedRedirectUrl: 'https://www.box.com',
      emailMessage: 'Please sign this document',
      emailSubject: 'Sign this document',
      externalId: '123',
      externalSystemName: 'BoxSignIntegration',
      isDocumentPreparationNeeded: false,
      name: 'Sign Request',
      parentFolder: new FolderMini({ id: destinationFolder.id }),
      redirectUrl: 'https://www.box.com',
      prefillTags: [
        {
          dateValue: dateFromString('2035-01-01'),
          documentTagId: '0',
        } satisfies SignRequestPrefillTag,
      ],
      sourceFiles: [new FileBase({ id: fileToSign.id })],
    } satisfies SignRequestCreateRequest);
  if (!(createdSignRequest.areRemindersEnabled == true)) {
    throw new Error('Assertion failed');
  }
  if (!(createdSignRequest.areTextSignaturesEnabled == true)) {
    throw new Error('Assertion failed');
  }
  if (!(createdSignRequest.daysValid == 30)) {
    throw new Error('Assertion failed');
  }
  if (!(createdSignRequest.declinedRedirectUrl == 'https://www.box.com')) {
    throw new Error('Assertion failed');
  }
  if (!(createdSignRequest.emailMessage == 'Please sign this document')) {
    throw new Error('Assertion failed');
  }
  if (!(createdSignRequest.emailSubject == 'Sign this document')) {
    throw new Error('Assertion failed');
  }
  if (!(createdSignRequest.externalId == '123')) {
    throw new Error('Assertion failed');
  }
  if (!(createdSignRequest.externalSystemName == 'BoxSignIntegration')) {
    throw new Error('Assertion failed');
  }
  if (!(createdSignRequest.isDocumentPreparationNeeded == false)) {
    throw new Error('Assertion failed');
  }
  if (!(createdSignRequest.name == 'Sign Request.pdf')) {
    throw new Error('Assertion failed');
  }
  if (!(createdSignRequest.redirectUrl == 'https://www.box.com')) {
    throw new Error('Assertion failed');
  }
  if (
    !(createdSignRequest.signFiles!.files![0].name == createdSignRequest.name)
  ) {
    throw new Error('Assertion failed');
  }
  if (!(createdSignRequest.signers![1].email == signerEmail)) {
    throw new Error('Assertion failed');
  }
  if (!(createdSignRequest.signers![1].suppressNotifications == true)) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      createdSignRequest.signers![1].declinedRedirectUrl ==
      'https://www.box.com'
    )
  ) {
    throw new Error('Assertion failed');
  }
  if (!(createdSignRequest.signers![1].embedUrlExternalUserId == '123')) {
    throw new Error('Assertion failed');
  }
  if (!(createdSignRequest.signers![1].isInPerson == false)) {
    throw new Error('Assertion failed');
  }
  if (!(createdSignRequest.signers![1].loginRequired == false)) {
    throw new Error('Assertion failed');
  }
  if (
    !((toString(createdSignRequest.signers![1].role) as string) == 'signer')
  ) {
    throw new Error('Assertion failed');
  }
  if (!(createdSignRequest.parentFolder!.id == destinationFolder.id)) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      dateToString(createdSignRequest.prefillTags![0].dateValue!) ==
      '2035-01-01'
    )
  ) {
    throw new Error('Assertion failed');
  }
  const newSignRequest: SignRequest =
    await client.signRequests.getSignRequestById(createdSignRequest.id!);
  if (!(newSignRequest.signFiles!.files![0].name == createdSignRequest.name)) {
    throw new Error('Assertion failed');
  }
  if (!(newSignRequest.signers![1].email == signerEmail)) {
    throw new Error('Assertion failed');
  }
  if (!(newSignRequest.parentFolder!.id == destinationFolder.id)) {
    throw new Error('Assertion failed');
  }
  const cancelledSignRequest: SignRequest =
    await client.signRequests.cancelSignRequest(createdSignRequest.id!);
  if (!((toString(cancelledSignRequest.status) as string) == 'cancelled')) {
    throw new Error('Assertion failed');
  }
  const signRequests: SignRequests =
    await client.signRequests.getSignRequests();
  if (
    !((toString(signRequests.entries![0].type!) as string) == 'sign-request')
  ) {
    throw new Error('Assertion failed');
  }
  await client.folders.deleteFolderById(destinationFolder.id, {
    queryParams: { recursive: true } satisfies DeleteFolderByIdQueryParams,
  } satisfies DeleteFolderByIdOptionalsInput);
  await client.files.deleteFileById(fileToSign.id);
});
test('testCreateSignRequestWithSignerGroupId', async function testCreateSignRequestWithSignerGroupId(): Promise<any> {
  const signer1Email: string = ''.concat(getUuid(), '@boxdemo.com') as string;
  const signer2Email: string = ''.concat(getUuid(), '@boxdemo.com') as string;
  const fileToSign: FileFull = await uploadNewFile();
  const destinationFolder: FolderFull = await createNewFolder();
  const createdSignRequest: SignRequest =
    await client.signRequests.createSignRequest({
      signers: [
        {
          email: signer1Email,
          signerGroupId: 'user',
        } satisfies SignRequestCreateSigner,
        {
          email: signer2Email,
          signerGroupId: 'user',
        } satisfies SignRequestCreateSigner,
      ],
      parentFolder: new FolderMini({ id: destinationFolder.id }),
      sourceFiles: [new FileBase({ id: fileToSign.id })],
    } satisfies SignRequestCreateRequest);
  if (!(createdSignRequest.signers!.length == 3)) {
    throw new Error('Assertion failed');
  }
  if (!!(createdSignRequest.signers![1].signerGroupId == void 0)) {
    throw new Error('Assertion failed');
  }
  if (
    !(
      createdSignRequest.signers![1].signerGroupId ==
      createdSignRequest.signers![2].signerGroupId
    )
  ) {
    throw new Error('Assertion failed');
  }
  await client.folders.deleteFolderById(destinationFolder.id, {
    queryParams: { recursive: true } satisfies DeleteFolderByIdQueryParams,
  } satisfies DeleteFolderByIdOptionalsInput);
  await client.files.deleteFileById(fileToSign.id);
});
export {};
