export const testConfig = {
  // Skip JWT Auth test as not supported in browser
  test_jwt_auth: 'skip',
  test_jwt_auth_downscope: 'skip',
  test_jwt_auth_revoke: 'skip',
  test_jwt_downscope_token_succeeds_if_no_token_available: 'skip',

  // Unknown reason, these tests fail in browser
  testDocgenBatchAndJobs: 'skip',
  testWithSuppressedNotifications: 'skip',
  testAvatars: 'skip',

  // Revoke endpoint have issue with CORS
  test_ccg_auth_revoke: 'skip',
  test_developer_token_auth_revoke: 'skip',
  test_oauth_auth_revoke: 'skip',

  // Not supported in browser
  testGetEventsWithLongPolling: 'skip',
};

export const testEnvList = [
  'JWT_CONFIG_BASE_64',
  'ADMIN_USER_ID',
  'CLIENT_ID',
  'CLIENT_SECRET',
  'USER_ID',
  'ENTERPRISE_ID',
  'BOX_FILE_REQUEST_ID',
  'WORKFLOW_FOLDER_ID',
  'BOX_EXTERNAL_USER_EMAIL',
  'APP_ITEM_ASSOCIATION_FILE_ID',
  'APP_ITEM_ASSOCIATION_FOLDER_ID',
  'APP_ITEM_SHARED_LINK',
  'SLACK_AUTOMATION_USER_ID',
  'SLACK_ORG_ID',
  'SLACK_PARTNER_ITEM_ID',
];
