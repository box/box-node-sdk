import { serializeFileFull } from '../schemas/fileFull.js';
import { deserializeFileFull } from '../schemas/fileFull.js';
import { serializeFolderFull } from '../schemas/folderFull.js';
import { deserializeFolderFull } from '../schemas/folderFull.js';
import { serializeSignRequest } from '../schemas/signRequest.js';
import { deserializeSignRequest } from '../schemas/signRequest.js';
import { serializeSignRequestCreateRequest } from '../schemas/signRequestCreateRequest.js';
import { deserializeSignRequestCreateRequest } from '../schemas/signRequestCreateRequest.js';
import { serializeSignRequestCreateSigner } from '../schemas/signRequestCreateSigner.js';
import { deserializeSignRequestCreateSigner } from '../schemas/signRequestCreateSigner.js';
import { serializeSignRequestCreateSignerRoleField } from '../schemas/signRequestCreateSigner.js';
import { deserializeSignRequestCreateSignerRoleField } from '../schemas/signRequestCreateSigner.js';
import { serializeFolderMini } from '../schemas/folderMini.js';
import { deserializeFolderMini } from '../schemas/folderMini.js';
import { serializeSignRequestPrefillTag } from '../schemas/signRequestPrefillTag.js';
import { deserializeSignRequestPrefillTag } from '../schemas/signRequestPrefillTag.js';
import { serializeFileBase } from '../schemas/fileBase.js';
import { deserializeFileBase } from '../schemas/fileBase.js';
import { serializeSignRequests } from '../schemas/signRequests.js';
import { deserializeSignRequests } from '../schemas/signRequests.js';
import { DeleteFolderByIdOptionalsInput } from '../managers/folders.js';
import { DeleteFolderByIdOptionals } from '../managers/folders.js';
import { BoxClient } from '../client.js';
import { FileFull } from '../schemas/fileFull.js';
import { FolderFull } from '../schemas/folderFull.js';
import { SignRequest } from '../schemas/signRequest.js';
import { SignRequestCreateRequest } from '../schemas/signRequestCreateRequest.js';
import { SignRequestCreateSigner } from '../schemas/signRequestCreateSigner.js';
import { SignRequestCreateSignerRoleField } from '../schemas/signRequestCreateSigner.js';
import { FolderMini } from '../schemas/folderMini.js';
import { SignRequestPrefillTag } from '../schemas/signRequestPrefillTag.js';
import { FileBase } from '../schemas/fileBase.js';
import { SignRequests } from '../schemas/signRequests.js';
import { DeleteFolderByIdQueryParams } from '../managers/folders.js';
import { getUuid } from '../internal/utils.js';
import { dateFromString } from '../internal/utils.js';
import { dateToString } from '../internal/utils.js';
import { uploadNewFile } from './commons.js';
import { createNewFolder } from './commons.js';
import { getDefaultClient } from './commons.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { Date } from '../internal/utils.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export const client: BoxClient = getDefaultClient();
test('testCreateGetCancelAndListSignRequest', async function testCreateGetCancelAndListSignRequest(): Promise<any> {
  const signerEmail: string = ''.concat(getUuid(), '@box.com') as string;
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
  const signer1Email: string = ''.concat(getUuid(), '@box.com') as string;
  const signer2Email: string = ''.concat(getUuid(), '@box.com') as string;
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
