
import BoxClient from '../box-client';

const BASE_PATH = '/ai/ask';

class Ai {
	client: BoxClient;

	constructor(client: BoxClient) {
		this.client = client;
	}

	ask(
		mode: 'text_gen' | 'multiple_item_qa' | 'single_item_qa',
		prompt: string,
		items: any[],
		dialogue_history: any[] = [],
		config: any = {},
		callback?: Function
	) {

		let params = {
			body: {
				mode: mode,
				prompt: prompt,
				items: items,
				dialogue_history: dialogue_history,
				config: {...config, is_streamed: false},
			}
		};

		return this.client.wrapWithDefaultHandler(this.client.post)(
			BASE_PATH,
			params,
			callback
		);
	}

	askStream(
		mode: 'text_gen' | 'multiple_item_qa' | 'single_item_qa',
		prompt: string,
		items: any[],
		dialogue_history?: any[],
		config?: any,
		callback?: Function
	) {

		let params = {
			body: {
				mode: mode,
				prompt: prompt,
				items: items,
				dialogue_history: dialogue_history,
				config: {...config, is_streamed: true},
			},
			streaming: true,
		};

		return this.client.post(
			BASE_PATH,
			params,
			callback
		).asCallback(callback);
	}
}

export = Ai;
