# Integration Tests

## Running integration tests locally

### Create Platform Application
To run integration tests locally you will need a `Custom App` created at https://cloud.app.box.com/developers/console
with `Server Authentication (with JWT)` selected as authentication method.
Once created you can edit properties of the application:
- In section `App Access Level` select `App + Enterprise Access`. You can enable all `Application Scopes`.
- In section `Advanced Features` enable `Make API calls using the as-user header` and `Generate user access tokens`.

Now select `Authorization` and submit application to be reviewed by account admin.


### Export configuration

There are two ways to set up JWT configuration:
1. First method:
- Select `Configuration` tab and in the bottom in the section `App Settings`
   download your app configuration settings as JSON.
- Specify the path to the JWT config file in `test-config.json`, e.g. `"jwt_file_path": "/Users/me/jwt-config.json"`
- Specify id of admin user account in `test-config.json`, e.g. `"admin_user_id": "13855142101"`
2. Alternatively:
- Select `Configuration` tab and in the bottom in the section `App Settings`
  download your app configuration settings as JSON.
- Encode configuration file to Base64, e.g. using command: `base64 -i path_to_json_file`
- Set environment variable: `JWT_CONFIG` with base64 encoded jwt configuration file
- Set environment variable: `ADMIN_USER_ID` with id of admin user account

### Running integration tests

To run integration tests, you can run command:
```bash
npm run jest
```
