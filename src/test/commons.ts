import { serializeFolderFull } from '@/schemas/folderFull';
import { deserializeFolderFull } from '@/schemas/folderFull';
import { serializeCreateFolderRequestBody } from '@/managers/folders';
import { deserializeCreateFolderRequestBody } from '@/managers/folders';
import { serializeCreateFolderRequestBodyParentField } from '@/managers/folders';
import { deserializeCreateFolderRequestBodyParentField } from '@/managers/folders';
import { serializeFiles } from '@/schemas/files';
import { deserializeFiles } from '@/schemas/files';
import { serializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { serializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { deserializeUploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { serializeTermsOfServices } from '@/schemas/termsOfServices';
import { deserializeTermsOfServices } from '@/schemas/termsOfServices';
import { serializeCreateTermsOfServiceRequestBody } from '@/managers/termsOfServices';
import { deserializeCreateTermsOfServiceRequestBody } from '@/managers/termsOfServices';
import { serializeCreateTermsOfServiceRequestBodyStatusField } from '@/managers/termsOfServices';
import { deserializeCreateTermsOfServiceRequestBodyStatusField } from '@/managers/termsOfServices';
import { serializeCreateTermsOfServiceRequestBodyTosTypeField } from '@/managers/termsOfServices';
import { deserializeCreateTermsOfServiceRequestBodyTosTypeField } from '@/managers/termsOfServices';
import { serializeClassificationTemplateFieldsOptionsField } from '@/schemas/classificationTemplate';
import { deserializeClassificationTemplateFieldsOptionsField } from '@/schemas/classificationTemplate';
import { serializeAddClassificationRequestBody } from '@/managers/classifications';
import { deserializeAddClassificationRequestBody } from '@/managers/classifications';
import { serializeAddClassificationRequestBodyDataField } from '@/managers/classifications';
import { deserializeAddClassificationRequestBodyDataField } from '@/managers/classifications';
import { serializeAddClassificationRequestBodyDataStaticConfigField } from '@/managers/classifications';
import { deserializeAddClassificationRequestBodyDataStaticConfigField } from '@/managers/classifications';
import { serializeAddClassificationRequestBodyDataStaticConfigClassificationField } from '@/managers/classifications';
import { deserializeAddClassificationRequestBodyDataStaticConfigClassificationField } from '@/managers/classifications';
import { serializeCreateClassificationTemplateRequestBody } from '@/managers/classifications';
import { deserializeCreateClassificationTemplateRequestBody } from '@/managers/classifications';
import { serializeCreateClassificationTemplateRequestBodyFieldsField } from '@/managers/classifications';
import { deserializeCreateClassificationTemplateRequestBodyFieldsField } from '@/managers/classifications';
import { serializeShieldInformationBarrier } from '@/schemas/shieldInformationBarrier';
import { deserializeShieldInformationBarrier } from '@/schemas/shieldInformationBarrier';
import { serializeShieldInformationBarriers } from '@/schemas/shieldInformationBarriers';
import { deserializeShieldInformationBarriers } from '@/schemas/shieldInformationBarriers';
import { serializeCreateShieldInformationBarrierRequestBody } from '@/managers/shieldInformationBarriers';
import { deserializeCreateShieldInformationBarrierRequestBody } from '@/managers/shieldInformationBarriers';
import { serializeEnterpriseBase } from '@/schemas/enterpriseBase';
import { deserializeEnterpriseBase } from '@/schemas/enterpriseBase';
import { serializeClassificationTemplate } from '@/schemas/classificationTemplate';
import { deserializeClassificationTemplate } from '@/schemas/classificationTemplate';
import { serializeFileFull } from '@/schemas/fileFull';
import { deserializeFileFull } from '@/schemas/fileFull';
import { serializeTermsOfService } from '@/schemas/termsOfService';
import { deserializeTermsOfService } from '@/schemas/termsOfService';
import { ClassificationTemplateInput } from '@/schemas/classificationTemplate';
import { CreateClassificationTemplateRequestBodyInput } from '@/managers/classifications';
import { BoxClientInput } from '@/client';
import { FolderFull } from '@/schemas/folderFull';
import { CreateFolderRequestBody } from '@/managers/folders';
import { CreateFolderRequestBodyParentField } from '@/managers/folders';
import { ByteStream } from '@/internal/utils';
import { Files } from '@/schemas/files';
import { UploadFileRequestBody } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesField } from '@/managers/uploads';
import { UploadFileRequestBodyAttributesParentField } from '@/managers/uploads';
import { TermsOfServices } from '@/schemas/termsOfServices';
import { CreateTermsOfServiceRequestBody } from '@/managers/termsOfServices';
import { CreateTermsOfServiceRequestBodyStatusField } from '@/managers/termsOfServices';
import { CreateTermsOfServiceRequestBodyTosTypeField } from '@/managers/termsOfServices';
import { ClassificationTemplateFieldsOptionsField } from '@/schemas/classificationTemplate';
import { AddClassificationRequestBody } from '@/managers/classifications';
import { AddClassificationRequestBodyDataField } from '@/managers/classifications';
import { AddClassificationRequestBodyDataStaticConfigField } from '@/managers/classifications';
import { AddClassificationRequestBodyDataStaticConfigClassificationField } from '@/managers/classifications';
import { CreateClassificationTemplateRequestBody } from '@/managers/classifications';
import { CreateClassificationTemplateRequestBodyFieldsField } from '@/managers/classifications';
import { ShieldInformationBarrier } from '@/schemas/shieldInformationBarrier';
import { ShieldInformationBarriers } from '@/schemas/shieldInformationBarriers';
import { CreateShieldInformationBarrierRequestBody } from '@/managers/shieldInformationBarriers';
import { EnterpriseBase } from '@/schemas/enterpriseBase';
import { decodeBase64 } from '@/internal/utils';
import { getEnvVar } from '@/internal/utils';
import { getUuid } from '@/internal/utils';
import { generateByteStream } from '@/internal/utils';
import { BoxClient } from '@/client';
import { ClassificationTemplate } from '@/schemas/classificationTemplate';
import { FileFull } from '@/schemas/fileFull';
import { TermsOfService } from '@/schemas/termsOfService';
import { Authentication } from '@/networking/auth';
import { BoxCcgAuth } from '@/box/ccgAuth';
import { CcgConfig } from '@/box/ccgAuth';
import { isBrowser } from '@/internal/utils';
import { BoxJwtAuth } from '@/box/jwtAuth';
import { JwtConfig } from '@/box/jwtAuth';
import { toString } from '@/internal/utils';
import { sdToJson } from '@/serialization/json';
import { SerializedData } from '@/serialization/json';
import { sdIsEmpty } from '@/serialization/json';
import { sdIsBoolean } from '@/serialization/json';
import { sdIsNumber } from '@/serialization/json';
import { sdIsString } from '@/serialization/json';
import { sdIsList } from '@/serialization/json';
import { sdIsMap } from '@/serialization/json';
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
    decodeBase64(getEnvVar('JWT_CONFIG_BASE_64')),
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
  classificationTemplateInput: ClassificationTemplateInput,
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
  enterpriseId: string,
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
      } satisfies CreateShieldInformationBarrierRequestBody,
    );
  }
  return barriers.entries![numberOfBarriers - 1];
}
