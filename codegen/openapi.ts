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
	operationId: string; // unique operation identifier

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

	responses?: Record<string, { content?: Record<string, OpenAPIMediaType> }>;
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

	title?: string;

	description?: string;

	required?: string[];

	properties?: Record<string, OpenAPISchema | OpenAPIReference>;

	example?: any;

	default?: any;

	/** used with type: 'array' */
	items?: OpenAPISchema | OpenAPIReference;

	allOf?: (OpenAPISchema | OpenAPIReference)[];
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
