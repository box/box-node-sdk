// https://swagger.io/specification/

/**
 * This is the root document object of the OpenAPI document.
 */
export type OpenAPI = {
	/**
	 * REQUIRED. This string MUST be the semantic version number of the OpenAPI
	 * Specification version that the OpenAPI document uses. The openapi field
	 * SHOULD be used by tooling specifications and clients to interpret the
	 * OpenAPI document. This is not related to the API info.version string.
	 */
	openapi: string;

	/**
	 * REQUIRED. The available paths and operations for the API.
	 *
	 * Holds the relative paths to the individual endpoints and their
	 * operations. The path is appended to the URL from the Server Object in
	 * order to construct the full URL. The Paths MAY be empty, due to ACL
	 * constraints.
	 */
	paths: Record<string, OpenAPIPathItem>;

	/**
	 * An element to hold various schemas for the specification.
	 *
	 * Holds a set of reusable objects for different aspects of the OAS. All
	 * objects defined within the components object will have no effect on the
	 * API unless they are explicitly referenced from properties outside the
	 * components object.
	 */
	components?: {
		/** An object to hold reusable Schema Objects. */
		schemas?: Record<string, OpenAPISchema | OpenAPIReference>;
	};
};

/**
 * Describes the operations available on a single path. A Path Item MAY be
 * empty, due to ACL constraints. The path itself is still exposed to the
 * documentation viewer but they will not know which operations and parameters
 * are available.
 */
export type OpenAPIPathItem = {
	/** A definition of a GET operation on this path. */
	get?: OpenAPIOperation;

	/** A definition of a POST operation on this path. */
	post?: OpenAPIOperation;

	/** A definition of a PUT operation on this path. */
	put?: OpenAPIOperation;

	/** A definition of a DELETE operation on this path. */
	delete?: OpenAPIOperation;

	/** A definition of a OPTIONS operation on this path. */
	options?: OpenAPIOperation;

	/** A definition of a HEAD operation on this path. */
	head?: OpenAPIOperation;

	/** A definition of a PATCH operation on this path. */
	patch?: OpenAPIOperation;

	/** A definition of a TRACE operation on this path. */
	trace?: OpenAPIOperation;
};

/**
 * Describes a single API operation on a path.
 */
export type OpenAPIOperation = {
	/**
	 * A list of tags for API documentation control. Tags can be used for
	 * logical grouping of operations by resources or any other qualifier.
	 */
	tags?: string[];

	/** A short summary of what the operation does. */
	summary?: string;

	/**
	 * A verbose explanation of the operation behavior. CommonMark syntax MAY
	 * be used for rich text representation.
	 */
	description?: string;

	/**
	 * Unique string used to identify the operation. The id MUST be unique among
	 * all operations described in the API. The operationId value is
	 * case-sensitive. Tools and libraries MAY use the operationId to uniquely
	 * identify an operation, therefore, it is RECOMMENDED to follow common
	 * programming naming conventions.
	 */
	operationId: string;

	/**
	 * Box extension to the OpenAPI Schema
	 */
	'x-box-tag': string;

	/**
	 * A list of parameters that are applicable for this operation. If a
	 * parameter is already defined at the Path Item, the new definition will
	 * override it but can never remove it. The list MUST NOT include duplicated
	 * parameters. A unique parameter is defined by a combination of a name and
	 * location. The list can use the Reference Object to link to parameters
	 * that are defined at the OpenAPI Object's components/parameters.
	 */
	parameters?: Array<{
		name: string;
		description: string;
		in: 'query' | 'path';
		required: boolean;
		example: string | number | boolean /* any? */;
		schema: OpenAPISchema | OpenAPIReference;
	}>;

	/**
	 * The request body applicable for this operation. The requestBody is only
	 * supported in HTTP methods where the HTTP 1.1 specification RFC7231 has
	 * explicitly defined semantics for request bodies. In other cases where the
	 * HTTP spec is vague, requestBody SHALL be ignored by consumers.
	 */
	requestBody?: OpenAPIRequestBody;

	/**
	 * REQUIRED. The list of possible responses as they are returned from
	 * executing this operation.
	 */
	responses: OpenAPIResponses;
};

