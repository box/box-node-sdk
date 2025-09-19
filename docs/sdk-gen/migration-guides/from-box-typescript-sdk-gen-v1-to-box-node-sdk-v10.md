# Migration guide from v1 version of the `box-typescript-sdk-gen` to the v10 version of the `box-node-sdk`

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Migration guide from v1 version of the `box-typescript-sdk-gen` to the v10 version of the `box-node-sdk`](#migration-guide-from-v1-version-of-the-box-typescript-sdk-gen-to-the-v10-version-of-the-box-node-sdk)
  - [Installation](#installation)
    - [How to migrate](#how-to-migrate)
  - [Import namespace and path changes](#import-namespace-and-path-changes)
    - [How to migrate](#how-to-migrate-1)
  - [Union classes name changes](#union-classes-name-changes)
    - [How to migrate](#how-to-migrate-2)
  - [Removed unused models from schemas namespace](#removed-unused-models-from-schemas-namespace)
    - [How to migrate](#how-to-migrate-3)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

In order to start using v10 version of the Box Node SDK, you need to change the dependency in your project.
The artifact name has changed from `box-typescript-sdk-gen` to `box-node-sdk`.
You also need to set the version to `10.0.0` or higher. You can find the latest version on [npm](https://www.npmjs.com/package/box-node-sdk).

### How to migrate

To start using v10 version of Box Node SDK in your project, replace the dependency in your `package.json` file or use the appropriate package manager command.

For example, if you are using `npm`, you can run the following commands:
**Old (`box-typescript-sdk-gen-v1`)**

```console
npm install box-typescript-sdk-gen
```

**New (`box-node-sdk-v10`)**

```console
npm install box-node-sdk
```

Or you can manually update your `package.json` file:
**Old (`box-typescript-sdk-gen-v1`)**

```json
{
  "dependencies": {
    "box-typescript-sdk-gen": "^1.0.0"
  }
}
```

**New (`box-node-sdk-v10`)**

```json
{
  "dependencies": {
    "box-node-sdk": "^10.0.0"
  }
}
```

After updating the dependency, run `npm install` to install the new version of the SDK.

## Import namespace and path changes

In the v10 version of the Box Node SDK, the import paths and namespaces have changed.

### How to migrate

We have a few changes relating to imports caused by the change of the package name and restructuring of the SDK, including:

- The main SDK class is now imported from `box-node-sdk` instead of `box-typescript-sdk-gen`.
- Removed `.generated` suffix for the modules and namespaces.
- Classes and types can be imported from respective modules.

Here are some examples of how to update your import statements:
**Old (`box-typescript-sdk-gen-v1`)**

```typescript
import { BoxClient } from 'box-typescript-sdk-gen/lib/client.generated.js';
import {
  BoxJwtAuth,
  JwtConfig,
} from 'box-typescript-sdk-gen/lib/box/jwtAuth.generated.js';
import { AccessToken } from 'box-typescript-sdk-gen/lib/schemas/accessToken.generated.js';
```

**New (`box-node-sdk-v10`)**

```typescript
import { BoxClient } from 'box-node-sdk';
import { BoxJwtAuth, JwtConfig } from 'box-node-sdk/box';
import { AccessToken } from 'box-node-sdk/schemas';
```

## Union classes name changes

In the version 1 version of the `box-typescript-sdk-gen` our `OneOf` class names (representing unions from the OpenAPI specification)
were fully auto-generated based on the included variants. This often resulted in overly long names that were difficult
to work with in tools like Git. For example: `MetadataFieldFilterDateRangeOrMetadataFieldFilterFloatRangeOrArrayOfStringOrNumberOrString`.
Additionally, every time the new variant was added to the `OneOf`, the class name itself changed.
Starting in v10, the names of `OneOf` classes are defined directly in the specification. This ensures that they are meaningful, short, and stable over time.

### How to migrate

If your code references any of the renamed classes, replace the old name with the new one.
If you were not explicitly using the type names, no changes are needed, since only the class names changed and their behavior remains the same.

List of changed `OneOf` classes and types associated with them:

| Old name                                                                                   | New name                                                           |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| AiAgentAskOrAiAgentExtractOrAiAgentExtractStructuredOrAiAgentTextGen                       | AiAgent                                                            |
| AiAgentAskOrAiAgentReference                                                               | AiAskAgent                                                         |
| AiAgentExtractOrAiAgentReference                                                           | AiExtractAgent                                                     |
| AiAgentExtractStructuredOrAiAgentReference                                                 | AiExtractStructuredAgent                                           |
| AiAgentReferenceOrAiAgentTextGen                                                           | AiTextGenAgent                                                     |
| AppItemEventSourceOrEventSourceOrFileOrFolderOrGenericSourceOrUser                         | EventSourceResource                                                |
| FileBaseOrFolderBaseOrWebLinkBase                                                          | AppItemAssociatedItem                                              |
| FileFullOrFolderFull                                                                       | MetadataQueryResultItem                                            |
| FileFullOrFolderFullOrWebLink                                                              | SearchResultWithSharedLinkItem/RecentItemResource/SearchResultItem |
| FileFullOrFolderMiniOrWebLink                                                              | Item                                                               |
| FileMiniOrFolderMini                                                                       | Resource                                                           |
| FileOrFolderOrWebLink                                                                      | LegalHoldPolicyAssignedItem/CollaborationItem                      |
| FileOrFolderScope                                                                          | ResourceScope                                                      |
| FileOrFolderScopeScopeField                                                                | ResourceScopeScopeField                                            |
| FileReferenceOrFolderReferenceOrWeblinkReferenceV2025R0                                    | HubItemReferenceV2025R0                                            |
| GroupMiniOrUserCollaborations                                                              | CollaborationAccessGrantee                                         |
| IntegrationMappingPartnerItemSlackUnion                                                    | IntegrationMappingPartnerItemSlack                                 |
| IntegrationMappingPartnerItemTeamsUnion                                                    | IntegrationMappingPartnerItemTeams                                 |
| KeywordSkillCardOrStatusSkillCardOrTimelineSkillCardOrTranscriptSkillCard                  | SkillCard                                                          |
| MetadataFieldFilterDateRangeOrMetadataFieldFilterFloatRangeOrArrayOfStringOrNumberOrString | MetadataFilterValue                                                |
| SearchResultsOrSearchResultsWithSharedLinks                                                | SearchResultsResponse                                              |

Some classes were split into multiple ones depending on context.

Manager functions affected by these changes:

| Function                               | Old return type                                                      | New return type       |
| -------------------------------------- | -------------------------------------------------------------------- | --------------------- |
| AiManager.getAiAgentDefaultConfig(...) | AiAgentAskOrAiAgentExtractOrAiAgentExtractStructuredOrAiAgentTextGen | AiAgent               |
| SearchManager.searchForContent(...)    | SearchResultsOrSearchResultsWithSharedLinks                          | SearchResultsResponse |

## Removed unused models from schemas namespace

Several unused types (classes and enums) have been removed from the schemas because they were not used by any SDK functions or by the Box API.

### How to migrate

Here is the full list of removed types:

| Removed classes/enums                      |
| ------------------------------------------ |
| FileOrFolder                               |
| HubActionV2025R0                           |
| MetadataQueryIndex                         |
| MetadataQueryIndexFieldsField              |
| MetadataQueryIndexFieldsSortDirectionField |
| MetadataQueryIndexStatusField              |
| RetentionPolicyAssignmentBase              |
| RetentionPolicyAssignmentBaseTypeField     |
| SkillInvocation                            |
| SkillInvocationEnterpriseField             |
| SkillInvocationEnterpriseTypeField         |
| SkillInvocationSkillField                  |
| SkillInvocationSkillTypeField              |
| SkillInvocationStatusField                 |
| SkillInvocationStatusStateField            |
| SkillInvocationTokenField                  |
| SkillInvocationTokenReadField              |
| SkillInvocationTokenReadTokenTypeField     |
| SkillInvocationTokenWriteField             |
| SkillInvocationTokenWriteTokenTypeField    |
| SkillInvocationTypeField                   |
| WebhookInvocation                          |
| WebhookInvocationTriggerField              |
| WebhookInvocationTypeField                 |
| WorkflowFull                               |

If your code references any of these types, remove those references.
