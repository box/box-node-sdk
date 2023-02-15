# Upgrade Guide

`MAJOR` version bumps will have upgrade notes posted here.

[YYYY-MM-DD] 2.x.x to 3.0.0
---------------------------
## Overview

This release contains a number of changes. The most notable are:
- Drop support for Node versions below 12.
- Bump `jsonwebtoken` to version 9.0.0.

## Instructions

- If you are using Node versions below 12, you will need to upgrade to a newer version.
- If you are using `jsonwebtoken` directly, you will need to upgrade to version 9.0.0 to avoid conflicts.