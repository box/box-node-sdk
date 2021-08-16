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

	/** A definition of a PUT operation on this path. */
	put?: OpenAPIOperation;

	/** A definition of a POST operation on this path. */
	post?: OpenAPIOperation;
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
		in: 'query';
		required: boolean;
		example: string | number | boolean /* any? */;
		schema: {
			type: 'string';
		};
	}>;
};
