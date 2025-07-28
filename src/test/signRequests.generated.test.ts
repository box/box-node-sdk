import { serializeFileFull } from '../schemas/fileFull.generated.js';
import { deserializeFileFull } from '../schemas/fileFull.generated.js';
import { serializeFolderFull } from '../schemas/folderFull.generated.js';
import { deserializeFolderFull } from '../schemas/folderFull.generated.js';
import { serializeSignRequest } from '../schemas/signRequest.generated.js';
import { deserializeSignRequest } from '../schemas/signRequest.generated.js';
import { serializeSignRequestCreateRequest } from '../schemas/signRequestCreateRequest.generated.js';
import { deserializeSignRequestCreateRequest } from '../schemas/signRequestCreateRequest.generated.js';
import { serializeSignRequestCreateSigner } from '../schemas/signRequestCreateSigner.generated.js';
import { deserializeSignRequestCreateSigner } from '../schemas/signRequestCreateSigner.generated.js';
import { serializeSignRequestCreateSignerRoleField } from '../schemas/signRequestCreateSigner.generated.js';
import { deserializeSignRequestCreateSignerRoleField } from '../schemas/signRequestCreateSigner.generated.js';
import { serializeFolderMini } from '../schemas/folderMini.generated.js';
import { deserializeFolderMini } from '../schemas/folderMini.generated.js';
import { serializeSignRequestPrefillTag } from '../schemas/signRequestPrefillTag.generated.js';
import { deserializeSignRequestPrefillTag } from '../schemas/signRequestPrefillTag.generated.js';
import { serializeFileBase } from '../schemas/fileBase.generated.js';
import { deserializeFileBase } from '../schemas/fileBase.generated.js';
import { serializeSignRequests } from '../schemas/signRequests.generated.js';
import { deserializeSignRequests } from '../schemas/signRequests.generated.js';
import { DeleteFolderByIdOptionalsInput } from '../managers/folders.generated.js';
import { DeleteFolderByIdOptionals } from '../managers/folders.generated.js';
import { BoxClient } from '../client.generated.js';
import { FileFull } from '../schemas/fileFull.generated.js';
import { FolderFull } from '../schemas/folderFull.generated.js';
import { SignRequest } from '../schemas/signRequest.generated.js';
import { SignRequestCreateRequest } from '../schemas/signRequestCreateRequest.generated.js';
import { SignRequestCreateSigner } from '../schemas/signRequestCreateSigner.generated.js';
import { SignRequestCreateSignerRoleField } from '../schemas/signRequestCreateSigner.generated.js';
import { FolderMini } from '../schemas/folderMini.generated.js';
import { SignRequestPrefillTag } from '../schemas/signRequestPrefillTag.generated.js';
import { FileBase } from '../schemas/fileBase.generated.js';
import { SignRequests } from '../schemas/signRequests.generated.js';
import { DeleteFolderByIdQueryParams } from '../managers/folders.generated.js';
import { getUuid } from '../internal/utils.js';
import { dateFromString } from '../internal/utils.js';
import { dateToString } from '../internal/utils.js';
import { uploadNewFile } from './commons.generated.js';
import { createNewFolder } from './commons.generated.js';
import { getDefaultClient } from './commons.generated.js';
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
