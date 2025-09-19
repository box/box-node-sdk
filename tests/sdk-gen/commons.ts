import { serializeFolderFull } from '../schemas/folderFull.js';
import { deserializeFolderFull } from '../schemas/folderFull.js';
import { serializeCreateFolderRequestBody } from '../managers/folders.js';
import { deserializeCreateFolderRequestBody } from '../managers/folders.js';
import { serializeCreateFolderRequestBodyParentField } from '../managers/folders.js';
import { deserializeCreateFolderRequestBodyParentField } from '../managers/folders.js';
import { serializeFiles } from '../schemas/files.js';
import { deserializeFiles } from '../schemas/files.js';
import { serializeUploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { deserializeUploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { serializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { deserializeUploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { serializeTermsOfServices } from '../schemas/termsOfServices.js';
import { deserializeTermsOfServices } from '../schemas/termsOfServices.js';
import { serializeCreateTermsOfServiceRequestBody } from '../managers/termsOfServices.js';
import { deserializeCreateTermsOfServiceRequestBody } from '../managers/termsOfServices.js';
import { serializeCreateTermsOfServiceRequestBodyStatusField } from '../managers/termsOfServices.js';
import { deserializeCreateTermsOfServiceRequestBodyStatusField } from '../managers/termsOfServices.js';
import { serializeCreateTermsOfServiceRequestBodyTosTypeField } from '../managers/termsOfServices.js';
import { deserializeCreateTermsOfServiceRequestBodyTosTypeField } from '../managers/termsOfServices.js';
import { serializeClassificationTemplateFieldsOptionsField } from '../schemas/classificationTemplate.js';
import { deserializeClassificationTemplateFieldsOptionsField } from '../schemas/classificationTemplate.js';
import { serializeAddClassificationRequestBody } from '../managers/classifications.js';
import { deserializeAddClassificationRequestBody } from '../managers/classifications.js';
import { serializeAddClassificationRequestBodyDataField } from '../managers/classifications.js';
import { deserializeAddClassificationRequestBodyDataField } from '../managers/classifications.js';
import { serializeAddClassificationRequestBodyDataStaticConfigField } from '../managers/classifications.js';
import { deserializeAddClassificationRequestBodyDataStaticConfigField } from '../managers/classifications.js';
import { serializeAddClassificationRequestBodyDataStaticConfigClassificationField } from '../managers/classifications.js';
import { deserializeAddClassificationRequestBodyDataStaticConfigClassificationField } from '../managers/classifications.js';
import { serializeCreateClassificationTemplateRequestBody } from '../managers/classifications.js';
import { deserializeCreateClassificationTemplateRequestBody } from '../managers/classifications.js';
import { serializeCreateClassificationTemplateRequestBodyFieldsField } from '../managers/classifications.js';
import { deserializeCreateClassificationTemplateRequestBodyFieldsField } from '../managers/classifications.js';
import { serializeShieldInformationBarrier } from '../schemas/shieldInformationBarrier.js';
import { deserializeShieldInformationBarrier } from '../schemas/shieldInformationBarrier.js';
import { serializeShieldInformationBarriers } from '../schemas/shieldInformationBarriers.js';
import { deserializeShieldInformationBarriers } from '../schemas/shieldInformationBarriers.js';
import { serializeCreateShieldInformationBarrierRequestBody } from '../managers/shieldInformationBarriers.js';
import { deserializeCreateShieldInformationBarrierRequestBody } from '../managers/shieldInformationBarriers.js';
import { serializeEnterpriseBase } from '../schemas/enterpriseBase.js';
import { deserializeEnterpriseBase } from '../schemas/enterpriseBase.js';
import { serializeClassificationTemplate } from '../schemas/classificationTemplate.js';
import { deserializeClassificationTemplate } from '../schemas/classificationTemplate.js';
import { serializeFileFull } from '../schemas/fileFull.js';
import { deserializeFileFull } from '../schemas/fileFull.js';
import { serializeTermsOfService } from '../schemas/termsOfService.js';
import { deserializeTermsOfService } from '../schemas/termsOfService.js';
import { ClassificationTemplateInput } from '../schemas/classificationTemplate.js';
import { CreateClassificationTemplateRequestBodyInput } from '../managers/classifications.js';
import { BoxClientInput } from '../client.js';
import { FolderFull } from '../schemas/folderFull.js';
import { CreateFolderRequestBody } from '../managers/folders.js';
import { CreateFolderRequestBodyParentField } from '../managers/folders.js';
import { ByteStream } from '../internal/utils.js';
import { Files } from '../schemas/files.js';
import { UploadFileRequestBody } from '../managers/uploads.js';
import { UploadFileRequestBodyAttributesField } from '../managers/uploads.js';
import { UploadFileRequestBodyAttributesParentField } from '../managers/uploads.js';
import { TermsOfServices } from '../schemas/termsOfServices.js';
import { CreateTermsOfServiceRequestBody } from '../managers/termsOfServices.js';
import { CreateTermsOfServiceRequestBodyStatusField } from '../managers/termsOfServices.js';
import { CreateTermsOfServiceRequestBodyTosTypeField } from '../managers/termsOfServices.js';
import { ClassificationTemplateFieldsOptionsField } from '../schemas/classificationTemplate.js';
import { AddClassificationRequestBody } from '../managers/classifications.js';
import { AddClassificationRequestBodyDataField } from '../managers/classifications.js';
import { AddClassificationRequestBodyDataStaticConfigField } from '../managers/classifications.js';
import { AddClassificationRequestBodyDataStaticConfigClassificationField } from '../managers/classifications.js';
import { CreateClassificationTemplateRequestBody } from '../managers/classifications.js';
import { CreateClassificationTemplateRequestBodyFieldsField } from '../managers/classifications.js';
import { ShieldInformationBarrier } from '../schemas/shieldInformationBarrier.js';
import { ShieldInformationBarriers } from '../schemas/shieldInformationBarriers.js';
import { CreateShieldInformationBarrierRequestBody } from '../managers/shieldInformationBarriers.js';
import { EnterpriseBase } from '../schemas/enterpriseBase.js';
import { decodeBase64 } from '../internal/utils.js';
import { getEnvVar } from '../internal/utils.js';
import { getUuid } from '../internal/utils.js';
import { generateByteStream } from '../internal/utils.js';
import { BoxClient } from '../client.js';
import { ClassificationTemplate } from '../schemas/classificationTemplate.js';
import { FileFull } from '../schemas/fileFull.js';
import { TermsOfService } from '../schemas/termsOfService.js';
import { Authentication } from '../networking/auth.js';
import { BoxCcgAuth } from '../box/ccgAuth.js';
import { CcgConfig } from '../box/ccgAuth.js';
import { isBrowser } from '../internal/utils.js';
import { BoxJwtAuth } from '../box/jwtAuth.js';
import { JwtConfig } from '../box/jwtAuth.js';
import { toString } from '../internal/utils.js';
import { sdToJson } from '../serialization/json.js';
import { SerializedData } from '../serialization/json.js';
import { sdIsEmpty } from '../serialization/json.js';
import { sdIsBoolean } from '../serialization/json.js';
import { sdIsNumber } from '../serialization/json.js';
import { sdIsString } from '../serialization/json.js';
import { sdIsList } from '../serialization/json.js';
import { sdIsMap } from '../serialization/json.js';
export function getCcgAuth(): BoxCcgAuth {
  const ccgConfig: CcgConfig = new CcgConfig({
    clientId: getEnvVar('CLIENT_ID'),
    clientSecret: getEnvVar('CLIENT_SECRET'),
    enterpriseId: getEnvVar('ENTERPRISE_ID'),
  });
  const auth: BoxCcgAuth = new BoxCcgAuth({ config: ccgConfig });
  return auth;
}
export function getJwtAuth(): BoxJwtAuth {
  const jwtConfig: JwtConfig = JwtConfig.fromConfigJsonString(
    decodeBase64(getEnvVar('JWT_CONFIG_BASE_64'))
  );
  const auth: BoxJwtAuth = new BoxJwtAuth({ config: jwtConfig });
  return auth;
}
export function getDefaultClientWithUserSubject(userId: string): BoxClient {
  if (isBrowser()) {
    const ccgAuth: BoxCcgAuth = getCcgAuth();
    const ccgAuthUser: BoxCcgAuth = ccgAuth.withUserSubject(userId);
    return new BoxClient({ auth: ccgAuthUser });
  }
  const auth: BoxJwtAuth = getJwtAuth();
  const authUser: BoxJwtAuth = auth.withUserSubject(userId);
  return new BoxClient({ auth: authUser });
}
export function getDefaultClient(): BoxClient {
  const client: BoxClient = new BoxClient({
    auth: isBrowser() ? getCcgAuth() : getJwtAuth(),
  });
  return client;
}
export async function createNewFolder(): Promise<FolderFull> {
  const client: BoxClient = getDefaultClient();
  const newFolderName: string = getUuid();
  return await client.folders.createFolder({
    name: newFolderName,
    parent: { id: '0' } satisfies CreateFolderRequestBodyParentField,
  } satisfies CreateFolderRequestBody);
}
export async function uploadNewFile(): Promise<FileFull> {
  const client: BoxClient = getDefaultClient();
  const newFileName: string = ''.concat(getUuid(), '.pdf') as string;
  const fileContentStream: ByteStream = generateByteStream(1024 * 1024);
  const uploadedFiles: Files = await client.uploads.uploadFile({
    attributes: {
      name: newFileName,
      parent: { id: '0' } satisfies UploadFileRequestBodyAttributesParentField,
    } satisfies UploadFileRequestBodyAttributesField,
    file: fileContentStream,
  } satisfies UploadFileRequestBody);
  return uploadedFiles.entries![0];
}
export async function getOrCreateTermsOfServices(): Promise<TermsOfService> {
  const client: BoxClient = getDefaultClient();
  const tos: TermsOfServices = await client.termsOfServices.getTermsOfService();
  const numberOfTos: number = tos.entries!.length;
  if (numberOfTos >= 1) {
    const firstTos: TermsOfService = tos.entries![0];
    if ((toString(firstTos.tosType) as string) == 'managed') {
      return firstTos;
    }
  }
  if (numberOfTos >= 2) {
    const secondTos: TermsOfService = tos.entries![1];
    if ((toString(secondTos.tosType) as string) == 'managed') {
      return secondTos;
    }
  }
  return await client.termsOfServices.createTermsOfService({
    status: 'disabled' as CreateTermsOfServiceRequestBodyStatusField,
    tosType: 'managed' as CreateTermsOfServiceRequestBodyTosTypeField,
    text: 'Test TOS',
  } satisfies CreateTermsOfServiceRequestBody);
}
export async function getOrCreateClassification(
  classificationTemplateInput: ClassificationTemplateInput
): Promise<ClassificationTemplateFieldsOptionsField> {
  const classificationTemplate: ClassificationTemplate =
    new ClassificationTemplate({
      id: classificationTemplateInput.id,
      type: classificationTemplateInput.type,
      scope: classificationTemplateInput.scope,
      templateKey: classificationTemplateInput.templateKey,
      displayName: classificationTemplateInput.displayName,
      hidden: classificationTemplateInput.hidden,
      copyInstanceOnItemCopy:
        classificationTemplateInput.copyInstanceOnItemCopy,
      fields: classificationTemplateInput.fields,
    });
  const client: BoxClient = getDefaultClient();
  const classifications: readonly ClassificationTemplateFieldsOptionsField[] =
    classificationTemplate.fields[0].options;
  const currentNumberOfClassifications: number = classifications.length;
  if (currentNumberOfClassifications == 0) {
    const classificationTemplateWithNewClassification: ClassificationTemplate =
      await client.classifications.addClassification([
        new AddClassificationRequestBody({
          data: {
            key: getUuid(),
            staticConfig: {
              classification: {
                colorId: 3,
                classificationDefinition: 'Some description',
              } satisfies AddClassificationRequestBodyDataStaticConfigClassificationField,
            } satisfies AddClassificationRequestBodyDataStaticConfigField,
          } satisfies AddClassificationRequestBodyDataField,
        }),
      ]);
    return classificationTemplateWithNewClassification.fields[0].options[0];
  }
  return classifications[0];
}
export async function getOrCreateClassificationTemplate(): Promise<ClassificationTemplate> {
  const client: BoxClient = getDefaultClient();
  try {
    return await client.classifications.getClassificationTemplate();
  } catch (error) {
    return await client.classifications.createClassificationTemplate({
      fields: [
        new CreateClassificationTemplateRequestBodyFieldsField({ options: [] }),
      ],
    } satisfies CreateClassificationTemplateRequestBodyInput);
  } finally {
  }
}
export async function getOrCreateShieldInformationBarrier(
  clientInput: BoxClientInput,
  enterpriseId: string
): Promise<ShieldInformationBarrier> {
  const client: BoxClient = new BoxClient({
    auth: clientInput.auth,
    networkSession: clientInput.networkSession,
  });
  const barriers: ShieldInformationBarriers =
    await client.shieldInformationBarriers.getShieldInformationBarriers();
  const numberOfBarriers: number = barriers.entries!.length;
  if (numberOfBarriers == 0) {
    return await client.shieldInformationBarriers.createShieldInformationBarrier(
      {
        enterprise: { id: enterpriseId } satisfies EnterpriseBase,
      } satisfies CreateShieldInformationBarrierRequestBody
    );
  }
  return barriers.entries![numberOfBarriers - 1];
}
