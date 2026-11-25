# AiSessionsManager

- [List AI sessions](#list-ai-sessions)
- [Delete AI session](#delete-ai-session)

## List AI sessions

Returns a marker-paginated list of the AI sessions that the authenticated
user can read and that were created through the Box public API. Entries are
ordered by `sort` and `direction`, defaulting to `updated_at` descending so
the most recently active session appears first.

The access token must have both the `ai.readwrite` and `root_readwrite`
scopes.

A page may contain fewer than `limit` entries while further pages remain.
Treat a non-null `next_marker` as the only signal that more results exist.

This operation is performed by calling function `getAiSessionsV2026R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2026.0/get-ai-sessions/).

<!-- sample get_ai_sessions_v2026.0 -->

```ts
await client.aiSessions.getAiSessionsV2026R0({
  source: 'api' as GetAiSessionsV2026R0QueryParamsSourceField,
} satisfies GetAiSessionsV2026R0QueryParams);
```

### Arguments

- queryParams `GetAiSessionsV2026R0QueryParams`
  - Query parameters of getAiSessionsV2026R0 method
- optionalsInput `GetAiSessionsV2026R0OptionalsInput`

### Returns

This function returns a value of type `AiSessionsV2026R0`.

Returns a paginated list of AI sessions.

## Delete AI session

Deletes an AI session created through the Box public API, together with its
agent tasks. The session's agent-generated files and uploaded files are
moved to the trash. Files attached as sources from elsewhere in Box are not
affected. Deleting a session does not stop a running task or notify the
agent.

The access token must have both the `ai.readwrite` and `root_readwrite`
scopes.

This operation is performed by calling function `deleteAiSessionByIdV2026R0`.

See the endpoint docs at
[API Reference](https://developer.box.com/reference/v2026.0/delete-ai-sessions-id/).

<!-- sample delete_ai_sessions_id_v2026.0 -->

```ts
await client.aiSessions.deleteAiSessionByIdV2026R0(aiSessionId);
```

### Arguments

- aiSessionId `string`
  - The unique identifier of the AI session. This is the same value returned as `id` by the list endpoint and used as the A2A `contextId`. Example: "23489723"
- optionalsInput `DeleteAiSessionByIdV2026R0OptionalsInput`

### Returns

This function returns a value of type `undefined`.

Returns an empty response when the AI session was successfully deleted.