/**
 * A container for the expected responses of an operation. The container maps a
 * HTTP response code to the expected response.
 *
 * The documentation is not necessarily expected to cover all possible HTTP
 * response codes because they may not be known in advance. However,
 * documentation is expected to cover a successful operation response and any
 * known errors.
 *
 * The default MAY be used as a default response object for all HTTP codes that
 * are not covered individually by the specification.
 *
 * The Responses Object MUST contain at least one response code, and it SHOULD
 * be the response for a successful operation call.
 */
export type OpenAPIResponses = Record<string, OpenAPIResponse>;

/**
 * Describes a single response from an API Operation, including design-time,
 * static links to operations based on the response.
 */
export type OpenAPIResponse = {
	/**
	 * REQUIRED. A short description of the response. CommonMark syntax MAY be
	 * used for rich text representation.
	 */
	description: string;

	/**
	 * Maps a header name to its definition. RFC7230 states header names are
	 * case insensitive. If a response header is defined with the name
	 * "Content-Type", it SHALL be ignored.
	 */
	headers?: Record<string, OpenAPIHeader>;

	/**
	 * A map containing descriptions of potential response payloads. The key is
	 * a media type or media type range and the value describes it. For
	 * responses that match multiple keys, only the most specific key is
	 * applicable. e.g. text/plain overrides text/*
	 */
	content?: Record<string, OpenAPIMediaType>;

	/**
	 * A map of operations links that can be followed from the response. The key
	 * of the map is a short name for the link, following the naming constraints
	 * of the names for Component Objects.
	 */
	links?: Record<string, any>;
};

/**
 * The Header Object follows the structure of the Parameter Object with the
 * following changes:
 *
 * - name MUST NOT be specified, it is given in the corresponding headers map.
 * - in MUST NOT be specified, it is implicitly in header.
 * - All traits that are affected by the location MUST be applicable to a
 *   location of header (for example, style).
 */
export type OpenAPIHeader = {
	description?: string;
	schema?: OpenAPISchema | OpenAPIReference;
};

/**
 * The Link object represents a possible design-time link for a response. The
 * presence of a link does not guarantee the caller's ability to successfully
 * invoke it, rather it provides a known relationship and traversal mechanism
 * between responses and other operations.
 *
 * Unlike dynamic links (i.e. links provided in the response payload), the OAS
 * linking mechanism does not require link information in the runtime response.
 *
 * For computing links, and providing instructions to execute them, a runtime
 * expression is used for accessing values in an operation and using them as
 * parameters while invoking the linked operation.
 */
export type OpenAPILink = {
	/**
	 * A relative or absolute URI reference to an OAS operation. This field is
	 * mutually exclusive of the operationId field, and MUST point to an
	 * Operation Object. Relative operationRef values MAY be used to locate an
	 * existing Operation Object in the OpenAPI definition.
	 */
	operationRef?: string;

	/**
	 * The name of an existing, resolvable OAS operation, as defined with a
	 * unique operationId. This field is mutually exclusive of the operationRef
	 * field.
	 */
	operationId?: string;
};

export type OpenAPIReference = { $ref: string };

export function isOpenAPIReference(value: any): value is OpenAPIReference {
	return value && typeof value === 'object' && typeof value.$ref === 'string';
}

/**
 * The Schema Object allows the definition of input and output data types.
 */
