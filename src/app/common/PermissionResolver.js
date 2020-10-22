import React from 'react';

class PermissionResolver {
	hasPermission(type, permission) {
		const acl = JSON.parse(localStorage.getItem(`${type}_acl`));

		if (acl === null) return false;

		if (acl[`${type.toUpperCase()}:${permission}`]) return true;

		return false;
	}
}

export default new PermissionResolver();
