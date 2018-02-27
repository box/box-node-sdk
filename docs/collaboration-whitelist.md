Collaboration Whitelists
========================

Collaboration Whitelists are used to determine specific domains or users that can collaborate 
with a Box Enterprise. 

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Add a Domain to Collaboration Whitelist](#add-a-domain-to-collaboration-whitelist)
- [Get a Whitelisted Domain's Information](#get-a-whitelisted-domains-information)
- [Get Whitelisted Domains for an Enterprise](#get-whitelisted-domains-for-an-enterprise)
- [Remove a Domain from Collaboration Whitelist](#remove-a-domain-from-collaboration-whitelist)
- [Exempt a User from the Collaboration Whitelist](#exempt-a-user-from-the-collaboration-whitelist)
- [Get an Exempt User's Information](#get-an-exempt-users-information)
- [Get the User Collaboration Whitelists for an Enterprise](#get-the-user-collaboration-whitelists-for-an-enterprise)
- [Remove a User Exemption from the Collaboration Whitelist](#remove-a-user-exemption-from-the-collaboration-whitelist)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Add a Domain to Collaboration Whitelist
---------------------------------------

You can whitelist only certain domains to collaboration with an enterprise with
[`collaborationWhitelist.addDomain(domain, direction, callback)`]
(http://opensource.box.com/box-node-sdk/jsdoc/CollaborationWhitelist.html#addDomain).

The `direction` parameter determines the level of restriction on which way the collaboration flows. Set to `inbound` will allow users outside of our enterprise to collaboration with content inside your enterprise. Set to `outbound` will allow users inside your enterprise to collaboration with content owned by someone outside your enterprise. Set to `both` will allow both `inbound` and `outbound`.

```js
client.collaborationWhitelist.addDomain('test.com', client.collaborationWhitelist.directions.INBOUND, callback);
```

Get a Whitelisted Domain's Information
--------------------------------------

A collaboration whitelist's information can be retrieved by ID with
[`collaborationWhitelist.getWhitelistedDomain(domainID, options, callback)`]
(http://opensource.box.com/box-node-sdk/jsdoc/CollaborationWhitelist.html#getWhitelistedDomain).

```js
client.collaborationWhitelist.getWhitelistedDomain('12345', {}, callback);
```

Get Whitelisted Domains for an Enterprise
-----------------------------------------

You can retrieve all collaboration whitelists for an enterprise with
[`collaborationWhitelist.getAllWhitelistedDomains(options, callback)`]
(http://opensource.box.com/box-node-sdk/jsdoc/CollaborationWhitelist.html#getAllWhitelistedDomains).

```js
client.collaborationWhitelist.getAllWhitelistedDomains(callback);
```

Alternatively you can limit the number of collaboration whitelists you wish to retrieve by setting a limit, the default is 100 entries and the maximum is 1000 entries.

```js
var options = {
    limit: 50;
};
client.collaborationWhitelist.getAllWhitelistedDomains(options, callback);
```

Remove a Domain from Collaboration Whitelist
--------------------------------------------

You can remove a domain from collaboration whitelist with
[`collaborationWhitelist.removeDomain(domainID, callback)`]
(http://opensource.box.com/box-node-sdk/jsdoc/CollaborationWhitelist.html#removeDomain).

```js
client.collaborationWhitelist.removeDomain('12345', callback);
```

Exempt a User from the Collaboration Whitelist
----------------------------------------------

Alternatively, you can added a specific Box User to a collaboration whitelist with
[`collaborationWhitelist.addExemption(userID, callback)`]
(http://opensource.box.com/box-node-sdk/jsdoc/Collaborations.html#addExemption.

```js
client.collaborationWhitelist.addExemption('5678', callback);
```

Get an Exempt User's Information
--------------------------------

To retrieve a specific collaboration whitelist's information for a user you can use
[`collaborationWhitelist.getExemption(exemptionID, options, callback)`]
(http://opensource.box.com/box-node-sdk/jsdoc/CollaborationWhitelist.html#getExemption).

```js
client.collaborationWhitelist.getExemption(`12345`, callback);
```

Get the User Collaboration Whitelists for an Enterprise
-------------------------------------------------------

To retrieve all user collaboration whitelist's informations for an enterprise use
[`collaborationWhitelist.getAllExemptions(options, callback)`]
(http://opensource.box.com/box-node-sdk/jsdoc/CollaborationWhitelist.html#getAllExemptions).

```js
client.colllaborationWhitelists.getAllExemptions(options, callback);
```

Alternatively you can limit the number of user collaboration whitelists you wish to retrieve by setting a limit, the default is 100 entries and the maximum is 1000 entries.

```js
var options = {
    limit: 50;
};
client.collaborationWhitelist.getAllExemptions(options, callback);
```

Remove a User Exemption from the Collaboration Whitelist
--------------------------------------------------------

To remove a user from collaboration whitelist you can use
[`collaborationWhitelist.removeExemption(exemptionID, callback)`]
(http://opensource.box.com/box-node-sdk/jsdoc/CollaborationWhitelist.html#removeExemption).

```js
client.collaborationWhitelist.removeExemption('12345678', callback);
```