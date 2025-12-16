'use strict';

/**
 * @fileoverview Integration tests for getSdkGenClient()
 *
 * These tests verify that the SDK-Gen client created via getSdkGenClient()
 * properly reuses authentication and network settings from the legacy SDK
 * and can successfully make API calls.
 */

const path = require('path');
const uuid = require('uuid');
const { getAppClient, getUserClient } = require('../context');
const { createBoxTestFile } = require('../objects/box-test-file');
const { createBoxTestFolder } = require('../objects/box-test-folder');
const {
  createBoxTestUser,
  clearUserContent,
} = require('../objects/box-test-user');

const context = {};

beforeAll(async () => {
  let appClient = getAppClient();
  let user = await createBoxTestUser(appClient);
  let userClient = getUserClient(user.id);
  let folder = await createBoxTestFolder(userClient);

  context.user = user;
  context.appClient = appClient;
  context.legacyClient = userClient;
  context.folder = folder;

  // Create SDK-Gen client from legacy client
  context.sdkGenClient = userClient.getSdkGenClient();
});

afterAll(async () => {
  await context.folder.dispose();
  await clearUserContent(context.legacyClient);
  await context.user.dispose();
  context.folder = null;
  context.user = null;
  context.legacyClient = null;
  context.sdkGenClient = null;
});

describe('getSdkGenClient() Integration Tests', () => {
  test('SDK-Gen client should be created successfully', () => {
    expect(context.sdkGenClient).toBeDefined();
    expect(context.sdkGenClient.users).toBeDefined();
    expect(context.sdkGenClient.folders).toBeDefined();
    expect(context.sdkGenClient.files).toBeDefined();
  });

  test('SDK-Gen client should have auth configured', () => {
    expect(context.sdkGenClient.auth).toBeDefined();
    expect(typeof context.sdkGenClient.auth.retrieveToken).toBe('function');
  });

  test('SDK-Gen client should have networkSession configured', () => {
    expect(context.sdkGenClient.networkSession).toBeDefined();
    expect(context.sdkGenClient.networkSession.baseUrls).toBeDefined();
  });

  test('SDK-Gen client can get current user', async () => {
    const user = await context.sdkGenClient.users.getUserMe();

    expect(user).toBeDefined();
    expect(user.id).toBe(context.user.id);
    expect(user.type).toBe('user');
  });

  test('Legacy and SDK-Gen clients return same user', async () => {
    const legacyUser = await context.legacyClient.users.get('me');
    const sdkGenUser = await context.sdkGenClient.users.getUserMe();

    expect(legacyUser.id).toBe(sdkGenUser.id);
    expect(legacyUser.login).toBe(sdkGenUser.login);
    expect(legacyUser.name).toBe(sdkGenUser.name);
  });

  test('SDK-Gen client can get folder by ID', async () => {
    const folder = await context.sdkGenClient.folders.getFolderById(
      context.folder.id
    );

    expect(folder).toBeDefined();
    expect(folder.id).toBe(context.folder.id);
    expect(folder.type).toBe('folder');
  });

  test('SDK-Gen client can upload and download file', async () => {
    // Create a test file using legacy client helper
    const testFile = await createBoxTestFile(
      context.legacyClient,
      path.join(__dirname, '../resources/blank.pdf'),
      `sdk-gen-test-${uuid.v4()}.pdf`,
      context.folder.id
    );

    try {
      const fileInfo = await context.sdkGenClient.files.getFileById(
        testFile.id
      );

      expect(fileInfo).toBeDefined();
      expect(fileInfo.id).toBe(testFile.id);
      expect(fileInfo.type).toBe('file');
      expect(fileInfo.name).toContain('sdk-gen-test-');
    } finally {
      await context.legacyClient.files.delete(testFile.id);
    }
  });

  test('Multiple SDK-Gen clients from same legacy client work independently', async () => {
    const sdkGenClient1 = context.legacyClient.getSdkGenClient();
    const sdkGenClient2 = context.legacyClient.getSdkGenClient();

    // They should be different instances
    expect(sdkGenClient1).not.toBe(sdkGenClient2);

    // But both should work
    const user1 = await sdkGenClient1.users.getUserMe();
    const user2 = await sdkGenClient2.users.getUserMe();

    expect(user1.id).toBe(user2.id);
    expect(user1.id).toBe(context.user.id);
  });

  test('SDK-Gen client with custom headers works', async () => {
    const sdkGenClientWithHeaders = context.legacyClient.getSdkGenClient({
      networkOptions: {
        additionalHeaders: {
          'X-Box-Test-Header': 'integration-test-value',
        },
      },
    });

    // Should still work with custom headers
    const user = await sdkGenClientWithHeaders.users.getUserMe();

    expect(user).toBeDefined();
    expect(user.id).toBe(context.user.id);
  });
});
