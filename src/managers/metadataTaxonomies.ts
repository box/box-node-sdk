import { serializeMetadataTaxonomy } from '../schemas/metadataTaxonomy';
import { deserializeMetadataTaxonomy } from '../schemas/metadataTaxonomy';
import { serializeClientError } from '../schemas/clientError';
import { deserializeClientError } from '../schemas/clientError';
import { serializeMetadataTaxonomies } from '../schemas/metadataTaxonomies';
import { deserializeMetadataTaxonomies } from '../schemas/metadataTaxonomies';
import { serializeMetadataTaxonomyLevels } from '../schemas/metadataTaxonomyLevels';
import { deserializeMetadataTaxonomyLevels } from '../schemas/metadataTaxonomyLevels';
import { serializeMetadataTaxonomyLevel } from '../schemas/metadataTaxonomyLevel';
import { deserializeMetadataTaxonomyLevel } from '../schemas/metadataTaxonomyLevel';
import { serializeMetadataTaxonomyNodes } from '../schemas/metadataTaxonomyNodes';
import { deserializeMetadataTaxonomyNodes } from '../schemas/metadataTaxonomyNodes';
import { serializeMetadataTaxonomyNode } from '../schemas/metadataTaxonomyNode';
import { deserializeMetadataTaxonomyNode } from '../schemas/metadataTaxonomyNode';
import { ResponseFormat } from '../networking/fetchOptions';
import { MetadataTaxonomy } from '../schemas/metadataTaxonomy';
import { ClientError } from '../schemas/clientError';
import { MetadataTaxonomies } from '../schemas/metadataTaxonomies';
import { MetadataTaxonomyLevels } from '../schemas/metadataTaxonomyLevels';
import { MetadataTaxonomyLevel } from '../schemas/metadataTaxonomyLevel';
import { MetadataTaxonomyNodes } from '../schemas/metadataTaxonomyNodes';
import { MetadataTaxonomyNode } from '../schemas/metadataTaxonomyNode';
import { BoxSdkError } from '../box/errors';
import { Authentication } from '../networking/auth';
import { NetworkSession } from '../networking/network';
import { FetchOptions } from '../networking/fetchOptions';
import { FetchResponse } from '../networking/fetchResponse';
import { prepareParams } from '../internal/utils';
import { toString } from '../internal/utils';
import { ByteStream } from '../internal/utils';
import { CancellationToken } from '../internal/utils';
import { SerializedData } from '../serialization/json';
import { sdToJson } from '../serialization/json';
import { sdIsEmpty } from '../serialization/json';
import { sdIsBoolean } from '../serialization/json';
import { sdIsNumber } from '../serialization/json';
import { sdIsString } from '../serialization/json';
import { sdIsList } from '../serialization/json';
import { sdIsMap } from '../serialization/json';
export class CreateMetadataTaxonomyOptionals {
  readonly headers: CreateMetadataTaxonomyHeaders =
    new CreateMetadataTaxonomyHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateMetadataTaxonomyOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<CreateMetadataTaxonomyOptionals, 'headers' | 'cancellationToken'>
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface CreateMetadataTaxonomyOptionalsInput {
  readonly headers?: CreateMetadataTaxonomyHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class GetMetadataTaxonomiesOptionals {
  readonly queryParams: GetMetadataTaxonomiesQueryParams =
    {} satisfies GetMetadataTaxonomiesQueryParams;
  readonly headers: GetMetadataTaxonomiesHeaders =
    new GetMetadataTaxonomiesHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetMetadataTaxonomiesOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetMetadataTaxonomiesOptionals,
          'queryParams' | 'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.queryParams !== undefined) {
      this.queryParams = fields.queryParams;
    }
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetMetadataTaxonomiesOptionalsInput {
  readonly queryParams?: GetMetadataTaxonomiesQueryParams;
  readonly headers?: GetMetadataTaxonomiesHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class GetMetadataTaxonomyByKeyOptionals {
  readonly headers: GetMetadataTaxonomyByKeyHeaders =
    new GetMetadataTaxonomyByKeyHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetMetadataTaxonomyByKeyOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<GetMetadataTaxonomyByKeyOptionals, 'headers' | 'cancellationToken'>
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetMetadataTaxonomyByKeyOptionalsInput {
  readonly headers?: GetMetadataTaxonomyByKeyHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class UpdateMetadataTaxonomyOptionals {
  readonly headers: UpdateMetadataTaxonomyHeaders =
    new UpdateMetadataTaxonomyHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateMetadataTaxonomyOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<UpdateMetadataTaxonomyOptionals, 'headers' | 'cancellationToken'>
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface UpdateMetadataTaxonomyOptionalsInput {
  readonly headers?: UpdateMetadataTaxonomyHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class DeleteMetadataTaxonomyOptionals {
  readonly headers: DeleteMetadataTaxonomyHeaders =
    new DeleteMetadataTaxonomyHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteMetadataTaxonomyOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<DeleteMetadataTaxonomyOptionals, 'headers' | 'cancellationToken'>
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface DeleteMetadataTaxonomyOptionalsInput {
  readonly headers?: DeleteMetadataTaxonomyHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class CreateMetadataTaxonomyLevelOptionals {
  readonly headers: CreateMetadataTaxonomyLevelHeaders =
    new CreateMetadataTaxonomyLevelHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateMetadataTaxonomyLevelOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateMetadataTaxonomyLevelOptionals,
          'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface CreateMetadataTaxonomyLevelOptionalsInput {
  readonly headers?: CreateMetadataTaxonomyLevelHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class UpdateMetadataTaxonomyLevelByIdOptionals {
  readonly headers: UpdateMetadataTaxonomyLevelByIdHeaders =
    new UpdateMetadataTaxonomyLevelByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateMetadataTaxonomyLevelByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateMetadataTaxonomyLevelByIdOptionals,
          'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface UpdateMetadataTaxonomyLevelByIdOptionalsInput {
  readonly headers?: UpdateMetadataTaxonomyLevelByIdHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class AddMetadataTaxonomyLevelOptionals {
  readonly headers: AddMetadataTaxonomyLevelHeaders =
    new AddMetadataTaxonomyLevelHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      AddMetadataTaxonomyLevelOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<AddMetadataTaxonomyLevelOptionals, 'headers' | 'cancellationToken'>
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface AddMetadataTaxonomyLevelOptionalsInput {
  readonly headers?: AddMetadataTaxonomyLevelHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class DeleteMetadataTaxonomyLevelOptionals {
  readonly headers: DeleteMetadataTaxonomyLevelHeaders =
    new DeleteMetadataTaxonomyLevelHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteMetadataTaxonomyLevelOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteMetadataTaxonomyLevelOptionals,
          'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface DeleteMetadataTaxonomyLevelOptionalsInput {
  readonly headers?: DeleteMetadataTaxonomyLevelHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class GetMetadataTaxonomyNodesOptionals {
  readonly queryParams: GetMetadataTaxonomyNodesQueryParams =
    {} satisfies GetMetadataTaxonomyNodesQueryParams;
  readonly headers: GetMetadataTaxonomyNodesHeaders =
    new GetMetadataTaxonomyNodesHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetMetadataTaxonomyNodesOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetMetadataTaxonomyNodesOptionals,
          'queryParams' | 'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.queryParams !== undefined) {
      this.queryParams = fields.queryParams;
    }
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetMetadataTaxonomyNodesOptionalsInput {
  readonly queryParams?: GetMetadataTaxonomyNodesQueryParams;
  readonly headers?: GetMetadataTaxonomyNodesHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class CreateMetadataTaxonomyNodeOptionals {
  readonly headers: CreateMetadataTaxonomyNodeHeaders =
    new CreateMetadataTaxonomyNodeHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      CreateMetadataTaxonomyNodeOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          CreateMetadataTaxonomyNodeOptionals,
          'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface CreateMetadataTaxonomyNodeOptionalsInput {
  readonly headers?: CreateMetadataTaxonomyNodeHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class GetMetadataTaxonomyNodeByIdOptionals {
  readonly headers: GetMetadataTaxonomyNodeByIdHeaders =
    new GetMetadataTaxonomyNodeByIdHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetMetadataTaxonomyNodeByIdOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetMetadataTaxonomyNodeByIdOptionals,
          'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetMetadataTaxonomyNodeByIdOptionalsInput {
  readonly headers?: GetMetadataTaxonomyNodeByIdHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class UpdateMetadataTaxonomyNodeOptionals {
  readonly requestBody: UpdateMetadataTaxonomyNodeRequestBody =
    {} satisfies UpdateMetadataTaxonomyNodeRequestBody;
  readonly headers: UpdateMetadataTaxonomyNodeHeaders =
    new UpdateMetadataTaxonomyNodeHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      UpdateMetadataTaxonomyNodeOptionals,
      'requestBody' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          UpdateMetadataTaxonomyNodeOptionals,
          'requestBody' | 'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.requestBody !== undefined) {
      this.requestBody = fields.requestBody;
    }
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface UpdateMetadataTaxonomyNodeOptionalsInput {
  readonly requestBody?: UpdateMetadataTaxonomyNodeRequestBody;
  readonly headers?: UpdateMetadataTaxonomyNodeHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class DeleteMetadataTaxonomyNodeOptionals {
  readonly headers: DeleteMetadataTaxonomyNodeHeaders =
    new DeleteMetadataTaxonomyNodeHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      DeleteMetadataTaxonomyNodeOptionals,
      'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          DeleteMetadataTaxonomyNodeOptionals,
          'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface DeleteMetadataTaxonomyNodeOptionalsInput {
  readonly headers?: DeleteMetadataTaxonomyNodeHeaders;
  readonly cancellationToken?: CancellationToken;
}
export class GetMetadataTemplateFieldOptionsOptionals {
  readonly queryParams: GetMetadataTemplateFieldOptionsQueryParams =
    {} satisfies GetMetadataTemplateFieldOptionsQueryParams;
  readonly headers: GetMetadataTemplateFieldOptionsHeaders =
    new GetMetadataTemplateFieldOptionsHeaders({});
  readonly cancellationToken?: CancellationToken = void 0;
  constructor(
    fields: Omit<
      GetMetadataTemplateFieldOptionsOptionals,
      'queryParams' | 'headers' | 'cancellationToken'
    > &
      Partial<
        Pick<
          GetMetadataTemplateFieldOptionsOptionals,
          'queryParams' | 'headers' | 'cancellationToken'
        >
      >,
  ) {
    if (fields.queryParams !== undefined) {
      this.queryParams = fields.queryParams;
    }
    if (fields.headers !== undefined) {
      this.headers = fields.headers;
    }
    if (fields.cancellationToken !== undefined) {
      this.cancellationToken = fields.cancellationToken;
    }
  }
}
export interface GetMetadataTemplateFieldOptionsOptionalsInput {
  readonly queryParams?: GetMetadataTemplateFieldOptionsQueryParams;
  readonly headers?: GetMetadataTemplateFieldOptionsHeaders;
  readonly cancellationToken?: CancellationToken;
}
export interface CreateMetadataTaxonomyRequestBody {
  /**
   * The taxonomy key. If it is not provided in the request body, it will be
   * generated from the `displayName`. The `displayName` would be converted
   * to lower case, and all spaces and non-alphanumeric characters replaced
   * with underscores. */
  readonly key?: string;
  /**
   * The display name of the taxonomy. */
  readonly displayName: string;
  /**
   * The namespace of the metadata taxonomy to create. */
  readonly namespace: string;
  readonly rawData?: SerializedData;
}
export class CreateMetadataTaxonomyHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateMetadataTaxonomyHeaders, 'extraHeaders'> &
      Partial<Pick<CreateMetadataTaxonomyHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateMetadataTaxonomyHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export interface GetMetadataTaxonomiesQueryParams {
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
}
export class GetMetadataTaxonomiesHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetMetadataTaxonomiesHeaders, 'extraHeaders'> &
      Partial<Pick<GetMetadataTaxonomiesHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetMetadataTaxonomiesHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class GetMetadataTaxonomyByKeyHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetMetadataTaxonomyByKeyHeaders, 'extraHeaders'> &
      Partial<Pick<GetMetadataTaxonomyByKeyHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetMetadataTaxonomyByKeyHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export interface UpdateMetadataTaxonomyRequestBody {
  /**
   * The display name of the taxonomy. */
  readonly displayName: string;
  readonly rawData?: SerializedData;
}
export class UpdateMetadataTaxonomyHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateMetadataTaxonomyHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateMetadataTaxonomyHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateMetadataTaxonomyHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class DeleteMetadataTaxonomyHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteMetadataTaxonomyHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteMetadataTaxonomyHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteMetadataTaxonomyHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class CreateMetadataTaxonomyLevelHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateMetadataTaxonomyLevelHeaders, 'extraHeaders'> &
      Partial<Pick<CreateMetadataTaxonomyLevelHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateMetadataTaxonomyLevelHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export interface UpdateMetadataTaxonomyLevelByIdRequestBody {
  /**
   * The display name of the taxonomy level. */
  readonly displayName: string;
  /**
   * The description of the taxonomy level. */
  readonly description?: string;
  readonly rawData?: SerializedData;
}
export class UpdateMetadataTaxonomyLevelByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateMetadataTaxonomyLevelByIdHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateMetadataTaxonomyLevelByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateMetadataTaxonomyLevelByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export interface AddMetadataTaxonomyLevelRequestBody {
  /**
   * The display name of the taxonomy level. */
  readonly displayName: string;
  /**
   * The description of the taxonomy level. */
  readonly description?: string;
  readonly rawData?: SerializedData;
}
export class AddMetadataTaxonomyLevelHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<AddMetadataTaxonomyLevelHeaders, 'extraHeaders'> &
      Partial<Pick<AddMetadataTaxonomyLevelHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface AddMetadataTaxonomyLevelHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class DeleteMetadataTaxonomyLevelHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteMetadataTaxonomyLevelHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteMetadataTaxonomyLevelHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteMetadataTaxonomyLevelHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export interface GetMetadataTaxonomyNodesQueryParams {
  /**
   * Filters results by taxonomy level. Multiple values can be provided.
   * Results include nodes that match any of the specified values. */
  readonly level?: readonly number[];
  /**
   * Node identifier of a direct parent node. Multiple values can be provided.
   * Results include nodes that match any of the specified values. */
  readonly parent?: readonly string[];
  /**
   * Node identifier of any ancestor node. Multiple values can be provided.
   * Results include nodes that match any of the specified values. */
  readonly ancestor?: readonly string[];
  /**
   * Query text to search for the taxonomy nodes. */
  readonly query?: string;
  /**
   * When set to `true` this provides the total number of nodes that matched the query.
   * The response will compute counts of up to 10,000 elements. Defaults to `false`. */
  readonly includeTotalResultCount?: boolean;
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
}
export class GetMetadataTaxonomyNodesHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetMetadataTaxonomyNodesHeaders, 'extraHeaders'> &
      Partial<Pick<GetMetadataTaxonomyNodesHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetMetadataTaxonomyNodesHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export interface CreateMetadataTaxonomyNodeRequestBody {
  /**
   * The display name of the taxonomy node. */
  readonly displayName: string;
  /**
   * The level of the taxonomy node. */
  readonly level: number;
  /**
   * The identifier of the parent taxonomy node.
   * Omit this field for root-level nodes. */
  readonly parentId?: string;
  readonly rawData?: SerializedData;
}
export class CreateMetadataTaxonomyNodeHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<CreateMetadataTaxonomyNodeHeaders, 'extraHeaders'> &
      Partial<Pick<CreateMetadataTaxonomyNodeHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface CreateMetadataTaxonomyNodeHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class GetMetadataTaxonomyNodeByIdHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetMetadataTaxonomyNodeByIdHeaders, 'extraHeaders'> &
      Partial<Pick<GetMetadataTaxonomyNodeByIdHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetMetadataTaxonomyNodeByIdHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export interface UpdateMetadataTaxonomyNodeRequestBody {
  /**
   * The display name of the taxonomy node. */
  readonly displayName?: string;
  readonly rawData?: SerializedData;
}
export class UpdateMetadataTaxonomyNodeHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<UpdateMetadataTaxonomyNodeHeaders, 'extraHeaders'> &
      Partial<Pick<UpdateMetadataTaxonomyNodeHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface UpdateMetadataTaxonomyNodeHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class DeleteMetadataTaxonomyNodeHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<DeleteMetadataTaxonomyNodeHeaders, 'extraHeaders'> &
      Partial<Pick<DeleteMetadataTaxonomyNodeHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface DeleteMetadataTaxonomyNodeHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export interface GetMetadataTemplateFieldOptionsQueryParams {
  /**
   * Filters results by taxonomy level. Multiple values can be provided.
   * Results include nodes that match any of the specified values. */
  readonly level?: readonly number[];
  /**
   * Node identifier of a direct parent node. Multiple values can be provided.
   * Results include nodes that match any of the specified values. */
  readonly parent?: readonly string[];
  /**
   * Node identifier of any ancestor node. Multiple values can be provided.
   * Results include nodes that match any of the specified values. */
  readonly ancestor?: readonly string[];
  /**
   * Query text to search for the taxonomy nodes. */
  readonly query?: string;
  /**
   * When set to `true` this provides the total number of nodes that matched the query.
   * The response will compute counts of up to 10,000 elements. Defaults to `false`. */
  readonly includeTotalResultCount?: boolean;
  /**
   * When set to `true`, this only returns valid selectable options for this template
   * taxonomy field. Otherwise, it returns all taxonomy nodes, whether or not they are selectable.
   * Defaults to `true`. */
  readonly onlySelectableOptions?: boolean;
  /**
   * Defines the position marker at which to begin returning results. This is
   * used when paginating using marker-based pagination.
   *
   * This requires `usemarker` to be set to `true`. */
  readonly marker?: string;
  /**
   * The maximum number of items to return per page. */
  readonly limit?: number;
}
export class GetMetadataTemplateFieldOptionsHeaders {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  } = {};
  constructor(
    fields: Omit<GetMetadataTemplateFieldOptionsHeaders, 'extraHeaders'> &
      Partial<Pick<GetMetadataTemplateFieldOptionsHeaders, 'extraHeaders'>>,
  ) {
    if (fields.extraHeaders !== undefined) {
      this.extraHeaders = fields.extraHeaders;
    }
  }
}
export interface GetMetadataTemplateFieldOptionsHeadersInput {
  /**
   * Extra headers that will be included in the HTTP request. */
  readonly extraHeaders?: {
    readonly [key: string]: undefined | string;
  };
}
export class MetadataTaxonomiesManager {
  readonly auth?: Authentication;
  readonly networkSession: NetworkSession = new NetworkSession({});
  constructor(
    fields: Omit<
      MetadataTaxonomiesManager,
      | 'networkSession'
      | 'createMetadataTaxonomy'
      | 'getMetadataTaxonomies'
      | 'getMetadataTaxonomyByKey'
      | 'updateMetadataTaxonomy'
      | 'deleteMetadataTaxonomy'
      | 'createMetadataTaxonomyLevel'
      | 'updateMetadataTaxonomyLevelById'
      | 'addMetadataTaxonomyLevel'
      | 'deleteMetadataTaxonomyLevel'
      | 'getMetadataTaxonomyNodes'
      | 'createMetadataTaxonomyNode'
      | 'getMetadataTaxonomyNodeById'
      | 'updateMetadataTaxonomyNode'
      | 'deleteMetadataTaxonomyNode'
      | 'getMetadataTemplateFieldOptions'
    > &
      Partial<Pick<MetadataTaxonomiesManager, 'networkSession'>>,
  ) {
    if (fields.auth !== undefined) {
      this.auth = fields.auth;
    }
    if (fields.networkSession !== undefined) {
      this.networkSession = fields.networkSession;
    }
  }
  /**
   * Creates a new metadata taxonomy that can be used in
   * metadata templates.
   * @param {CreateMetadataTaxonomyRequestBody} requestBody Request body of createMetadataTaxonomy method
   * @param {CreateMetadataTaxonomyOptionalsInput} optionalsInput
   * @returns {Promise<MetadataTaxonomy>}
   */
  async createMetadataTaxonomy(
    requestBody: CreateMetadataTaxonomyRequestBody,
    optionalsInput: CreateMetadataTaxonomyOptionalsInput = {},
  ): Promise<MetadataTaxonomy> {
    const optionals: CreateMetadataTaxonomyOptionals =
      new CreateMetadataTaxonomyOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_taxonomies',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateMetadataTaxonomyRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataTaxonomy(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Used to retrieve all metadata taxonomies in a namespace.
     * @param {string} namespace The namespace of the metadata taxonomy.
    Example: "enterprise_123456"
     * @param {GetMetadataTaxonomiesOptionalsInput} optionalsInput
     * @returns {Promise<MetadataTaxonomies>}
     */
  async getMetadataTaxonomies(
    namespace: string,
    optionalsInput: GetMetadataTaxonomiesOptionalsInput = {},
  ): Promise<MetadataTaxonomies> {
    const optionals: GetMetadataTaxonomiesOptionals =
      new GetMetadataTaxonomiesOptionals({
        queryParams: optionalsInput.queryParams,
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const queryParams: any = optionals.queryParams;
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['marker']: toString(queryParams.marker) as string,
      ['limit']: toString(queryParams.limit) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_taxonomies/',
            (toString(namespace) as string)!,
          ) as string,
          method: 'GET',
          params: queryParamsMap,
          headers: headersMap,
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataTaxonomies(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Used to retrieve a metadata taxonomy by taxonomy key.
     * @param {string} namespace The namespace of the metadata taxonomy.
    Example: "enterprise_123456"
     * @param {string} taxonomyKey The key of the metadata taxonomy.
    Example: "geography"
     * @param {GetMetadataTaxonomyByKeyOptionalsInput} optionalsInput
     * @returns {Promise<MetadataTaxonomy>}
     */
  async getMetadataTaxonomyByKey(
    namespace: string,
    taxonomyKey: string,
    optionalsInput: GetMetadataTaxonomyByKeyOptionalsInput = {},
  ): Promise<MetadataTaxonomy> {
    const optionals: GetMetadataTaxonomyByKeyOptionals =
      new GetMetadataTaxonomyByKeyOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_taxonomies/',
            (toString(namespace) as string)!,
            '/',
            (toString(taxonomyKey) as string)!,
          ) as string,
          method: 'GET',
          headers: headersMap,
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataTaxonomy(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates an existing metadata taxonomy.
     * @param {string} namespace The namespace of the metadata taxonomy.
    Example: "enterprise_123456"
     * @param {string} taxonomyKey The key of the metadata taxonomy.
    Example: "geography"
     * @param {UpdateMetadataTaxonomyRequestBody} requestBody Request body of updateMetadataTaxonomy method
     * @param {UpdateMetadataTaxonomyOptionalsInput} optionalsInput
     * @returns {Promise<MetadataTaxonomy>}
     */
  async updateMetadataTaxonomy(
    namespace: string,
    taxonomyKey: string,
    requestBody: UpdateMetadataTaxonomyRequestBody,
    optionalsInput: UpdateMetadataTaxonomyOptionalsInput = {},
  ): Promise<MetadataTaxonomy> {
    const optionals: UpdateMetadataTaxonomyOptionals =
      new UpdateMetadataTaxonomyOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_taxonomies/',
            (toString(namespace) as string)!,
            '/',
            (toString(taxonomyKey) as string)!,
          ) as string,
          method: 'PATCH',
          headers: headersMap,
          data: serializeUpdateMetadataTaxonomyRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataTaxonomy(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Delete a metadata taxonomy.
     * This deletion is permanent and cannot be reverted.
     * @param {string} namespace The namespace of the metadata taxonomy.
    Example: "enterprise_123456"
     * @param {string} taxonomyKey The key of the metadata taxonomy.
    Example: "geography"
     * @param {DeleteMetadataTaxonomyOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteMetadataTaxonomy(
    namespace: string,
    taxonomyKey: string,
    optionalsInput: DeleteMetadataTaxonomyOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteMetadataTaxonomyOptionals =
      new DeleteMetadataTaxonomyOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_taxonomies/',
            (toString(namespace) as string)!,
            '/',
            (toString(taxonomyKey) as string)!,
          ) as string,
          method: 'DELETE',
          headers: headersMap,
          responseFormat: 'no_content' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return void 0;
  }
  /**
     * Creates new metadata taxonomy levels.
     * @param {string} namespace The namespace of the metadata taxonomy.
    Example: "enterprise_123456"
     * @param {string} taxonomyKey The key of the metadata taxonomy.
    Example: "geography"
     * @param {readonly MetadataTaxonomyLevel[]} requestBody Request body of createMetadataTaxonomyLevel method
     * @param {CreateMetadataTaxonomyLevelOptionalsInput} optionalsInput
     * @returns {Promise<MetadataTaxonomyLevels>}
     */
  async createMetadataTaxonomyLevel(
    namespace: string,
    taxonomyKey: string,
    requestBody: readonly MetadataTaxonomyLevel[],
    optionalsInput: CreateMetadataTaxonomyLevelOptionalsInput = {},
  ): Promise<MetadataTaxonomyLevels> {
    const optionals: CreateMetadataTaxonomyLevelOptionals =
      new CreateMetadataTaxonomyLevelOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_taxonomies/',
            (toString(namespace) as string)!,
            '/',
            (toString(taxonomyKey) as string)!,
            '/levels',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: requestBody.map(
            serializeMetadataTaxonomyLevel,
          ) as readonly any[],
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataTaxonomyLevels(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates an existing metadata taxonomy level.
     * @param {string} namespace The namespace of the metadata taxonomy.
    Example: "enterprise_123456"
     * @param {string} taxonomyKey The key of the metadata taxonomy.
    Example: "geography"
     * @param {number} levelIndex The index of the metadata taxonomy level.
    Example: 1
     * @param {UpdateMetadataTaxonomyLevelByIdRequestBody} requestBody Request body of updateMetadataTaxonomyLevelById method
     * @param {UpdateMetadataTaxonomyLevelByIdOptionalsInput} optionalsInput
     * @returns {Promise<MetadataTaxonomyLevel>}
     */
  async updateMetadataTaxonomyLevelById(
    namespace: string,
    taxonomyKey: string,
    levelIndex: number,
    requestBody: UpdateMetadataTaxonomyLevelByIdRequestBody,
    optionalsInput: UpdateMetadataTaxonomyLevelByIdOptionalsInput = {},
  ): Promise<MetadataTaxonomyLevel> {
    const optionals: UpdateMetadataTaxonomyLevelByIdOptionals =
      new UpdateMetadataTaxonomyLevelByIdOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_taxonomies/',
            (toString(namespace) as string)!,
            '/',
            (toString(taxonomyKey) as string)!,
            '/levels/',
            (toString(levelIndex) as string)!,
          ) as string,
          method: 'PATCH',
          headers: headersMap,
          data: serializeUpdateMetadataTaxonomyLevelByIdRequestBody(
            requestBody,
          ),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataTaxonomyLevel(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Creates a new metadata taxonomy level and appends it to the existing levels.
     * If there are no levels defined yet, this will create the first level.
     * @param {string} namespace The namespace of the metadata taxonomy.
    Example: "enterprise_123456"
     * @param {string} taxonomyKey The key of the metadata taxonomy.
    Example: "geography"
     * @param {AddMetadataTaxonomyLevelRequestBody} requestBody Request body of addMetadataTaxonomyLevel method
     * @param {AddMetadataTaxonomyLevelOptionalsInput} optionalsInput
     * @returns {Promise<MetadataTaxonomyLevels>}
     */
  async addMetadataTaxonomyLevel(
    namespace: string,
    taxonomyKey: string,
    requestBody: AddMetadataTaxonomyLevelRequestBody,
    optionalsInput: AddMetadataTaxonomyLevelOptionalsInput = {},
  ): Promise<MetadataTaxonomyLevels> {
    const optionals: AddMetadataTaxonomyLevelOptionals =
      new AddMetadataTaxonomyLevelOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_taxonomies/',
            (toString(namespace) as string)!,
            '/',
            (toString(taxonomyKey) as string)!,
            '/levels:append',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeAddMetadataTaxonomyLevelRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataTaxonomyLevels(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Deletes the last level of the metadata taxonomy.
     * @param {string} namespace The namespace of the metadata taxonomy.
    Example: "enterprise_123456"
     * @param {string} taxonomyKey The key of the metadata taxonomy.
    Example: "geography"
     * @param {DeleteMetadataTaxonomyLevelOptionalsInput} optionalsInput
     * @returns {Promise<MetadataTaxonomyLevels>}
     */
  async deleteMetadataTaxonomyLevel(
    namespace: string,
    taxonomyKey: string,
    optionalsInput: DeleteMetadataTaxonomyLevelOptionalsInput = {},
  ): Promise<MetadataTaxonomyLevels> {
    const optionals: DeleteMetadataTaxonomyLevelOptionals =
      new DeleteMetadataTaxonomyLevelOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_taxonomies/',
            (toString(namespace) as string)!,
            '/',
            (toString(taxonomyKey) as string)!,
            '/levels:trim',
          ) as string,
          method: 'POST',
          headers: headersMap,
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataTaxonomyLevels(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Used to retrieve metadata taxonomy nodes based on the parameters specified.
     * Results are sorted in lexicographic order unless a `query` parameter is passed.
     * With a `query` parameter specified, results are sorted in order of relevance.
     * @param {string} namespace The namespace of the metadata taxonomy.
    Example: "enterprise_123456"
     * @param {string} taxonomyKey The key of the metadata taxonomy.
    Example: "geography"
     * @param {GetMetadataTaxonomyNodesOptionalsInput} optionalsInput
     * @returns {Promise<MetadataTaxonomyNodes>}
     */
  async getMetadataTaxonomyNodes(
    namespace: string,
    taxonomyKey: string,
    optionalsInput: GetMetadataTaxonomyNodesOptionalsInput = {},
  ): Promise<MetadataTaxonomyNodes> {
    const optionals: GetMetadataTaxonomyNodesOptionals =
      new GetMetadataTaxonomyNodesOptionals({
        queryParams: optionalsInput.queryParams,
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const queryParams: any = optionals.queryParams;
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['level']: queryParams.level
        ? queryParams.level.map(toString).join(',')
        : undefined,
      ['parent']: queryParams.parent
        ? queryParams.parent.map(toString).join(',')
        : undefined,
      ['ancestor']: queryParams.ancestor
        ? queryParams.ancestor.map(toString).join(',')
        : undefined,
      ['query']: toString(queryParams.query) as string,
      ['include-total-result-count']: toString(
        queryParams.includeTotalResultCount,
      ) as string,
      ['marker']: toString(queryParams.marker) as string,
      ['limit']: toString(queryParams.limit) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_taxonomies/',
            (toString(namespace) as string)!,
            '/',
            (toString(taxonomyKey) as string)!,
            '/nodes',
          ) as string,
          method: 'GET',
          params: queryParamsMap,
          headers: headersMap,
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataTaxonomyNodes(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Creates a new metadata taxonomy node.
     * @param {string} namespace The namespace of the metadata taxonomy.
    Example: "enterprise_123456"
     * @param {string} taxonomyKey The key of the metadata taxonomy.
    Example: "geography"
     * @param {CreateMetadataTaxonomyNodeRequestBody} requestBody Request body of createMetadataTaxonomyNode method
     * @param {CreateMetadataTaxonomyNodeOptionalsInput} optionalsInput
     * @returns {Promise<MetadataTaxonomyNode>}
     */
  async createMetadataTaxonomyNode(
    namespace: string,
    taxonomyKey: string,
    requestBody: CreateMetadataTaxonomyNodeRequestBody,
    optionalsInput: CreateMetadataTaxonomyNodeOptionalsInput = {},
  ): Promise<MetadataTaxonomyNode> {
    const optionals: CreateMetadataTaxonomyNodeOptionals =
      new CreateMetadataTaxonomyNodeOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_taxonomies/',
            (toString(namespace) as string)!,
            '/',
            (toString(taxonomyKey) as string)!,
            '/nodes',
          ) as string,
          method: 'POST',
          headers: headersMap,
          data: serializeCreateMetadataTaxonomyNodeRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataTaxonomyNode(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Retrieves a metadata taxonomy node by its identifier.
     * @param {string} namespace The namespace of the metadata taxonomy.
    Example: "enterprise_123456"
     * @param {string} taxonomyKey The key of the metadata taxonomy.
    Example: "geography"
     * @param {string} nodeId The identifier of the metadata taxonomy node.
    Example: "14d3d433-c77f-49c5-b146-9dea370f6e32"
     * @param {GetMetadataTaxonomyNodeByIdOptionalsInput} optionalsInput
     * @returns {Promise<MetadataTaxonomyNode>}
     */
  async getMetadataTaxonomyNodeById(
    namespace: string,
    taxonomyKey: string,
    nodeId: string,
    optionalsInput: GetMetadataTaxonomyNodeByIdOptionalsInput = {},
  ): Promise<MetadataTaxonomyNode> {
    const optionals: GetMetadataTaxonomyNodeByIdOptionals =
      new GetMetadataTaxonomyNodeByIdOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_taxonomies/',
            (toString(namespace) as string)!,
            '/',
            (toString(taxonomyKey) as string)!,
            '/nodes/',
            (toString(nodeId) as string)!,
          ) as string,
          method: 'GET',
          headers: headersMap,
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataTaxonomyNode(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Updates an existing metadata taxonomy node.
     * @param {string} namespace The namespace of the metadata taxonomy.
    Example: "enterprise_123456"
     * @param {string} taxonomyKey The key of the metadata taxonomy.
    Example: "geography"
     * @param {string} nodeId The identifier of the metadata taxonomy node.
    Example: "14d3d433-c77f-49c5-b146-9dea370f6e32"
     * @param {UpdateMetadataTaxonomyNodeOptionalsInput} optionalsInput
     * @returns {Promise<MetadataTaxonomyNode>}
     */
  async updateMetadataTaxonomyNode(
    namespace: string,
    taxonomyKey: string,
    nodeId: string,
    optionalsInput: UpdateMetadataTaxonomyNodeOptionalsInput = {},
  ): Promise<MetadataTaxonomyNode> {
    const optionals: UpdateMetadataTaxonomyNodeOptionals =
      new UpdateMetadataTaxonomyNodeOptionals({
        requestBody: optionalsInput.requestBody,
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const requestBody: any = optionals.requestBody;
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_taxonomies/',
            (toString(namespace) as string)!,
            '/',
            (toString(taxonomyKey) as string)!,
            '/nodes/',
            (toString(nodeId) as string)!,
          ) as string,
          method: 'PATCH',
          headers: headersMap,
          data: serializeUpdateMetadataTaxonomyNodeRequestBody(requestBody),
          contentType: 'application/json',
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataTaxonomyNode(response.data!),
      rawData: response.data!,
    };
  }
  /**
     * Delete a metadata taxonomy node.
     * This deletion is permanent and cannot be reverted.
     * Only metadata taxonomy nodes without any children can be deleted.
     * @param {string} namespace The namespace of the metadata taxonomy.
    Example: "enterprise_123456"
     * @param {string} taxonomyKey The key of the metadata taxonomy.
    Example: "geography"
     * @param {string} nodeId The identifier of the metadata taxonomy node.
    Example: "14d3d433-c77f-49c5-b146-9dea370f6e32"
     * @param {DeleteMetadataTaxonomyNodeOptionalsInput} optionalsInput
     * @returns {Promise<undefined>}
     */
  async deleteMetadataTaxonomyNode(
    namespace: string,
    taxonomyKey: string,
    nodeId: string,
    optionalsInput: DeleteMetadataTaxonomyNodeOptionalsInput = {},
  ): Promise<undefined> {
    const optionals: DeleteMetadataTaxonomyNodeOptionals =
      new DeleteMetadataTaxonomyNodeOptionals({
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_taxonomies/',
            (toString(namespace) as string)!,
            '/',
            (toString(taxonomyKey) as string)!,
            '/nodes/',
            (toString(nodeId) as string)!,
          ) as string,
          method: 'DELETE',
          headers: headersMap,
          responseFormat: 'no_content' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return void 0;
  }
  /**
     * Used to retrieve metadata taxonomy nodes which are available for the taxonomy field based
     * on its configuration and the parameters specified.
     * Results are sorted in lexicographic order unless a `query` parameter is passed.
     * With a `query` parameter specified, results are sorted in order of relevance.
     * @param {string} namespace The namespace of the metadata taxonomy.
    Example: "enterprise_123456"
     * @param {string} templateKey The name of the metadata template.
    Example: "properties"
     * @param {string} fieldKey The key of the metadata taxonomy field in the template.
    Example: "geography"
     * @param {GetMetadataTemplateFieldOptionsOptionalsInput} optionalsInput
     * @returns {Promise<MetadataTaxonomyNodes>}
     */
  async getMetadataTemplateFieldOptions(
    namespace: string,
    templateKey: string,
    fieldKey: string,
    optionalsInput: GetMetadataTemplateFieldOptionsOptionalsInput = {},
  ): Promise<MetadataTaxonomyNodes> {
    const optionals: GetMetadataTemplateFieldOptionsOptionals =
      new GetMetadataTemplateFieldOptionsOptionals({
        queryParams: optionalsInput.queryParams,
        headers: optionalsInput.headers,
        cancellationToken: optionalsInput.cancellationToken,
      });
    const queryParams: any = optionals.queryParams;
    const headers: any = optionals.headers;
    const cancellationToken: any = optionals.cancellationToken;
    const queryParamsMap: {
      readonly [key: string]: string;
    } = prepareParams({
      ['level']: queryParams.level
        ? queryParams.level.map(toString).join(',')
        : undefined,
      ['parent']: queryParams.parent
        ? queryParams.parent.map(toString).join(',')
        : undefined,
      ['ancestor']: queryParams.ancestor
        ? queryParams.ancestor.map(toString).join(',')
        : undefined,
      ['query']: toString(queryParams.query) as string,
      ['include-total-result-count']: toString(
        queryParams.includeTotalResultCount,
      ) as string,
      ['only-selectable-options']: toString(
        queryParams.onlySelectableOptions,
      ) as string,
      ['marker']: toString(queryParams.marker) as string,
      ['limit']: toString(queryParams.limit) as string,
    });
    const headersMap: {
      readonly [key: string]: string;
    } = prepareParams({ ...{}, ...headers.extraHeaders });
    const response: FetchResponse =
      await this.networkSession.networkClient.fetch(
        new FetchOptions({
          url: ''.concat(
            this.networkSession.baseUrls.baseUrl,
            '/2.0/metadata_templates/',
            (toString(namespace) as string)!,
            '/',
            (toString(templateKey) as string)!,
            '/fields/',
            (toString(fieldKey) as string)!,
            '/options',
          ) as string,
          method: 'GET',
          params: queryParamsMap,
          headers: headersMap,
          responseFormat: 'json' as ResponseFormat,
          auth: this.auth,
          networkSession: this.networkSession,
          cancellationToken: cancellationToken,
        }),
      );
    return {
      ...deserializeMetadataTaxonomyNodes(response.data!),
      rawData: response.data!,
    };
  }
}
export interface MetadataTaxonomiesManagerInput {
  readonly auth?: Authentication;
  readonly networkSession?: NetworkSession;
}
export function serializeCreateMetadataTaxonomyRequestBody(
  val: CreateMetadataTaxonomyRequestBody,
): SerializedData {
  return {
    ['key']: val.key,
    ['displayName']: val.displayName,
    ['namespace']: val.namespace,
  };
}
export function deserializeCreateMetadataTaxonomyRequestBody(
  val: SerializedData,
): CreateMetadataTaxonomyRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateMetadataTaxonomyRequestBody"',
    });
  }
  if (!(val.key == void 0) && !sdIsString(val.key)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "key" of type "CreateMetadataTaxonomyRequestBody"',
    });
  }
  const key: undefined | string = val.key == void 0 ? void 0 : val.key;
  if (val.displayName == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "displayName" of type "CreateMetadataTaxonomyRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.displayName)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "displayName" of type "CreateMetadataTaxonomyRequestBody"',
    });
  }
  const displayName: string = val.displayName;
  if (val.namespace == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "namespace" of type "CreateMetadataTaxonomyRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.namespace)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "namespace" of type "CreateMetadataTaxonomyRequestBody"',
    });
  }
  const namespace: string = val.namespace;
  return {
    key: key,
    displayName: displayName,
    namespace: namespace,
  } satisfies CreateMetadataTaxonomyRequestBody;
}
export function serializeUpdateMetadataTaxonomyRequestBody(
  val: UpdateMetadataTaxonomyRequestBody,
): SerializedData {
  return { ['displayName']: val.displayName };
}
export function deserializeUpdateMetadataTaxonomyRequestBody(
  val: SerializedData,
): UpdateMetadataTaxonomyRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateMetadataTaxonomyRequestBody"',
    });
  }
  if (val.displayName == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "displayName" of type "UpdateMetadataTaxonomyRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.displayName)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "displayName" of type "UpdateMetadataTaxonomyRequestBody"',
    });
  }
  const displayName: string = val.displayName;
  return {
    displayName: displayName,
  } satisfies UpdateMetadataTaxonomyRequestBody;
}
export function serializeUpdateMetadataTaxonomyLevelByIdRequestBody(
  val: UpdateMetadataTaxonomyLevelByIdRequestBody,
): SerializedData {
  return { ['displayName']: val.displayName, ['description']: val.description };
}
export function deserializeUpdateMetadataTaxonomyLevelByIdRequestBody(
  val: SerializedData,
): UpdateMetadataTaxonomyLevelByIdRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message:
        'Expecting a map for "UpdateMetadataTaxonomyLevelByIdRequestBody"',
    });
  }
  if (val.displayName == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "displayName" of type "UpdateMetadataTaxonomyLevelByIdRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.displayName)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "displayName" of type "UpdateMetadataTaxonomyLevelByIdRequestBody"',
    });
  }
  const displayName: string = val.displayName;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "UpdateMetadataTaxonomyLevelByIdRequestBody"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  return {
    displayName: displayName,
    description: description,
  } satisfies UpdateMetadataTaxonomyLevelByIdRequestBody;
}
export function serializeAddMetadataTaxonomyLevelRequestBody(
  val: AddMetadataTaxonomyLevelRequestBody,
): SerializedData {
  return { ['displayName']: val.displayName, ['description']: val.description };
}
export function deserializeAddMetadataTaxonomyLevelRequestBody(
  val: SerializedData,
): AddMetadataTaxonomyLevelRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "AddMetadataTaxonomyLevelRequestBody"',
    });
  }
  if (val.displayName == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "displayName" of type "AddMetadataTaxonomyLevelRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.displayName)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "displayName" of type "AddMetadataTaxonomyLevelRequestBody"',
    });
  }
  const displayName: string = val.displayName;
  if (!(val.description == void 0) && !sdIsString(val.description)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "description" of type "AddMetadataTaxonomyLevelRequestBody"',
    });
  }
  const description: undefined | string =
    val.description == void 0 ? void 0 : val.description;
  return {
    displayName: displayName,
    description: description,
  } satisfies AddMetadataTaxonomyLevelRequestBody;
}
export function serializeCreateMetadataTaxonomyNodeRequestBody(
  val: CreateMetadataTaxonomyNodeRequestBody,
): SerializedData {
  return {
    ['displayName']: val.displayName,
    ['level']: val.level,
    ['parentId']: val.parentId,
  };
}
export function deserializeCreateMetadataTaxonomyNodeRequestBody(
  val: SerializedData,
): CreateMetadataTaxonomyNodeRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "CreateMetadataTaxonomyNodeRequestBody"',
    });
  }
  if (val.displayName == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "displayName" of type "CreateMetadataTaxonomyNodeRequestBody" to be defined',
    });
  }
  if (!sdIsString(val.displayName)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "displayName" of type "CreateMetadataTaxonomyNodeRequestBody"',
    });
  }
  const displayName: string = val.displayName;
  if (val.level == void 0) {
    throw new BoxSdkError({
      message:
        'Expecting "level" of type "CreateMetadataTaxonomyNodeRequestBody" to be defined',
    });
  }
  if (!sdIsNumber(val.level)) {
    throw new BoxSdkError({
      message:
        'Expecting number for "level" of type "CreateMetadataTaxonomyNodeRequestBody"',
    });
  }
  const level: number = val.level;
  if (!(val.parentId == void 0) && !sdIsString(val.parentId)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "parentId" of type "CreateMetadataTaxonomyNodeRequestBody"',
    });
  }
  const parentId: undefined | string =
    val.parentId == void 0 ? void 0 : val.parentId;
  return {
    displayName: displayName,
    level: level,
    parentId: parentId,
  } satisfies CreateMetadataTaxonomyNodeRequestBody;
}
export function serializeUpdateMetadataTaxonomyNodeRequestBody(
  val: UpdateMetadataTaxonomyNodeRequestBody,
): SerializedData {
  return { ['displayName']: val.displayName };
}
export function deserializeUpdateMetadataTaxonomyNodeRequestBody(
  val: SerializedData,
): UpdateMetadataTaxonomyNodeRequestBody {
  if (!sdIsMap(val)) {
    throw new BoxSdkError({
      message: 'Expecting a map for "UpdateMetadataTaxonomyNodeRequestBody"',
    });
  }
  if (!(val.displayName == void 0) && !sdIsString(val.displayName)) {
    throw new BoxSdkError({
      message:
        'Expecting string for "displayName" of type "UpdateMetadataTaxonomyNodeRequestBody"',
    });
  }
  const displayName: undefined | string =
    val.displayName == void 0 ? void 0 : val.displayName;
  return {
    displayName: displayName,
  } satisfies UpdateMetadataTaxonomyNodeRequestBody;
}
