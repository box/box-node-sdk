# HubDocumentManager


- [List Hub Document Pages](#list-hub-document-pages)
- [List Hub Document blocks for page](#list-hub-document-blocks-for-page)

## List Hub Document Pages

Retrieves a list of Hub Document Pages for the specified hub.
Includes both root-level pages and sub pages.

This operation is performed by calling function `getHubDocumentPagesV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/get-hub-document-pages/).

*Currently we don't have an example for calling `getHubDocumentPagesV2025R0` in integration tests*

### Arguments

- queryParams `GetHubDocumentPagesV2025R0QueryParams`
  - Query parameters of getHubDocumentPagesV2025R0 method
- optionalsInput `GetHubDocumentPagesV2025R0OptionalsInput`
  


### Returns

This function returns a value of type `HubDocumentPagesV2025R0`.

Returns a Hub Document Pages response whose `entries` array contains root-level pages and sub pages. Includes pagination when more results are available.


## List Hub Document blocks for page

Retrieves a sorted list of all Hub Document Blocks on a specified page in the hub document, excluding items.
Blocks are hierarchically organized by their `parent_id`.
Blocks are sorted in order based on user specification in the user interface.
The response will only include content blocks that belong to the specified page. This will not include sub pages or sub page content blocks.

This operation is performed by calling function `getHubDocumentBlocksV2025R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2025.0/get-hub-document-blocks/).

*Currently we don't have an example for calling `getHubDocumentBlocksV2025R0` in integration tests*

### Arguments

- queryParams `GetHubDocumentBlocksV2025R0QueryParams`
  - Query parameters of getHubDocumentBlocksV2025R0 method
- optionalsInput `GetHubDocumentBlocksV2025R0OptionalsInput`
  


### Returns

This function returns a value of type `HubDocumentBlocksV2025R0`.

Returns a Hub Document Blocks response whose `entries` array contains all content blocks of the specified page, except for items.
To retrieve items, use the `GET /hub_items` endpoint.


