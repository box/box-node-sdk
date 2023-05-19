Collaboration Allowlists
========================

Collaboration Allowlists are used to determine specific email domains that can collaborate
with a Box Enterprise.   Certain users can be exempted from these restrictions, for example
if they are a trusted person who needs to collaborate outside of the normally-allowed set of
domains.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Add a Domain to Collaboration Allowlist](#add-a-domain-to-collaboration-allowlist)
- [Get a Allowlisted Domain's Information](#get-a-allowlisted-domains-information)
- [Get Allowlisted Domains for an Enterprise](#get-allowlisted-domains-for-an-enterprise)
- [Remove a Domain from Collaboration Allowlist](#remove-a-domain-from-collaboration-allowlist)
- [Exempt a User from the Collaboration Allowlist](#exempt-a-user-from-the-collaboration-allowlist)
- [Get an Exempt User's Information](#get-an-exempt-users-information)
- [Get the User Collaboration Allowlists for an Enterprise](#get-the-user-collaboration-allowlists-for-an-enterprise)
- [Remove a User Exemption from the Collaboration Allowlist](#remove-a-user-exemption-from-the-collaboration-allowlist)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

Add a Domain to Collaboration Allowlist
---------------------------------------

You can allowlist a certain domain to allow collaboration with that domain for your
enterprise by calling
[`collaborationAllowlist.addDomain(domain, direction, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/CollaborationAllowlist.html#addDomain).

The `direction` parameter determines the level of restriction on which way the collaboration flows. Set to `inbound` will allow users outside of our enterprise to collaboration with content inside your enterprise. Set to `outbound` will allow users inside your enterprise to collaboration with content owned by someone outside your enterprise. Set to `both` will allow both `inbound` and `outbound`.

<!-- sample post_collaboration_whitelist_entries -->
```js
client.collaborationAllowlist.addDomain('test.com', client.collaborationAllowlist.directions.INBOUND, callback);
```

Get a Allowlisted Domain's Information
--------------------------------------

Information about a specific collaboration allowlist record, which shows
the domain that is allowlisted, can be retrieved by calling
[`collaborationAllowlist.getAllowlistedDomain(domainID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/CollaborationAllowlist.html#getAllowlistedDomain).

<!-- sample get_collaboration_whitelist_entries_id -->
```js
client.collaborationAllowlist.getAllowlistedDomain('12345', {}, callback);
```

Get Allowlisted Domains for an Enterprise
-----------------------------------------

You can retrieve a collection of allowlisted domains for an enterprise with
[`collaborationAllowlist.getAllAllowlistedDomains(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/CollaborationAllowlist.html#getAllAllowlistedDomains).

<!-- sample get_collaboration_whitelist_entries -->
```js
client.collaborationAllowlist.getAllAllowlistedDomains(callback);
```

Alternatively you can limit the number of allowlisted domains you wish to
retrieve by setting a limit.  The default is 100 entries and the maximum is 1,000 entries.

```js
var options = {
    limit: 50;
};
client.collaborationAllowlist.getAllAllowlistedDomains(options, callback);
```

Remove a Domain from Collaboration Allowlist
--------------------------------------------

You can remove a domain from the collaboration allowlist with
[`collaborationAllowlist.removeDomain(domainID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/CollaborationAllowlist.html#removeDomain).

<!-- sample delete_collaboration_whitelist_entries_id -->
```js
client.collaborationAllowlist.removeDomain('12345', callback);
```

Exempt a User from the Collaboration Allowlist
----------------------------------------------

You can make a specific user exempt from the collaboration allowlist, which
allows them to collaborate with users from any domain, by calling
[`collaborationAllowlist.addExemption(userID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/Collaborations.html#addExemption).

<!-- sample post_collaboration_whitelist_exempt_targets -->
```js
client.collaborationAllowlist.addExemption('5678', callback);
```

Get an Exempt User's Information
--------------------------------

To retrieve information about a specific user exemption record, you can use
[`collaborationAllowlist.getExemption(exemptionID, options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/CollaborationAllowlist.html#getExemption).

<!-- sample get_collaboration_whitelist_exempt_targets_id -->
```js
client.collaborationAllowlist.getExemption(`12345`, callback);
```

Get All Exempt Users for an Enterprise
--------------------------------------

To retrieve a collection of users who are exempt from the collaboration allowlist
for an enterprise, call
[`collaborationAllowlist.getAllExemptions(options, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/CollaborationAllowlist.html#getAllExemptions).

<!-- sample get_collaboration_whitelist_exempt_targets -->
```js
client.collaborationAllowlist.getAllExemptions(options, callback);
```

Alternatively you can limit the number of user collaboration allowlists you wish to retrieve by setting a limit, the default is 100 entries and the maximum is 1000 entries.

```js
var options = {
    limit: 50;
};
client.collaborationAllowlist.getAllExemptions(options, callback);
```

Remove a User Exemption from the Collaboration Allowlist
--------------------------------------------------------

To remove a user exemption from collaboration allowlist and make that user
subject to allowlist restrictions again, you can call
[`collaborationAllowlist.removeExemption(exemptionID, callback)`](http://opensource.box.com/box-node-sdk/jsdoc/CollaborationAllowlist.html#removeExemption).

<!-- sample delete_collaboration_whitelist_exempt_targets_id -->
```js
client.collaborationAllowlist.removeExemption('12345678', callback);
```