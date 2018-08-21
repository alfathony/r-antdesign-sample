class Sample {
	constructor() {
		this.url = 'sample';
	}

	read = params => Object.assign({
		url: this.url,
		method: 'get',
		params,
	})

	detail = id => Object.assign({
		url: `${this.url}/${id}`,
		method: 'get',
	})

	insert = body => Object.assign({
		url: this.url,
		method: 'post',
		body,
	})

	update = (id, body) => Object.assign({
		url: `${this.url}/${id}`,
		method: 'put',
		body,
	})

	delete = id => Object.assign({
		url: `${this.url}/${id}`,
		method: 'delete',
	})
}

export default new Sample();