export type OpenAPISchema = {
	/**
	 * The type keyword is fundamental to JSON Schema. It specifies the data type for a schema.
	 *
	 * Value MUST be a string. Multiple types via an array are not supported.
	 */
	type:
		| 'string'
		| 'number'
		| 'integer'
		| 'object'
		| 'array'
		| 'boolean'
		| 'null';

	/** used with type: 'array' */
	items?: OpenAPISchema | OpenAPIReference;

	/**
	 * To validate against allOf, the given data must be valid against all of
	 * the given subschemas.
	 */
	allOf?: (OpenAPISchema | OpenAPIReference)[];

	/**
	 * To validate against anyOf, the given data must be valid against any (one
	 * or more) of the given subschemas.
	 */
	anyOf?: (OpenAPISchema | OpenAPIReference)[];

	/**
	 * To validate against oneOf, the given data must be valid against exactly
	 * one of the given subschemas.
	 */
	oneOf?: (OpenAPISchema | OpenAPIReference)[];

	/**
	 *  A “title” will preferably be short, whereas a “description” will provide
	 *  a more lengthy explanation about the purpose of the data described by
	 *  the schema.
	 */
	title?: string;

	/**
	 *  A “title” will preferably be short, whereas a “description” will provide
	 *  a more lengthy explanation about the purpose of the data described by
	 *  the schema.
	 */
	description?: string;

	/**
	 * Determines whether this parameter is mandatory. If the parameter location
	 * is "path", this property is REQUIRED and its value MUST be true.
	 * Otherwise, the property MAY be included and its default value is false.
	 */
	required?: string[];

	/**
	 * The enum keyword is used to restrict a value to a fixed set of values. It
	 * must be an array with at least one element, where each element is unique.
	 */
	enum?: string[];

	/**
	 * The properties (key-value pairs) on an object are defined using the
	 * properties keyword. The value of properties is an object, where each key
	 * is the name of a property and each value is a schema used to validate
	 * that property. Any property that doesn’t match any of the property names
	 * in the properties keyword is ignored by this keyword.
	 */
	properties?: Record<string, OpenAPISchema | OpenAPIReference>;

	/**
	 * A free-form property to include an example of an instance for this
	 * schema. To represent examples that cannot be naturally represented in
	 * JSON or YAML, a string value can be used to contain the example with
	 * escaping where necessary.
	 */
	example?: any;

	/**
	 * The default value represents what would be assumed by the consumer of the
	 * input as the value of the schema if one is not provided. Unlike JSON
	 * Schema, the value MUST conform to the defined type for the Schema Object
	 * defined at the same level. For example, if type is string, then default
	 * can be "foo" but cannot be 1.
	 */
	default?: any;
};

/** Describes a single request body. */
export type OpenAPIRequestBody = {
	/**
	 * A brief description of the request body. This could contain examples of
	 * use. CommonMark syntax MAY be used for rich text representation.
	 */
	description?: string;

	/**
	 * REQUIRED. The content of the request body. The key is a media type or
	 * media type range and the value describes it. For requests that match
	 * multiple keys, only the most specific key is applicable. e.g. text/plain
	 * overrides text/*
	 */
	content: Record<string, OpenAPIMediaType>;

	/**
	 * Determines if the request body is required in the request. Defaults to
	 * false. */
	required?: boolean;
};

/**
 * Each Media Type Object provides schema and examples for the media type
 * identified by its key.
 */
export type OpenAPIMediaType = {
	/**
	 * The schema defining the content of the request, response, or parameter.
	 */
	schema: OpenAPISchema | OpenAPIReference;

	/**
	 * Example of the media type. The example object SHOULD be in the correct
	 * format as specified by the media type. The example field is mutually
	 * exclusive of the examples field. Furthermore, if referencing a schema
	 * which contains an example, the example value SHALL override the example
	 * provided by the schema.
	 */
	example?: any;

	/**
	 * Examples of the media type. Each example object SHOULD match the media
	 * type and specified schema if present. The examples field is mutually
	 * exclusive of the example field. Furthermore, if referencing a schema
	 * which contains an example, the examples value SHALL override the example
	 * provided by the schema.
	 */
	examples?: Record<string, object>;

	/**
	 * A map between a property name and its encoding information. The key,
	 * being the property name, MUST exist in the schema as a property. The
	 * encoding object SHALL only apply to requestBody objects when the media
	 * type is multipart or application/x-www-form-urlencoded.
	 */
	encoding?: Record<string, object>;
};
