Collaboration Whitelists
========================

Collaboration Whitelists are used to determine specific email domains that can collaborate 
with a Box Enterprise.   Certain users can be exempted from these restrictions, for example
if they are a trusted person who needs to collaborate outside of the normally-allowed set of
domains.

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

You can whitelist a certain domain to allow collaboration with that domain for your
enterprise by calling
[`collaborationWhitelist.addDomain(domain, direction, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/CollaborationWhitelist.html#addDomain).

The `direction` parameter determines the level of restriction on which way the collaboration flows. Set to `inbound` will allow users outside of our enterprise to collaboration with content inside your enterprise. Set to `outbound` will allow users inside your enterprise to collaboration with content owned by someone outside your enterprise. Set to `both` will allow both `inbound` and `outbound`.

<!-- sample post_collaboration_whitelist_entries -->
```js
client.collaborationWhitelist.addDomain('test.com', client.collaborationWhitelist.directions.INBOUND, callback);
```

Get a Whitelisted Domain's Information
--------------------------------------

Information about a specific collaboration whitelist record, which shows
the domain that is whitelisted, can be retrieved by calling
[`collaborationWhitelist.getWhitelistedDomain(domainID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/CollaborationWhitelist.html#getWhitelistedDomain).

<!-- sample get_collaboration_whitelist_entries_id -->
```js
client.collaborationWhitelist.getWhitelistedDomain('12345', {}, callback);
```

Get Whitelisted Domains for an Enterprise
-----------------------------------------

You can retrieve a collection of whitelisted domains for an enterprise with
[`collaborationWhitelist.getAllWhitelistedDomains(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/CollaborationWhitelist.html#getAllWhitelistedDomains).

<!-- sample get_collaboration_whitelist_entries -->
```js
client.collaborationWhitelist.getAllWhitelistedDomains(callback);
```

Alternatively you can limit the number of whitelisted domains you wish to
retrieve by setting a limit.  The default is 100 entries and the maximum is 1,000 entries.

```js
var options = {
    limit: 50;
};
client.collaborationWhitelist.getAllWhitelistedDomains(options, callback);
```

Remove a Domain from Collaboration Whitelist
--------------------------------------------

You can remove a domain from the collaboration whitelist with
[`collaborationWhitelist.removeDomain(domainID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/CollaborationWhitelist.html#removeDomain).

<!-- sample delete_collaboration_whitelist_entries_id -->
```js
client.collaborationWhitelist.removeDomain('12345', callback);
```

Exempt a User from the Collaboration Whitelist
----------------------------------------------

You can make a specific user exempt from the collaboration whitelist, which
allows them to collaborate with users from any domain, by calling
[`collaborationWhitelist.addExemption(userID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Collaborations.html#addExemption).

<!-- sample post_collaboration_whitelist_exempt_targets -->
```js
client.collaborationWhitelist.addExemption('5678', callback);
```

Get an Exempt User's Information
--------------------------------

To retrieve information about a specific user exemption record, you can use
[`collaborationWhitelist.getExemption(exemptionID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/CollaborationWhitelist.html#getExemption).

<!-- sample get_collaboration_whitelist_exempt_targets_id -->
```js
client.collaborationWhitelist.getExemption(`12345`, callback);
```

Get All Exempt Users for an Enterprise
--------------------------------------

To retrieve a collection of users who are exempt from the collaboration whitelist
for an enterprise, call
[`collaborationWhitelist.getAllExemptions(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/CollaborationWhitelist.html#getAllExemptions).

<!-- sample get_collaboration_whitelist_exempt_targets -->
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

To remove a user exemption from collaboration whitelist and make that user
subject to whitelist restrictions again, you can call
[`collaborationWhitelist.removeExemption(exemptionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/CollaborationWhitelist.html#removeExemption).

<!-- sample delete_collaboration_whitelist_exempt_targets_id -->
```js
client.collaborationWhitelist.removeExemption('12345678', callback);
```