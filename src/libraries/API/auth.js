class Auth {
	constructor() {
		this.url = 'auth';
	}

	login = body => Object.assign({
		url: `${this.url}/login`,
		method: 'post',
		body,
	})
}

export default new Auth();
